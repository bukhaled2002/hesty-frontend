"use client";
import { getUserByToken } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";

function User() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUserByToken,
  });

  if (!data) {
    return <Loader2 className="animate-spin" />;
  }
  return (
    <div className="flex items-center gap-x-[10px]">
      <Image
        alt={data.name + " image"}
        className="rounded-full object-cover"
        width={53}
        height={53}
        unoptimized
        src={
          data.img_url !== undefined
            ? data.img_url.trim()
            : "/images/defaultAvatar.webp"
        }
      />
      <div>
        <h1 className="text-sm font-bold text-[#282828]">{data.name}</h1>
        <div className="text-sm font-medium text-[#6F6F6F]">{data.email}</div>
      </div>
    </div>
  );
}

export default User;
