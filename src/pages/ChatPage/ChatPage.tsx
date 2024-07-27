import { useSearchParams } from "react-router-dom";
import ChatInput from "../../components/ChatInput";
import useMessage from "../../hooks/useMessage";
import { useEffect, useRef } from "react";
import ChatBubble from "../../components/ChatBubble";

export default function ChatPage() {
  let [searchParams, _] = useSearchParams();
  const hasResolvedQuery = useRef(false);
  const chatContianerRef = useRef<HTMLDivElement>(null);

  const { messages, methods } = useMessage();

  useEffect(() => {
    const query = searchParams.get("query");
    if (query && !hasResolvedQuery.current) {
      methods.resolveQuery(query);
      hasResolvedQuery.current = true;
    }
  }, [searchParams]);

  const scrollToBottom = () => {
    chatContianerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function handleSumbit(query: string) {
    await methods.resolveQuery(query);
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="container mx-auto max-w-[720px] pt-12 pb-[300px] px-4 lg:px-0 space-y-8">
      <div className="space-y-3" onClick={() => scrollToBottom()}>
        {messages.map((message) => {
          return (
            <>
              <div ref={chatContianerRef} className="w-full bg-red-500"></div>
              <ChatBubble
                key={message.message}
                user={message.role}
                message={message.message}
                loading={message.loading}
              />
            </>
          );
        })}
      </div>
      <div className="fixed left-0 right-0 px-4 md:px-0 mx-auto bottom-6 max-w-[720px] w-full">
        <ChatInput variant="chat" onSubmit={handleSumbit} />
      </div>
    </main>
  );
}
