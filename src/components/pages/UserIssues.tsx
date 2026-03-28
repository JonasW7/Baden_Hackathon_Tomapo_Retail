import { useSearchParams } from "react-router-dom";
import {
  IssueTableFull,
  SeverityBadge,
  type IssueColumn,
} from "../molecules/IssueTableFull";
import { IssueDetailSheet, type Issue } from "../molecules/IssueDetailSheet";

const userIssues: Issue[] = [
  {
    batchid: "USR-001",
    company: "Rewe Group",
    type: "Missing Label",
    severity: "Medium",
    date: "2026-03-24",
  },
  {
    batchid: "USR-002",
    company: "Edeka AG",
    type: "Wrong Expiry Date",
    severity: "High",
    date: "2026-03-25",
  },
  {
    batchid: "USR-003",
    company: "Lidl GmbH",
    type: "Foreign Object",
    severity: "Critical",
    date: "2026-03-26",
  },
  {
    batchid: "USR-004",
    company: "Aldi Süd",
    type: "Damaged Packaging",
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
    header: "Report ID",
    render: (r) => <span className="font-mono">{r.batchid}</span>,
  },
];

export default function UserIssues() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("issue");
  const selected = userIssues.find((i) => i.batchid === selectedId) ?? null;

  return (
    <div className="space-y-8">
      <IssueTableFull
        title="User Reported Issues"
        columns={columns}
        rows={userIssues}
        getKey={(r) => r.batchid}
        onRowClick={(r) => setSearchParams({ issue: r.batchid })}
      />
      <IssueDetailSheet
        issue={selected}
        onClose={() => setSearchParams({})}
        tag="User"
      />
    </div>
  );
}
