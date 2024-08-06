"use client";
import { logoutAction } from "@/lib/actions/logoutAction";
import { Loader2, Power, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import NavLink from "../navlink";
import { Button } from "../ui/button";
import User from "../user";

type Props = {};

function NavigationMenu({}: Props) {
  const [isPending, startTransition] = useTransition();

  const handlelogout = async () => {
    startTransition(() => {
      logoutAction();
    });
  };

  return (
    <nav className="flex flex-col justify-between h-full py-7">
      <div>
        <Link href={`/parent/dashboard`}>
          <Image
            src="/logo.svg"
            width={143}
            height={64}
            className="m-auto"
            alt="logo"
          />
        </Link>
        <ul className="text-base space-y-[24px] font-medium mt-12">
          <NavLink
            href={`/parent/sons`}
            className="flex items-center gap-x-[12px] py-2.5 px-6 whitespace-nowrap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g id="bar-chart-2">
                <path
                  id="Icon"
                  d="M17 20C17 20.5523 17.4477 21 18 21C18.5523 21 19 20.5523 19 20H17ZM19 10C19 9.44772 18.5523 9 18 9C17.4477 9 17 9.44772 17 10H19ZM11 20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20H11ZM13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4H13ZM5 20C5 20.5523 5.44772 21 6 21C6.55228 21 7 20.5523 7 20H5ZM7 14C7 13.4477 6.55228 13 6 13C5.44772 13 5 13.4477 5 14H7ZM19 20V10H17V20H19ZM13 20V4H11V20H13ZM7 20V14H5V20H7Z"
                  fill="currentColor"
                />
              </g>
            </svg>
            <span>الأبناء</span>
          </NavLink>
        </ul>
      </div>
      <div>
        <div className="border-y py-[10px] my-6">
          <form action={handlelogout}>
            <Button
              variant="ghost"
              className="text-[#E24444] hover:text-[#E24444] justify-start px-6 py-2.5 gap-x-3 cursor-pointer w-full hover:bg-transparent"
              disabled={isPending}
            >
              <Power size={20} />
              <span>تسجيل الخروج</span>
              {isPending && (
                <Loader2 size={20} className="animate-spin text-destructive" />
              )}
            </Button>
          </form>
        </div>
        <User />
      </div>
    </nav>
  );
}

export default NavigationMenu;
