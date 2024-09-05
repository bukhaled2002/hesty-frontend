"use client"; // This ensures the component is a Client Component

import { logoutAction } from "@/lib/actions/logoutAction";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import HeaderLinks from "./headerLinks";
import User from "./user";
import HamburgerMenu from "@/public/icons/HamburgerIcon";
import { useState } from "react";
import { motion } from "framer-motion";
import CloseIcon from "@/public/icons/CloseIcon";
import LogoutIcon from "@/public/icons/LogoutIcon";
type Props = {
  data: any; // Adjust the type based on what `auth()` returns
};

function HeaderContainer({ data }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };
  const handleLogout = async () => {
    try {
      await logoutAction();
      
      localStorage.setItem("isLoggedIn", "false");
      
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  
  return (
    <header className="bg-white py-2.5 fixed top-0 z-50 w-full border-b-[1.6px]">
      <nav className="container flex items-center justify-between gap-x-5">
        <Link href="/">
          <span className="sr-only">Home</span>
          <Image className="md:h-[71px] md:w-[217px] w-[150px] " alt="Logo" height={71} src="/logo.svg" width={217} />
        </Link>
        <div className="lg:block hidden">
          <HeaderLinks />
        </div>
        {!data || !data.user ? (
          <div>
            <div className="lg:flex hidden items-center gap-x-3">
              <Link href={`/auth/student/login`}>
                <Button className="text-base">تسجيل الدخول</Button>
              </Link>
              <Link href={`/auth/student/register`}>
                <Button className="text-base" variant="outline">
                  انشاء حساب
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="lg:flex hidden items-center gap-2">
            <button onClick={handleLogout} >
              <button className="flex w-full text-primary border border-primary rounded-[4px] hover:bg-primary transition-all duration-200 px-3 py-2 text-sm font-medium hover:text-white md:p-2 md:px-3">
                <div className="hidden md:block">تسجيل الخروج</div>
              </button>
            </button>
            <User />
          </div>
        )}
        <button onClick={toggleSidebar} className="lg:hidden block">
          <HamburgerMenu />
        </button>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleSidebar}
          />
        )}
        <motion.div
          className="flex flex-col bg-white fixed top-0 left-0 h-full shadow-lg z-50 p-5 lg:hidden md:w-[50%] w-[70%]"
          variants={sidebarVariants}
          initial="closed"
          animate={isSidebarOpen ? "open" : "closed"}
          transition={{
            ease: "linear",
            duration: 2,
            x: { duration: 0.3 },
          }}
        >
          <button onClick={toggleSidebar} className="self-end">
            <CloseIcon />
          </button>
          {!data || !data.user ? (
            <></>
          ) : (
            <div className="border-b pb-4">
              <User />
              <button className="text-[#FF0000] flex items-center justify-end gap-2 flex-row-reverse mt-2  cursor-pointer"               onClick={handleLogout}
              >
                <span>
                  تسجيل الخروج
                </span>
                <div className="rotate-180">
                  <LogoutIcon />
                </div>
              </button>

            </div>
          )}

          <HeaderLinks />
          {!data || !data.user ? (
            <div className="pt-5 flex flex-col gap-4">
              <Link className="w-full" href={`/auth/student/login`}>
                <Button className="text-base w-full">تسجيل الدخول</Button>
              </Link>
              <Link className="w-full" href={`/auth/student/register`}>
                <Button className="text-base w-full" variant="outline">
                  انشاء حساب
                </Button>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </motion.div>
      </nav>
    </header>
  );
}

export default HeaderContainer;
