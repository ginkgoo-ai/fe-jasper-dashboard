import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ChatDetailPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
      <Link
        className={buttonVariants({ variant: "outline" })}
        href="/chat-detail"
      >
        Hello
      </Link>
    </div>
  );
}
