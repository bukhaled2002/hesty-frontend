import { cn } from "@/lib/utils";
import { TTransaction } from "@/services/admin/students";
import React from "react";

type Props = {
  transaction: TTransaction;
};

function Transaction({ transaction }: Props) {
  return (
    <div key={transaction.id} className="pt-[25px]">
      <div className="flex items-center justify-between mb-[14px]">
        <div className="text-[#121212B2] font-medium text-base">
          {new Date(transaction.createdAt).toLocaleDateString("en-us", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
        <div
          className={cn(
            " text-xs py-0.5 ps-[8px] pe-[4px] rounded-[16px] flex items-center gap-x-1.5",
            transaction.status === "paid" && "text-[#027A48] bg-[#ECFDF3]",
            transaction.status === "pending" && "text-[#B54708] bg-[#FFFAEB]",
            transaction.status === "rejected" && "text-[#B42318] bg-[#FEF3F2]"
          )}
        >
          <span>
            {transaction.status === "paid"
              ? "تمت بنجاح"
              : transaction.status === "pending"
              ? "قيد المراجعة"
              : "العملية مرفوضة"}
          </span>
          <div
            className={cn(
              "w-[8px] h-[8px] rounded-full inline-block ml-2",
              transaction.status === "paid" && "bg-[#12B76A]",
              transaction.status === "pending" && "bg-[#F79009]",
              transaction.status === "rejected" && "bg-[#F04438]"
            )}
          />
        </div>
      </div>
      <div className="font-semibold">
        {transaction.type === "wallet" ? (
          transaction.status === "paid" ? (
            <>
              تم شحن{" "}
              <span className="text-secondary font-bold text-lg">
                {transaction.amount}
              </span>{" "}
              جنيه{" "}
            </>
          ) : transaction.status === "pending" ? (
            <>
              طلبك بشحن{" "}
              <span className="text-secondary font-bold text-lg">
                {transaction.amount}
              </span>{" "}
              جنيه قيد المراجعة
            </>
          ) : (
            <>
              تم رفض طلب شحن{" "}
              <span className="text-secondary font-bold text-lg">
                {transaction.amount}
              </span>{" "}
              جنيه{" "}
            </>
          )
        ) : (
          <>
            تم خصم{" "}
            <span className="text-secondary font-bold text-lg">
              {transaction.amount}
            </span>{" "}
            جنيه من المحفظة لشراء{" "}
            <span className="text-secondary font-bold text-lg">
              {transaction.course?.name}
            </span>{" "}
          </>
        )}
      </div>
    </div>
  );
}

export default Transaction;
