"use client";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  currentPage: string | string[] | undefined | number;
  last_page: number | undefined;
  nextPage: number | null;
  previousPage: number | null;
};

function Pagination({ currentPage, last_page, nextPage, previousPage }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const visiblePages = 3;

  const getPageRange = () => {
    const pages = [];
    if (last_page !== undefined && last_page <= visiblePages) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i);
      }
    } else {
      const range = [];
      const mid = Math.ceil(visiblePages / 2);
      let start, end;

      if (Number(currentPage) <= mid) {
        start = 1;
        end = visiblePages;
      } else if (
        last_page !== undefined &&
        Number(currentPage) > last_page - mid
      ) {
        start = last_page - visiblePages + 1;
        end = last_page;
      } else {
        start = Number(currentPage) - mid + 1;
        end = Number(currentPage) + mid - 1;
      }

      if (start > 1) {
        range.push(1);
      }

      if (start > 2) {
        range.push("...");
      }

      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      if (last_page !== undefined && end < last_page - 1) {
        range.push("...");
      }

      if (last_page !== undefined && end < last_page) {
        range.push(last_page);
      }

      pages.push(...range);
    }
    return pages;
  };

  const pageRange = getPageRange();

  const updateURL = (pageNumber: number) => {
    let queryParams: Record<string, string> = Object.fromEntries(searchParams);

    queryParams.page = pageNumber.toString();

    const queryString = new URLSearchParams(queryParams).toString();
    const newURL = `${pathname}?${queryString}`;
    queryClient.invalidateQueries({ queryKey: ["teachers-admin"] });
    router.push(newURL);
  };

  return (
    <ul className="flex items-center justify-center gap-x-[20px] pagination mt-10 select-none">
      <li
        className={cn(
          "border-2 border-[#00000026] rounded-[6px] bg-white cursor-pointer p-0.5 max-w-[50px] max-h-[50px] size-full",
          previousPage === null && "opacity-50 cursor-not-allowed bg-[#EBEBEB]"
        )}
        onClick={() => {
          if (currentPage !== undefined && previousPage !== null)
            updateURL(Number(currentPage) - 1);
        }}
      >
        <ChevronRight size={24} className="rounded-[4px] text-[#cdcdcd]" />
      </li>
      <div className="flex items-center gap-x-[10px]">
        {pageRange.map((page, index) => (
          <li key={index} className="max-w-[50px] max-h-[50px] size-full">
            {page === "..." ? (
              <span className="ellipsis">...</span>
            ) : (
              <span
                className={cn(
                  "border-2 border-[#00000026] px-2.5 rounded-[6px] text-base cursor-pointer",
                  page === Number(currentPage) && "border-primary font-bold"
                )}
                onClick={() => {
                  if (typeof page === "number" && currentPage !== undefined)
                    updateURL(page);
                }}
              >
                {page}
              </span>
            )}
          </li>
        ))}
      </div>
      <li
        className={cn(
          "border-2 border-[#00000026] rounded-[6px] bg-white cursor-pointer p-0.5 max-w-[50px] max-h-[50px] size-full",
          nextPage === null && "opacity-50 cursor-not-allowed bg-[#EBEBEB]"
        )}
        onClick={() => {
          if (currentPage !== undefined && nextPage !== null)
            updateURL(Number(currentPage) + 1);
        }}
      >
        <ChevronLeft size={24} className="rounded-[4px] text-[#cdcdcd]" />
      </li>
    </ul>
  );
}

export default Pagination;
