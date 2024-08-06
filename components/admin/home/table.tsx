"use client";
import { DataTable } from "@/components/ui/data-table";
import { getChargeRequests } from "@/services/admin/charge-requests";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { columns } from "../charge-requests/columns";

type Props = {};

function LatestChargeRequestsTable({}: Props) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const { data: chargeRequests } = useQuery({
    queryKey: ["charge-requests-admin", page],
    queryFn: () => getChargeRequests(page || "1"),
  });

  if (!chargeRequests)
    return (
      <div className=" flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={50} />
      </div>
    );

  return (
    <div>
      <DataTable columns={columns} data={chargeRequests.data} />
    </div>
  );
}

export default LatestChargeRequestsTable;
