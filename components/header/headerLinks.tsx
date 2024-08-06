"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "الرئيسية",
    href: "/",
  },
  {
    title: "الدورات",
    href: "/courses",
  },
  {
    title: "تواصل معنا",
    href: "/contact",
  },
];

type Props = {};

function HeaderLinks({}: Props) {
  const pathname = usePathname();

  return (
    <div className="flex-1 flex items-center justify-center text-base font-medium gap-x-6">
      {links.map((link) => {
        return (
          <Link
            key={link.title}
            href={link.href}
            className={cn(
              "text-[#121212] hover:text-primary relative",
              pathname === link.href && "text-primary"
            )}
          >
            {pathname === link.href && (
              <motion.span layoutId="underline" className="line mt-1" />
            )}
            {link.title}
          </Link>
        );
      })}
    </div>
  );
}

export default HeaderLinks;
