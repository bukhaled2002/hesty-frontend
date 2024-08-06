"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = React.ComponentProps<typeof Link>;

export default function NavLink({ className, ...props }: Props) {
  const pathname = usePathname();
  return (
    <li
      className={cn(
        pathname.startsWith(props.href as string) &&
          "bg-secondary text-white text-base rounded-[6px]"
      )}
    >
      <Link {...props} className={cn("flex items-center gap-x-2", className)} />
    </li>
  );
}
