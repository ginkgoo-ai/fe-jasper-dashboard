"use client";

import equal from "fast-deep-equal";
import { AnimatePresence, motion } from "framer-motion";
import { Bot } from "lucide-react";
import React, { memo } from "react";
import Image from "next/image";
import { Markdown } from "@/components/chat/markdown";
import { PreviewAttachment } from "@/components/chat/preview-attachment";
import { DocumentHeader } from "@/components/chat/preview-header";
import { SheetEditor } from "@/components/chat/sheet-editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store";
import { ChatMessage, ChatMessagePart } from "@/types/chat";

interface MessagePreviewProps {
  chatId: string;
  message: ChatMessage;
}

const PurePreviewMessage = (props: MessagePreviewProps) => {
  const {
    // chatId,
    message,
  } = props;

  const { userInfo } = useUserStore();
  const defaultAvatar = "/default.png";

  const renderMessagePartText = (part: ChatMessagePart) => {
    return <Markdown>{part.content || ""}</Markdown>;
  };

  const renderMessagePartSheet = (part: ChatMessagePart) => {
    return (
      <div className="flex flex-col">
        <DocumentHeader type="sheet" title={part.title || ""} content={part.content || ""} isStreaming={false} />
        <SheetEditor content={part.content || ""} />
      </div>
    );
  };

  const renderMessagePartImage = (part: ChatMessagePart) => {
    return <Image src={part.content || ""} alt={part.title || ""} width={300} height={200} />;
  };

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
          className={cn("flex w-full flex-row gap-4", {
            "flex-row": message.role !== "user",
            "flex-row-reverse": message.role === "user",
          })}
        >
          {/* Avatar Bot */}
          {message.role === "assistant" && (
            <div className="ring-border bg-background flex size-8 shrink-0 items-center justify-center rounded-full ring-1">
              <div className="translate-y-px">
                <Bot size={14} />
              </div>
            </div>
          )}
          {/* Avatar User */}
          {message.role === "user" && (
            <div className="ring-border bg-background flex size-8 shrink-0 items-center justify-center rounded-full ring-1">
              <Avatar className="size-8">
                <AvatarImage src={userInfo?.picture ?? defaultAvatar} />
                <AvatarFallback>{userInfo?.fullname?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          )}
          {/* Content */}
          <div className="flex w-0 flex-1 flex-col gap-4 overflow-hidden">
            {/* Attachments */}
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
            {/* Parts */}
            {message.parts?.map((part: ChatMessagePart, index: number) => {
              const { type } = part;
              const key = `message-${message.id}-part-${index}`;

              return (
                <div
                  key={key}
                  className={cn("flex flex-row items-start gap-2", {
                    "justify-end": message.role === "user",
                    "justify-start": message.role !== "user",
                  })}
                >
                  <div
                    className={cn("flex flex-col overflow-auto", {
                      "bg-primary text-primary-foreground rounded-xl px-3 py-2": message.role === "user",
                      "text-secondary-foreground bg-secondary rounded-xl px-3 py-2": message.role !== "user",
                    })}
                  >
                    {
                      {
                        text: renderMessagePartText(part),
                        sheet: renderMessagePartSheet(part),
                        image: renderMessagePartImage(part),
                      }[type]
                    }
                  </div>
                </div>
              );
            })}
          </div>
          {/* Block */}
          <div className="bg-background size-8 shrink-0"></div>
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
