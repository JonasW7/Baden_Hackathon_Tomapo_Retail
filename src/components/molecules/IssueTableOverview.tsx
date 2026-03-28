import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/shadcn/table";
import { SeverityBadge } from "@/components/atoms/SeverityBadge";

export type IssueColumn<T> = {
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
};

type IssueTableProps<T> = {
  title: string;
  viewAllTo: string;
  columns: IssueColumn<T>[];
  rows: T[];
  getKey: (row: T) => string;
  onRowClick?: (row: T) => void;
};

export function IssueTable<T>({
  title,
  viewAllTo,
  columns,
  rows,
  getKey,
  onRowClick,
}: IssueTableProps<T>) {
  return (
    <div className="bg-card rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <NavLink
          to={viewAllTo}
          className="flex items-center gap-1 text-sm text-sidebar-primary-foreground hover:underline cursor-pointer"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.header} className={col.className}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={getKey(row)}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? "cursor-pointer hover:bg-muted/60" : ""}
            >
              {columns.map((col) => (
                <TableCell key={col.header} className={col.className}>
                  {col.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { SeverityBadge };
