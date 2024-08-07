import axios from "axios";
import { useEffect, useState } from "react";

export interface Message {
  role: "USER" | "MVLUBOT";
  loading?: boolean;
  message: string;
  history?: Message[];
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function useMessage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function resolveQuery(query: string) {
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
  }

  // Checks if the server is live (if not then initiates cold start)
  async function ping() {
    setIsLoading(true);

    try {
      await axios.get(SERVER_URL + "ping");
    } catch {
      setError("The server is not availabe at this time.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    ping();
  }, []);

  return {
    messages,
    isLoading,
    error,
    methods: {
      resolveQuery,
    },
  };
}
