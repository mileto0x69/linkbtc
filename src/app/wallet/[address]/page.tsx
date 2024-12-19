"use client";

import { AddressCard } from "@covalenthq/goldrush-kit";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GOLDRUSH_API_KEY } from "@/utils/constants/helpers";
import { getAddressType } from "@/utils/functions/helper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenBalancesList } from "@/components/token-balances/TokenBalanceList";
import { DollarSignIcon, ReceiptIcon } from "lucide-react";
import { TransactionsHistoryList } from "@/components/transactions/TransactionsHistoryList";

const WalletDashboard = ({
  params,
}: {
  params: {
    address: string;
  };
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") ?? "balances";

  const handleFetchWalletBalance = async () => {
    if (!params.address || !GOLDRUSH_API_KEY) return;
    let resp: Response;
    console.log(getAddressType(params.address));
    if (getAddressType(params.address) === "HD") {
      resp = await fetch(
        `https://api.covalenthq.com/v1/btc-mainnet/address/${params.address}/hd_wallets/?key=${GOLDRUSH_API_KEY}`
      );
    } else {
      resp = await fetch(
        `https://api.covalenthq.com/v1/btc-mainnet/address/${params.address}/balances_v2/?key=${GOLDRUSH_API_KEY}`
      );
    }
    const data = await resp.json();
    console.log(data);
  };

  useEffect(() => {
    if (!params.address || !GOLDRUSH_API_KEY) return;
    handleFetchWalletBalance();
  }, [params.address]);

  const handleTabChange = (value: string) => {
    router.push(`/wallet/${params.address}?tab=${value}`);
  };

  return (
    <Tabs value={initialTab} onValueChange={handleTabChange}>
      <div className="flex w-full container items-start gap-4 pb-20">
        <div className="flex flex-col gap-8">
          <AddressCard address={params.address} avatar={{}} />
          <TabsList className="flex flex-col items-start w-full gap-2">
            <TabsTrigger
              className="w-full flex items-center gap-1"
              value="balances"
            >
              <DollarSignIcon size={16} />
              Balances
            </TabsTrigger>
            <TabsTrigger
              className="w-full flex items-center gap-1"
              value="transactions"
            >
              <ReceiptIcon size={16} />
              Transactions
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1">
          <TabsContent value="balances">
            <TokenBalancesList address={params.address} />
          </TabsContent>
          <TabsContent value="transactions">
            <TransactionsHistoryList address={params.address} />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};

export default WalletDashboard;
