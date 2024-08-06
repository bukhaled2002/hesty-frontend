import { auth } from "@/auth";
import { logoutAction } from "@/lib/actions/logoutAction";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import HeaderLinks from "./headerLinks";
import User from "./user";

type Props = {};

async function Header({}: Props) {
  const data = await auth();

  return (
    <header className="bg-white py-2.5 fixed top-0 z-50 w-full border-b-[1.6px]">
      <nav className="container flex items-center justify-center gap-x-5">
        <Link href="/">
          <span className="sr-only">Home</span>
          <Image alt="Logo" height={63.87} src="/logo.svg" width={125} />
        </Link>
        <HeaderLinks />
        {!data || !data.user ? (
          <div className="flex items-center gap-x-3">
            <Link href={`/auth/student/login`}>
              <Button className="text-base">تسجيل الدخول</Button>
            </Link>
            <Link href={`/auth/student/register`}>
              <Button className="text-base" variant="outline">
                انشاء حساب
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <form action={logoutAction}>
              <button className="flex w-full text-primary border border-primary rounded-[4px] hover:bg-primary transition-all duration-200 px-3 py-2 text-sm font-medium hover:text-white md:p-2 md:px-3">
                <div className="hidden md:block">تسجيل الخروج</div>
              </button>
            </form>
            <User />
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
