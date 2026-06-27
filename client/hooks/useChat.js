import { useState, useCallback, useRef, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';

<<<<<<< HEAD
const normalizeSources = (value) => {
  if (!Array.isArray(value)) return [];
  return value
    .filter((source) => source && typeof source === 'object' && source.source)
    .map((source) => ({
      source: String(source.source),
      topic: source.topic ? String(source.topic) : undefined,
      confidence: source.confidence ? String(source.confidence) : undefined,
      timePeriod: source.timePeriod ? String(source.timePeriod) : undefined
    }));
=======
const createSessionId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
>>>>>>> main
};

export default function useChat(characterId) {
  const [messages, setMessages] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentSources, setCurrentSources] = useState([]);
<<<<<<< HEAD
=======
  const [currentGuardrail, setCurrentGuardrail] = useState(null);
>>>>>>> main
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);
  const abortControllerRef = useRef(null);
  const sessionIdRef = useRef(createSessionId());
  const previousCharacterIdRef = useRef(characterId);

  const sendMessage = useCallback(async (text) => {
    if (!text?.trim() || isStreaming || !characterId) return;

    const trimmedText = text.trim();
    const previousMessages = messages;
    const newMessages = [...previousMessages, { role: 'user', content: trimmedText }];
    let accumulatedText = '';
    let accumulatedSources = [];

    setError(null);
    setLastFailedMessage(null);
    setIsStreaming(true);
    setCurrentResponse('');
    setCurrentSources([]);
<<<<<<< HEAD
=======
    setCurrentGuardrail(null);

    const newMessages = [...messages, { role: 'user', content: text }];
>>>>>>> main
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

      if (!response.body) {
        throw new Error('Máy chủ chưa trả về luồng phản hồi.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let finished = false;
<<<<<<< HEAD
      let bufferedText = '';
=======
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
>>>>>>> main

      while (!finished) {
        const { value, done } = await reader.read();
        finished = done;
<<<<<<< HEAD
        if (value) {
          bufferedText += decoder.decode(value, { stream: true });
          const lines = bufferedText.split('\n');
          bufferedText = lines.pop() || '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;

            const rawData = line.slice(6).trim();
            if (rawData === '[DONE]') {
              finished = true;
              break;
            }

            let parsed;
            try {
              parsed = JSON.parse(rawData);
            } catch {
              continue;
            }

            if (parsed.error) {
              throw new Error('Máy chủ chưa thể trả lời câu hỏi này. Vui lòng thử lại sau.');
            }

            if (parsed.text) {
              accumulatedText += parsed.text;
              setCurrentResponse(accumulatedText);
            }

            const nextSources = normalizeSources(parsed.sources || parsed.metadata?.sources);
            if (nextSources.length > 0) {
              accumulatedSources = nextSources;
              setCurrentSources(nextSources);
            }
          }
        }
      }

      if (!accumulatedText.trim()) {
        throw new Error('Nhân vật chưa gửi được phản hồi. Vui lòng thử lại.');
=======

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
>>>>>>> main
      }

      setMessages((prev) => [
        ...prev,
<<<<<<< HEAD
        { role: 'assistant', content: accumulatedText, sources: accumulatedSources }
      ]);
      setCurrentResponse('');
      setCurrentSources([]);
=======
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
>>>>>>> main
      setIsStreaming(false);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Có lỗi xảy ra khi trò chuyện.');
        setLastFailedMessage(trimmedText);
        setMessages(previousMessages);
        setCurrentResponse('');
        setCurrentSources([]);
        setIsStreaming(false);
      }
    }
  }, [messages, characterId, isStreaming]);

  const retryLastMessage = useCallback(() => {
    if (lastFailedMessage && !isStreaming) {
      sendMessage(lastFailedMessage);
    }
  }, [lastFailedMessage, isStreaming, sendMessage]);

  const clearHistory = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setMessages([]);
    setCurrentResponse('');
    setCurrentSources([]);
<<<<<<< HEAD
    setIsStreaming(false);
    setError(null);
    setLastFailedMessage(null);
=======
    setCurrentGuardrail(null);
    setIsStreaming(false);
    setError(null);
    sessionIdRef.current = createSessionId();
>>>>>>> main
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
<<<<<<< HEAD
=======
    currentGuardrail,
>>>>>>> main
    isStreaming,
    error,
    lastFailedMessage,
    sendMessage,
    retryLastMessage,
    clearHistory
  };
}
