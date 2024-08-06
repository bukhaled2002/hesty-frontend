import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Error() {
  return (
    <div className="grid h-screen place-content-center -mt-20">
      <div className="relative w-[900px]">
        <Image
          src="/images/404.webp"
          width={1006}
          height={350}
          alt="404"
          className="size-full max-w-[1006] max-h-[350]"
        />
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#121212]">
            للأسف هذه الصفحة غير موجودة
          </h1>
          <p className="text-2xl font-semibold text-black/70 my-5">
            يبدو ان هذه الصفحة قد تم نقلها او حذفت او غير موجودة اساسا
          </p>
          <div className="w-3/5 m-auto">
            <Link href="/" className="w-full">
              <Button className="w-full text-[22px] py-6 font-semibold">
                الذهاب للصفحة الرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
