import Image from "next/image";
import Link from "next/link";

type Props = {};

function Contact({}: Props) {
  return (
    <section
      className="container pt-20 pb-10 flex flex-col items-center justify-center"
      id="contact"
    >
      <div className="flex flex-col items-center justify-center space-y-7">
        <div className="text-secondary bg-secondary/10 rounded-full text-lg font-bold px-5 py-2.5 w-full max-w-[216px] text-center">
          تواصل معنا بعدة طرق
        </div>
        <h1 className="text-4xl font-bold">
          يسعدنا ان <span className="text-primary">نستمع اليك</span> بجميع الطرق
        </h1>
        <h2 className="text-black/70 text-lg font-semibold">
          فريقنا الودود موجود دائمًا للدردشة.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[84px] mt-16">
        <div className="flex flex-col items-center justify-center space-y-2.5">
          <Image
            src="/icons/phone.webp"
            className="size-full max-w-[60px] max-h-[60px]"
            width={60}
            height={60}
            alt="phone"
          />
          <h1 className="text-[26px] font-bold">رقم الهاتف</h1>
          <div className="text-lg font-semibold">
            من الساعة 8 صباحًا حتى الساعة 5 مساءً.
          </div>
          <Link href="tel:01066402035" className="text-primary text-xl">
            01066402035
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2.5">
          <Image
            src="/icons/location.webp"
            className="size-full max-w-[60px] max-h-[60px]"
            width={60}
            height={60}
            alt="location"
          />
          <h1 className="text-[26px] font-bold">المكتب</h1>
          <div className="text-lg font-semibold">
            تعال وألقي التحية في المقر الرئيسي لمكتبنا.
          </div>
          <Link
            href="http://maps.google.com/?q=15 شارع الوحدة , الاسكندرية"
            className="text-primary text-xl"
          >
            15 شارع الوحدة , الاسكندرية
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2.5">
          <Image src="/icons/mail.webp" width={60} height={60} alt="mail" />
          <h1 className="text-[26px] font-bold">المكتب</h1>
          <div className="text-lg font-semibold">
            فريقنا الودود هنا للمساعدة.
          </div>
          <Link
            href="mailto:hi@7esty.education.com"
            className="text-primary text-xl"
          >
            hi@7esty.education.com
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Contact;
