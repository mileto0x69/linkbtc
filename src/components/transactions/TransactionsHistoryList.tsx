import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GOLDRUSH_API_KEY } from "@/utils/constants/helpers";
import { minifyAddress } from "@/utils/functions/helper";
import { useEffect, useMemo, useState } from "react";
import {
  SortAscIcon,
  SortDescIcon,
  ArrowUpDownIcon,
  CopyIcon,
  Clock1Icon,
} from "lucide-react";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { timestampParser } from "@covalenthq/client-sdk";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSearchParams, useRouter } from "next/navigation";

export function TransactionsHistoryList({
  address,
}: Readonly<{ address: string }>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get("page");
  const pageSizeParam = searchParams.get("pageSize");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TS SDK Will have this once deployed
  const [transactionData, setTransactionData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<string>("");
  const [timestamp, setTimestamp] = useState<"relative" | "descriptive">(
    "descriptive"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(
    pageParam ? parseInt(pageParam, 10) : 1
  );
  const [pageSize, setPageSize] = useState<number>(
    pageSizeParam ? parseInt(pageSizeParam, 10) : 10
  );

  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (!address || !GOLDRUSH_API_KEY) return;
      setLoading(true);

      const response = await fetch(
        `https://api.covalenthq.com/v1/cq/covalent/app/bitcoin/transactions/?address=${address}&key=${GOLDRUSH_API_KEY}&page-size=${pageSize}&page-number=${page}`
      );
      const data = await response.json();
      setTransactionData(data.data.items);
      setTotalPages(data.data.pagination.total_pages); // Set total pages
      setLoading(false);
    };

    fetchWalletBalance();
  }, [address, page, pageSize]);

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortField(field);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const sortedData = useMemo(() => {
    if (!sortField) return transactionData;
    return [...transactionData].sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (typeof fieldA === "number" && typeof fieldB === "number") {
        return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
      } else if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortOrder === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      return 0;
    });
  }, [transactionData, sortField, sortOrder]);

  const generatePagination = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?tab=transactions&page=${newPage}&pageSize=${pageSize}`);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
    router.push(`?tab=transactions&page=1&pageSize=${newPageSize}`);
  };

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
    <div className="pb-20">
      <Table>
        <TableHeader>
          <TableRow>
            {TableHeadRender("tx_hash", "Transaction Hash")}
            {TableHeadRender("block_hash", "Block Hash")}
            {TableHeadRender("block_height", "Block Height")}
            {TableHeadRender("block_signed_at", "Signed At")}
            {TableHeadRender("value", "Value")}
            {TableHeadRender("weight", "Weight")}
            {TableHeadRender("type", "Type")}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableSkeleton length={7} />
          ) : sortedData.length === 0 ? (
            <>
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No Transactions Found
                </TableCell>
              </TableRow>
            </>
          ) : (
            sortedData.map((txn_details) => (
              <TableRow key={txn_details.tx_hash}>
                <TableCell className="flex items-center gap-2">
                  <p className="text-foreground-light dark:text-foreground-dark">
                    {minifyAddress(txn_details.tx_hash)}
                  </p>
                  <CopyIcon
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        txn_details.contract_address
                      );
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {minifyAddress(txn_details.block_hash)}{" "}
                    <CopyIcon
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          txn_details.contract_address
                        );
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>{txn_details.block_height}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {timestampParser(txn_details.block_signed_at, timestamp)}
                    <Clock1Icon
                      className="h-3 w-3 cursor-pointer"
                      onClick={() =>
                        setTimestamp(
                          timestamp === "relative" ? "descriptive" : "relative"
                        )
                      }
                    />
                  </div>
                </TableCell>
                <TableCell>
                  {Number(txn_details.value) /
                    Math.pow(10, txn_details.contract_decimals)}{" "}
                  BTC
                </TableCell>
                <TableCell>{txn_details.weight} WU</TableCell>
                <TableCell>
                  {txn_details.type === "input" ? "Input" : "Output"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {sortedData.length > 0 && (
        <div className="flex justify-between mt-4 w-full">
          <div className="mb-4">
            <Select
              onValueChange={(value) => handlePageSizeChange(parseInt(value))}
              defaultValue={pageSize.toString()}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Page Size" />
              </SelectTrigger>
              <SelectContent className="bg-background-light dark:bg-background-dark">
                {["5", "10", "20", "30", "50"].map((size) => (
                  <SelectItem
                    key={size}
                    value={size}
                    className="hover:bg-primary-light hover:dark:bg-primary-dark"
                  >
                    Items Per Page: {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Pagination className="my-4 mx-0 justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (page > 1) {
                      handlePageChange(page - 1);
                    }
                  }}
                  isActive={page !== 1}
                />
              </PaginationItem>

              {generatePagination().map((pg) =>
                pg === "..." ? (
                  <PaginationItem key={pg}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pg}>
                    <PaginationLink
                      isActive={pg === page}
                      onClick={() => handlePageChange(Number(pg))}
                    >
                      {pg}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (page < totalPages) {
                      handlePageChange(page + 1);
                    }
                  }}
                  isActive={page !== totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
