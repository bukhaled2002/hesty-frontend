import { getUserByToken } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { transformGoogleDriveUrl } from "@/lib/helper/ExtractImg";

function User() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUserByToken,
  });

  if (!data) {
    return <Loader2 className="animate-spin" />;
  }

  const avatarUrl = transformGoogleDriveUrl(
    data.img_url !== undefined
      ? data.img_url?.trim()
      : "/images/defaultAvatar.webp"
  );

  return (
    <Link
      href={
        data?.role === "student"
          ? "/profile"
          : data?.role === "teacher"
          ? "/teacher/dashboard"
          : data?.role === "admin"
          ? "/admin/dashboard"
          : data?.role === "parent"
          ? "/parent/dashboard"
          : "/"
      }
      className="flex items-center gap-x-2"
    >
      <Image
        alt="Avatar"
        className="rounded-full h-10 w-10 object-cover object-top"
        height={100}
        width={100}
        src={avatarUrl}
      />
      <div className="flex flex-col items-start">
        <div className="font-bold capitalize text-base">{data?.name}</div>
        <div className="text-base font-medium">أهلا بعودتك</div>
      </div>
    </Link>
  );
}

export default User;
