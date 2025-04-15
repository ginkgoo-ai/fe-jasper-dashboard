"use client";

import equal from "fast-deep-equal";
import { AnimatePresence, motion } from "framer-motion";
import { Bot } from "lucide-react";
import { memo } from "react";
import { Markdown } from "@/components/chat/markdown";
import { PreviewAttachment } from "@/components/chat/preview-attachment";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat";

interface MessagePreviewProps {
  chatId: string;
  message: ChatMessage;
}

const PurePreviewMessage = (props: MessagePreviewProps) => {
  const {
    // chatId,
    message,
  } = props;

  return (
    <AnimatePresence>
      <motion.div
        data-testid={`message-${message.role}`}
        className="group/message mx-auto box-border w-full px-[0.125rem]"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={message.role}
      >
        <div
          className={cn("flex w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl", {
            // "w-full": mode === "edit",
            // "group-data-[role=user]/message:w-fit": mode !== "edit",
          })}
        >
          {message.role === "assistant" && (
            <div className="ring-border bg-background flex size-8 shrink-0 items-center justify-center rounded-full ring-1">
              <div className="translate-y-px">
                <Bot size={14} />
              </div>
            </div>
          )}

          <div className="flex w-0 flex-1 flex-col gap-4 overflow-hidden">
            {message.attachments && message.attachments.length > 0 && (
              <div
                data-testid={`message-attachments`}
                className={cn("flex flex-row justify-end gap-2", {
                  "justify-end": message.role === "user",
                  "justify-start": message.role !== "user",
                })}
              >
                {message.attachments.map((attachment: any) => (
                  <PreviewAttachment key={attachment.url} attachment={attachment} />
                ))}
              </div>
            )}

            {message.parts?.map((part: any, index: number) => {
              const { type } = part;
              const key = `message-${message.id}-part-${index}`;

              if (type === "text") {
                return (
                  <div key={key} className="flex flex-row items-start gap-2">
                    {message.role === "user" && <div className="flex-1"></div>}

                    <div
                      data-testid="message-content"
                      className={cn("flex flex-col gap-4", {
                        "bg-primary text-primary-foreground rounded-xl px-3 py-2": message.role === "user",
                        "text-secondary-foreground rounded-xl bg-[#F3F4F6] px-3 py-2": message.role !== "user",
                      })}
                    >
                      <Markdown>{part.text}</Markdown>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const PreviewMessage = memo(PurePreviewMessage, (prevProps, nextProps) => {
  if (prevProps.message.id !== nextProps.message.id) return false;
  if (!equal(prevProps.message.parts, nextProps.message.parts)) return false;

  return true;
});
