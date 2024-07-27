import axios from "axios";
import { useEffect, useState } from "react";

export interface Message {
  role: "USER" | "MVLUBOT";
  loading?: boolean;
  message: string;
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function useMessage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function resolveQuery(query: string) {
    setIsLoading(true);
    setMessages((curr) => {
      return [
        ...curr,
        {
          role: "USER",
          message: query,
        },
        {
          role: "MVLUBOT",
          message: "",
          loading: true,
        },
      ];
    });

    setIsLoading(true);
    setError(null);

    try {
      const result = await axios.post<Message>(SERVER_URL + "chat", {
        role: "USER",
        message: query,
      });

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
