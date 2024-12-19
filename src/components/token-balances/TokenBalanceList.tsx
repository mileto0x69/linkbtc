import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GOLDRUSH_API_KEY } from "@/utils/constants/helpers";
import {
  calculatePercentageChange,
  getAddressType,
  minifyAddress,
} from "@/utils/functions/helper";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  SortAscIcon,
  SortDescIcon,
  ArrowUpDownIcon,
  CopyIcon,
} from "lucide-react";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { useToast } from "../ui/use-toast";

export function TokenBalancesList({ address }: { address: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TS SDK Will have this once deployed
  const [tokenData, setTokenData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<string>("balance");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();

  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (!address || !GOLDRUSH_API_KEY) return;
      setLoading(true);

      const endpoint =
        getAddressType(address) === "HD"
          ? `https://api.covalenthq.com/v1/btc-mainnet/address/${address}/hd_wallets/?key=${GOLDRUSH_API_KEY}`
          : `https://api.covalenthq.com/v1/btc-mainnet/address/${address}/balances_v2/?key=${GOLDRUSH_API_KEY}`;

      const response = await fetch(endpoint);
      const data = await response.json();
      setTokenData(data.data.items);
      setLoading(false);
    };

    fetchWalletBalance();
  }, [address]);

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortField(field);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const sortedData = useMemo(() => {
    if (!sortField) return tokenData;
    return [...tokenData].sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (
        (typeof fieldA === "number" && typeof fieldB === "number") ||
        sortField === "balance"
      ) {
        return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
      } else if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortOrder === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      return 0;
    });
  }, [tokenData, sortField, sortOrder]);

  const TableHeadRender = (field: string, label: string) => (
    <TableHead onClick={() => handleSort(field)}>
      <div className="flex items-center gap-2">
        {label}
        {sortField === field ? (
          sortOrder === "asc" ? (
            <SortAscIcon className="h-4 w-4" />
          ) : (
            <SortDescIcon className="h-4 w-4" />
          )
        ) : (
          <ArrowUpDownIcon className="h-4 w-4" />
        )}
      </div>
    </TableHead>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {getAddressType(address) === "HD" &&
            TableHeadRender("child_address", "Child Address")}
          {TableHeadRender("contract_display_name", "Token")}
          {TableHeadRender("quote_rate", "Price")}
          {TableHeadRender("balance", "Balance")}
          {TableHeadRender("quote", "Value")}
          {TableHeadRender("quote_24h", "24H Change")}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableSkeleton length={getAddressType(address) === "HD" ? 6 : 5} />
        ) : sortedData.length === 0 ? (
          <>
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No Transactions Found
              </TableCell>
            </TableRow>
          </>
        ) : (
          sortedData.map((tokenDetails) => (
            <TableRow key={tokenDetails.child_address}>
              {getAddressType(address) === "HD" && (
                <TableCell>
                  <div className="flex items-center gap-1">
                    {minifyAddress(tokenDetails.child_address)}
                    <CopyIcon
                      className="h-3 w-3 text-foreground-light dark:text-foreground-dark cursor-pointer"
                      onClick={() => {
                        toast({
                          title: "Address Copied",
                          description: "The address has been copied",
                        });
                        navigator.clipboard.writeText(
                          tokenDetails.child_address
                        );
                      }}
                    />
                  </div>
                </TableCell>
              )}
              <TableCell className="flex items-center gap-2">
                <Image
                  src={tokenDetails.logo_url}
                  alt={tokenDetails.contract_name}
                  width={24}
                  height={24}
                />
                <div className="flex flex-col">
                  <p className="text-foreground-light dark:text-foreground-dark">
                    {tokenDetails.contract_display_name}
                  </p>
                  <p className="text-secondary-light dark:text-secondary-dark text-xs">
                    {tokenDetails.contract_ticker_symbol}
                  </p>
                </div>
              </TableCell>
              <TableCell>${tokenDetails.quote_rate.toLocaleString()}</TableCell>
              <TableCell>
                {(
                  tokenDetails.balance /
                  Math.pow(10, tokenDetails.contract_decimals)
                ).toFixed(4)}
              </TableCell>
              <TableCell>{tokenDetails.pretty_quote}</TableCell>
              <TableCell
                className={
                  tokenDetails.quote - tokenDetails.quote_24h > 0
                    ? "text-success"
                    : tokenDetails.quote - tokenDetails.quote_24h < 0
                    ? "text-danger"
                    : ""
                }
              >
                {calculatePercentageChange(
                  tokenDetails.quote,
                  tokenDetails.quote_24h
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
