"use client";
import { transformGoogleDriveUrl } from "@/lib/helper/ExtractImg";
import { GetTransaction } from "@/services/admin/transactions";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<GetTransaction>[] = [
  {
    accessorKey: "img_url",
    header: "الصورة الشخصية",
    cell: ({ row }) => (
      <div>
        <Image
          src={
            row.original.img_url
              ? transformGoogleDriveUrl(row.original.img_url)
              : "/images/defaultAvatar.webp"
          }
          alt={row.original.student.firstName + "Image"}
          width={200}
          height={200}
          className="w-16 h-16 rounded-full m-auto object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "reference_number",
    header: "رقم العملية",
    cell: ({ row }) => (
      <div className="truncate">{row.original.reference_number}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "أسم الطالب",
    cell: ({ row }) => (
      <div className="truncate">
        {row.original.student.firstName + " " + row.original.student.lastName}
      </div>
    ),
  },
  {
    accessorKey: "course.name",
    header: "أسم الكورس",
    cell: ({ row }) => (
      <div className="truncate">{row.original.course.name}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: "المبلغ",
    cell: ({ row }) => <div className="truncate">{row.original.amount}</div>,
  },
];
