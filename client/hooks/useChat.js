import { useState, useCallback, useRef, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';

const createSessionId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};

export default function useChat(characterId) {
  const [messages, setMessages] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentSources, setCurrentSources] = useState([]);
  const [currentGuardrail, setCurrentGuardrail] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const sessionIdRef = useRef(createSessionId());
  const previousCharacterIdRef = useRef(characterId);

  const sendMessage = useCallback(async (text) => {
    setError(null);
    setIsStreaming(true);
    setCurrentResponse('');
    setCurrentSources([]);
    setCurrentGuardrail(null);

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterId,
          sessionId: sessionIdRef.current,
          messages: newMessages
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ nhân vật.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let finished = false;
      let accumulatedText = '';
      let accumulatedSources = [];
      let accumulatedGuardrail = null;
      let sseBuffer = '';

      const handleSsePayload = (rawData) => {
        if (rawData === '[DONE]') {
          finished = true;
          return;
        }

        const parsed = JSON.parse(rawData);
        if (parsed.error) {
          throw new Error(parsed.error);
        }
        if (parsed.text) {
          accumulatedText += parsed.text;
          setCurrentResponse(accumulatedText);
        }
        if (Array.isArray(parsed.sources)) {
          accumulatedSources = parsed.sources;
          setCurrentSources(accumulatedSources);
        }
        if (parsed.guardrail) {
          accumulatedGuardrail = parsed.guardrail;
          setCurrentGuardrail(accumulatedGuardrail);
        }
      };

      const handleSseEvents = (events) => {
        for (const event of events) {
          const dataLines = event
            .split('\n')
            .filter((line) => line.startsWith('data: '))
            .map((line) => line.slice(6).trim());

          if (dataLines.length) {
            handleSsePayload(dataLines.join('\n'));
          }
        }
      };

      while (!finished) {
        const { value, done } = await reader.read();
        finished = done;

        if (value) {
          sseBuffer += decoder.decode(value, { stream: true });
          const events = sseBuffer.split('\n\n');
          sseBuffer = events.pop() || '';
          handleSseEvents(events);
        }
      }

      sseBuffer += decoder.decode();
      if (sseBuffer.trim()) {
        handleSseEvents([sseBuffer]);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: accumulatedText,
          sources: accumulatedSources,
          guardrail: accumulatedGuardrail
        }
      ]);
      setCurrentResponse('');
      setCurrentSources([]);
      setCurrentGuardrail(null);
      setIsStreaming(false);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Có lỗi xảy ra khi trò chuyện.');
        setIsStreaming(false);
      }
    }
  }, [messages, characterId]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setCurrentResponse('');
    setCurrentSources([]);
    setCurrentGuardrail(null);
    setIsStreaming(false);
    setError(null);
    sessionIdRef.current = createSessionId();
  }, []);

  useEffect(() => {
    if (!characterId || previousCharacterIdRef.current === characterId) return;
    previousCharacterIdRef.current = characterId;
    setMessages([]);
    setCurrentResponse('');
    setCurrentSources([]);
    setCurrentGuardrail(null);
    setIsStreaming(false);
    setError(null);
    sessionIdRef.current = createSessionId();
  }, [characterId]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    messages,
    currentResponse,
    currentSources,
    currentGuardrail,
    isStreaming,
    error,
    sendMessage,
    clearHistory
  };
}
