import PayForm from "@/components/student/payForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { checkOut } from "@/services/public/checkout";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id;
  const checkOutDetails = await checkOut(id);

  return {
    title: `${checkOutDetails.name}`,
    description: `${checkOutDetails.description}`,
  };
}

type Props = {
  params: {
    id: string;
  };
};

async function CheckOut({ params }: Props) {
  const id = params.id;
  const checkOutDetails = await checkOut(id);

  return (
    <div className="container py-8 font-bold text-base">
      <div className="grid grid-cols-4 gap-x-[54px] gap-y-[22px]">
        <div className="flex items-center col-span-2 border-[1.042px] border-black/20 shadow-sm rounded-[10px] py-[10px] ps-[12px] pe-[52px]">
          <div className="flex items-start gap-x-[19px]">
            <Image
              src={checkOutDetails.img_url.trim()}
              width={175}
              height={138}
              className="rounded-lg w-[175px] h-[138px] size-full"
              alt={checkOutDetails.name}
            />
            <div className="flex-1 flex flex-col justify-between h-[138px] max-h-full">
              <h1 className="text-[#121212] text-lg font-bold truncate">
                {checkOutDetails.name}
              </h1>
              <div className="text-[#121212B2] font-semibold text-lg">
                {checkOutDetails.count_lectures} درس
                <div className="w-2 h-2 rounded-full bg-[#121212B2] inline-block mx-2" />
                {checkOutDetails.num_hours} ساعة
              </div>
              <div className="text-xl font-bold text-[#121212]">
                {checkOutDetails.price_after_discount} جنيه
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 col-start-3 border-[1.042px] border-black/20 shadow-sm rounded-[10px] py-[26px] px-[42px]">
          <div className="flex items-center justify-between gap-x-[19px] mb-6">
            <h1 className="text-[#121212] text-[26px] font-bold ">
              الرصيد المتاح
            </h1>
            <div className="text-primary font-bold text-3xl">
              {checkOutDetails.wallet.balance} جنيه
            </div>
          </div>
          <Link href="/wallet">
            <Button className="px-6 text-lg rounded-lg">شحن الرصيد</Button>
          </Link>
        </div>
        <div className="col-span-2 row-start-2 ">
          <div className="border-[1.042px] border-black/20 shadow-sm rounded-[10px] py-[23px] px-[41px] mb-[22px] space-y-[20px]">
            <div className="flex items-center justify-between">
              <div className="text-[22px] font-semibold text-[#121212B2]">
                السعر
              </div>
              <div className="text-[22px] font-bold text-[#121212]">
                {checkOutDetails.price} جنيه
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[22px] font-semibold text-[#121212B2]">
                الخصم
              </div>
              <div className="text-[22px] font-bold text-[#121212]">
                {Number(checkOutDetails.price) -
                  Number(checkOutDetails.price_after_discount)}{" "}
                جنيه
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="text-[22px] font-bold text-[#121212]">
                المجموع
              </div>
              <div className="text-[22px] font-bold text-[#121212]">
                {checkOutDetails.price_after_discount} جنيه
              </div>
            </div>
          </div>
          <PayForm courseId={id} />
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
