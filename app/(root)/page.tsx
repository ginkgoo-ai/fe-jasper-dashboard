import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function RootPage() {
  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center">
      <Link className={buttonVariants()} href="/chat-detail">
        New Chat
      </Link>
    </div>
  );
}
