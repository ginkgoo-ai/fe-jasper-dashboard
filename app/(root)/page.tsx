import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function RootPage() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <Link className={buttonVariants()} href="/chat-detail">
        New Chat
      </Link>
    </div>
  );
}
