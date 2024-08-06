import WalletContent from "@/components/wallet/walletContent";
import { getWallet } from "@/services/student/wallet";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المحفظة",
  description: "المحفظة",
};

type Props = {};

async function StudentWallet({}: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WalletContent />
    </HydrationBoundary>
  );
}

export default StudentWallet;
