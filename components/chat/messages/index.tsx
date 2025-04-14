import equal from "fast-deep-equal";
import { memo } from "react";
import { Greeting } from "@/components/chat/greeting";
import { PreviewMessage } from "@/components/chat/message-preview";
import { ThinkingMessage } from "@/components/chat/message-thinking";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { ChatMessage, ChatStatus } from "@/types/chat";

interface MessagesProps {
  chatId: string;
  status: ChatStatus;
  messages: ChatMessage[];
}

function PureMessages(props: MessagesProps) {
  const { chatId, status, messages } = props;
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  return (
    <div ref={messagesContainerRef} className="flex h-0 flex-1 flex-col gap-[1.5rem] overflow-y-scroll pt-[1.5rem]">
      {messages.length === 0 && <Greeting chatId={chatId} />}

      {messages.map((message, index) => (
        <PreviewMessage key={`preview-${index}`} chatId={chatId} message={message} />
      ))}

      {status === ChatStatus.SUBMITTED && messages.length > 0 && messages[messages.length - 1].role === "user" && <ThinkingMessage />}

      <div ref={messagesEndRef} className="min-h-[24px] min-w-[24px] shrink-0" />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.status !== nextProps.status) return false;
  if (prevProps.status && nextProps.status) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.messages, nextProps.messages)) return false;

  return true;
});
