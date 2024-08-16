"use client";
import { transformGoogleDriveUrl } from "@/lib/helper/ExtractImg";
import { GetStudent } from "@/services/teacher/students";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<GetStudent>[] = [
  {
    accessorKey: "img_url",
    header: "الصورة الشخصية",
    cell: ({ row }) => (
      <div>
        <Image
          src={transformGoogleDriveUrl(row.original.img_url?.trim()) || "/images/defaultAvatar.webp"}
          alt={row.original.firstName + "Image"}
          width={200}
          height={200}
          className="w-16 h-16 rounded-full m-auto object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "الأسم",
    cell: ({ row }) => (
      <div className="truncate">
        {row.original.firstName + " " + row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "البريد الالكتروني",
    cell: ({ row }) => <div className="line-clamp-1">{row.original.email}</div>,
  },
  {
    accessorKey: "phone",
    header: "رقم الهاتف",
    cell: ({ row }) => <div>{row.original.phone}</div>,
  },
  {
    accessorKey: "class",
    header: "الصف",
    cell: ({ row }) => <div>{row.original.class?.name}</div>,
  },
];
