import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {};

function Hero({}: Props) {
  return (
    <section className="overflow-hidden bg-secondary relative z-10">
      <div className="container sm:grid sm:grid-cols-2 min-h-[calc(100vh-85px)]">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white md:text-[42px] leading-[54.6px]">
            مستقبل افضل الان{" "}
            <span className="ms-[21px] text-primary">مع حصتي</span>
          </h2>

          <p className="hidden text-white/85 md:mt-4 md:block lg:w-4/5 font-medium leading-[30px]">
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد
            من النصوص الأخرى
          </p>

          <div className="flex items-center gap-x-[17px] mt-4 md:mt-[38px]">
            <Link href="/courses">
              <Button className="text-base px-7">شراء المحاضرات</Button>
            </Link>
            <Link href="/auth/student/login">
              <Button className="bg-white text-primary hover:bg-white/90 text-base px-7">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center h-full">
          <Image
            alt=""
            src={"/images/hero.webp"}
            width={1000}
            height={1000}
            loading="eager"
            className="max-h-[736px] max-w-[736px] flex-shrink-0 size-full object-contain"
          />
        </div>
      </div>
      <Image
        src="/images/Vector-2.webp"
        className="absolute bottom-0 start-0 -z-10"
        width={800}
        height={800}
        alt="crosses"
      />
      <Image
        src="/images/Vector-1.webp"
        className="absolute top-0 end-0 -z-10"
        width={800}
        height={800}
        alt="heroVector"
      />
    </section>
  );
}

export default Hero;
