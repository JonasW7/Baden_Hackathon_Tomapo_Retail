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
  columns: IssueColumn<T>[];
  rows: T[];
  getKey: (row: T) => string;
  onRowClick?: (row: T) => void;
};

export function IssueTableFull<T>({
  title,
  columns,
  rows,
  getKey,
  onRowClick,
}: IssueTableProps<T>) {
  return (
    <div className="bg-card rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
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
              className={`text-nowrap ${onRowClick ? "cursor-pointer hover:bg-muted/60" : ""}`}
              onClick={() => onRowClick?.(row)}
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
