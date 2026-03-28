import { useSearchParams } from "react-router-dom";
import {
  IssueTableFull,
  SeverityBadge,
  type IssueColumn,
} from "../molecules/IssueTableFull";
import { IssueDetailSheet, type Issue } from "../molecules/IssueDetailSheet";

const productionIssues: Issue[] = [
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

const columns: IssueColumn<Issue>[] = [
  {
    header: "Severity",
    render: (r) => <SeverityBadge label={r.severity} />,
    className: "w-px pr-4",
  },
  {
    header: "Date",
    render: (r) => <span className="text-muted-foreground">{r.date}</span>,
    className: "w-px pr-4",
  },
  { header: "Company", render: (r) => r.company },
  { header: "Issue Type", render: (r) => r.type },
  {
    header: "Batch ID",
    render: (r) => <span className="font-mono">{r.id}</span>,
  },
];

export default function ProductionIssues() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("issue");
  const selected = productionIssues.find((i) => i.id === selectedId) ?? null;

  return (
    <div className="space-y-8">
      <IssueTableFull
        title="Latest Issues from Production"
        columns={columns}
        rows={productionIssues}
        getKey={(r) => r.id}
        onRowClick={(r) => setSearchParams({ issue: r.id })}
      />
      <IssueDetailSheet
        issue={selected}
        onClose={() => setSearchParams({})}
        tag="Production"
      />
    </div>
  );
}
