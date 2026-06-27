import { useState, useCallback, useRef, useEffect } from 'react';
import { API_BASE_URL } from '@/utils/api';

export default function useChat(characterId) {
  const [messages, setMessages] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const sendMessage = useCallback(async (text) => {
    setError(null);
    setIsStreaming(true);
    setCurrentResponse('');

    const newMessages = [...messages, { role: 'user', content: text }];
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

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let finished = false;
      let accumulatedText = '';

      while (!finished) {
        const { value, done } = await reader.read();
        finished = done;
        if (value) {
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const rawData = line.slice(6).trim();
              if (rawData === '[DONE]') {
                finished = true;
                break;
              }
              try {
                const parsed = JSON.parse(rawData);
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
                if (parsed.text) {
                  accumulatedText += parsed.text;
                  setCurrentResponse(accumulatedText);
                }
              } catch (e) {
                // Ignore parsing errors for incomplete chunks
              }
            }
          }
        }
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: accumulatedText }]);
      setCurrentResponse('');
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
    setIsStreaming(false);
    setError(null);
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
    isStreaming,
    error,
    sendMessage,
    clearHistory
  };
}
