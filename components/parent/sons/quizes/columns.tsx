"use client";
import { cn } from "@/lib/utils";
import { TQuiz } from "@/services/parent/sons";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<TQuiz>[] = [
  {
    accessorKey: "subject",
    header: "المادة",
    cell: ({ row }) => <div>{row.original.subject}</div>,
  },
  {
    accessorKey: "title",
    header: "الأسم",
    cell: ({ row }) => <div className="truncate">{row.original.title}</div>,
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => (
      <div
        className={cn(
          row.original.status === "passed" ? "text-green-500" : "text-red-500"
        )}
      >
        {row.original.status === "passed" ? "ناجح" : "راسب"}
      </div>
    ),
  },
  {
    accessorKey: "score",
    header: "الدرجة",
    cell: ({ row }) => <div>{row.original.score}</div>,
  },
  {
    accessorKey: "actions",
    header: "التعديلات",
    cell: ({ row }) => <Actions quiz={row.original} />,
  },
];

export async function Actions({ quiz }: { quiz: TQuiz }) {
  return (
    <div className="flex items-center justify-center">
      <Link href={`/parent/sons/${quiz.sonId}/quizResults/${quiz.id}`}>
        <Eye className="text-blue-500" size={18} />
      </Link>
    </div>
  );
}
