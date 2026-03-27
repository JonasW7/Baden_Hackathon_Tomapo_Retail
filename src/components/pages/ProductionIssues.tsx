import { useState } from "react";
import {
  IssueTableFull,
  SeverityBadge,
  type IssueColumn,
} from "../molecules/IssueTableFull";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "../shadcn/sheet";
import { Button } from "../shadcn/button";
import { Bell, RotateCcw } from "lucide-react";

type ProductionIssue = {
  id: string;
  company: string;
  type: string;
  severity: string;
  date: string;
};

const productionIssues: ProductionIssue[] = [
  {
    id: "BATCH-001",
    company: "FreshFarms GmbH",
    type: "Temperature Deviation",
    severity: "High",
    date: "2026-03-25",
  },
  {
    id: "BATCH-002",
    company: "AlpenMilch AG",
    type: "Contamination Risk",
    severity: "Critical",
    date: "2026-03-26",
  },
  {
    id: "BATCH-003",
    company: "GrainCo Ltd",
    type: "Packaging Defect",
    severity: "Low",
    date: "2026-03-27",
  },
];

const productionColumns: IssueColumn<ProductionIssue>[] = [
  {
    header: "Severity",
    render: (r) => <SeverityBadge label={r.severity} />,
    className: "w-px pr-4 ",
  },
  {
    header: "Date",
    render: (r) => <span className="text-muted-foreground ">{r.date}</span>,
    className: "w-px pr-4",
  },
  { header: "Company", render: (r) => r.company },
  { header: "Issue Type", render: (r) => r.type },
  {
    header: "Batch ID",
    render: (r) => <span className="font-mono">{r.id}</span>,
  },
];

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

export default function ProductionIssues() {
  const [selected, setSelected] = useState<ProductionIssue | null>(null);

  return (
    <>
      <IssueTableFull
        title="Latest Issues from Production"
        columns={productionColumns}
        rows={productionIssues}
        getKey={(r) => r.id}
        onRowClick={setSelected}
      />

      <Sheet
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <SheetContent side="right" className="w-120 sm:max-w-120 flex flex-col">
          <SheetHeader className="pb-2">
            <div className="flex items-center gap-3">
              {selected && <SeverityBadge label={selected.severity} />}
              <SheetTitle className="font-mono text-base">
                {selected?.id}
              </SheetTitle>
            </div>
            <SheetDescription className="text-muted-foreground">
              {selected?.date}
            </SheetDescription>
          </SheetHeader>

          {selected && (
            <div className="flex flex-col gap-5 px-4 py-4 flex-1 overflow-y-auto">
              <DetailRow label="Company" value={selected.company} />
              <DetailRow label="Issue Type" value={selected.type} />
              <DetailRow label="Date" value={selected.date} />
            </div>
          )}

          <SheetFooter className="flex flex-row gap-2 px-4 pb-6">
            <Button
              variant="outline"
              className="flex-1 cursor-pointer "
              onClick={() => alert(`Issue ${selected?.id} escalated`)}
            >
              <RotateCcw />
              Create Recall
            </Button>
            <Button
              variant="outline"
              className="flex-1 cursor-pointer"
              onClick={() => alert(`Alert sent for ${selected?.id}`)}
            >
              <Bell />
              Send Alert to User
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
