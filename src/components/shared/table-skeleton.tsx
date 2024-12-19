import { TableCell, TableRow } from "@/components/ui/table";

export function TableSkeleton({ length = 5 }: { length: number }) {
  return Array.from({ length: 5 }).map((_, rowIdx) => (
    <TableRow key={rowIdx}>
      {Array.from({ length: length }).map((_, cellIdx) => (
        <TableCell key={cellIdx}>
          <div className="animate-pulse bg-secondary-light dark:bg-secondary-dark h-6 rounded"></div>
        </TableCell>
      ))}
    </TableRow>
  ));
}
