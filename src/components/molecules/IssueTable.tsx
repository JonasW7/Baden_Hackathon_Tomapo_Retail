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
};

type IssueTableProps<T> = {
  title: string;
  viewAllTo: string;
  columns: IssueColumn<T>[];
  rows: T[];
  getKey: (row: T) => string;
};

export function IssueTable<T>({ title, viewAllTo, columns, rows, getKey }: IssueTableProps<T>) {
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
              <TableHead key={col.header}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={getKey(row)}>
              {columns.map((col) => (
                <TableCell key={col.header}>{col.render(row)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { SeverityBadge };
