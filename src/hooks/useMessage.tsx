import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export interface Message {
  role: "USER" | "MVLUBOT";
  loading?: boolean;
  message: string;
  history?: Message[];
}

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function useMessage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const resolveQuery = useCallback(
    async (query: string) => {
      const payload: Message = {
        role: "USER",
        message: query,
      };

      setIsLoading(true);
      setMessages((curr) => {
        return [
          ...curr,
          payload,
          {
            role: "MVLUBOT",
            message: "",
            loading: true,
          },
        ];
      });

      setIsLoading(true);
      setError(null);

      if (messages.length > 0) {
        payload.history = messages.slice(Math.max(-10, messages.length * -1));
        console.log(payload);
      }

      try {
        const result = await axios.post<Message>(SERVER_URL + "chat", payload);

        if (result.status === 200) {
          setMessages((curr) => {
            const newArr = [...curr];

            newArr[newArr.length - 1] = result.data;

            return newArr;
          });
        }
      } catch {
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  // Checks if the server is live (if not then initiates cold start)
  const ping = useCallback(async () => {
    setIsLoading(true);

    try {
      await axios.get(SERVER_URL + "ping");
    } catch {
      setError("The server is not availabe at this time.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    ping();
  }, [ping]);

  return {
    messages,
    isLoading,
    error,
    methods: {
      resolveQuery,
    },
  };
}
