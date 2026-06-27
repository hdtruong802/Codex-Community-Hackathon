import { useState, useCallback, useRef, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';

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
};

export default function useChat(characterId) {
  const [messages, setMessages] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentSources, setCurrentSources] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);
  const abortControllerRef = useRef(null);

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
    setMessages(newMessages);

    // Setup abort controller to allow cancelling request on unmount
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterId, messages: newMessages }),
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
      let bufferedText = '';

      while (!finished) {
        const { value, done } = await reader.read();
        finished = done;
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
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: accumulatedText, sources: accumulatedSources }
      ]);
      setCurrentResponse('');
      setCurrentSources([]);
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
    setIsStreaming(false);
    setError(null);
    setLastFailedMessage(null);
  }, []);

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
    isStreaming,
    error,
    lastFailedMessage,
    sendMessage,
    retryLastMessage,
    clearHistory
  };
}
