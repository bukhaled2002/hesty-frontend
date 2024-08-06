import { Separator } from "@/components/ui/separator";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

function Menu({}: Props) {
  return (
    <div className="container py-10 flex items-center justify-between font-bold text-base">
      <div className="flex items-center gap-x-5">
        <div className="bg-primary/10 text-primary p-2 rounded-[8px] font-semibold">
          <LayoutDashboard size={20} className="inline me-2 " />
          جميع الفئات
        </div>
        <Link href="/about" className="text-[#121212B5]">
          عن حصتي
        </Link>
        <div className="flex h-5 items-center space-x-4 text-sm font-medium">
          <Separator orientation="vertical" className="me-3" />
          <Link href={`/courses?class=الصف الاول الثانوي`}>الاول الثانوي</Link>
          <Link href={`/courses?class=الصف الثاني الثانوى`}>
            الثاني الثانوي
          </Link>
          <Link href={`/courses?class=الصف الثالث الثانوى`}>
            الثالث الثانوي
          </Link>
        </div>
      </div>
      <Link
        href="tel:01066402737"
        className="text-primary flex items-center gap-2 text-lg"
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
