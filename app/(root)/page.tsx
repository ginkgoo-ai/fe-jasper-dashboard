import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RootPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4 lg:p-12">
      <div className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-50 to-slate-300 p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 relative overflow-hidden">
        <div className="overflow-hidden flex items-center justify-center absolute bottom-0 right-0 lg:static">
          <Image 
            src='/worker.png' 
            className="object-contain max-h-full max-w-full" 
            alt="Worker" 
            width={468} 
            height={468}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex items-start lg:items-center justify-center h-full absolute top-0 lg:static p-4">
          <div className="max-w-full lg:max-w-[468px] 2xl:max-w-[768px] pt-[10%] lg:pt-0">
            <h1 className="text-5xl font-bold mb-4 font-domine">AI-Powered Solutions</h1>
            <p className="text-2xl mb-12 font-outfit">Our AI-driven platform helps you find the best subcontractors quickly and efficiently.</p>
            <Link className={cn(buttonVariants({
              size: "lg",
            }))} href="/chat-detail">
              <Plus />
              Start conversation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
