import { Separator } from "@/components/ui/separator";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

function Menu({}: Props) {
  return (
    <div className="container sm:py-10 pt-10 flex items-center justify-between gap-3 md:flex-row flex-col font-bold text-base overflow-hidden">
      <div className="flex items-center gap-x-5 md:overflow-visible overflow-x-scroll w-full md:pb-0 pb-4">
        <div className="bg-primary/10 text-primary p-2 rounded-[8px] font-semibold min-w-[125px]">
          <LayoutDashboard size={20} className="inline me-2 " />
          جميع الفئات
        </div>
        <Link href="/about" className="text-[#121212B5] min-w-[68px]">
          عن حصتي
        </Link>
        <div className="flex h-5 items-center space-x-4 text-sm font-medium">
          <Separator orientation="vertical" className="me-3" />
          <Link className="min-w-[80px]" href={`/courses?class=الصف الاول الثانوي`}>الاول الثانوي</Link>
          <Link className="min-w-[80px]" href={`/courses?class=الصف الثاني الثانوى`}>
            الثاني الثانوي
          </Link>
          <Link className="min-w-[80px]" href={`/courses?class=الصف الثالث الثانوى`}>
            الثالث الثانوي
          </Link>
        </div>
      </div>
      <Link
        href="tel:01066402737"
        className="text-primary flex items-center gap-2 text-lg mr-auto"
      >
        01066402737
        <Image
          src="/icons/whatsapp.svg"
          width={30}
          height={30}
          className="size-full max-w-[30px] max-h-[30px]"
          alt="whatsapp"
        />
      </Link>
    </div>
  );
}

export default Menu;
