"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { TQuiz } from "@/services/parent/sons";

type Props = {
  quizes: TQuiz[];
};

function SonQuizesTable({ quizes }: Props) {
  return <DataTable columns={columns} data={quizes} />;
}

export default SonQuizesTable;
