import { useSearchParams } from "react-router-dom";
import {
  IssueTableFull,
  SeverityBadge,
  type IssueColumn,
} from "../molecules/IssueTableFull";
import {
  IssueDetailSheet,
  type IssueUser,
} from "../molecules/IssueDetailSheet";

export const userIssues: IssueUser[] = [
  {
    batchid: "OVO-2026-0301",
    type: "Quality",
    severity: "Low",
    date: "2026-03-20",
    title: "Ovomaltine — Klumpen im Pulver",
    description:
      "Habe heute eine frische Dose Ovomaltine geöffnet (Charge OVO-2026-0301, MHD 08/2027). Das Pulver enthält grössere Klumpen, die sich auch beim Rühren nicht auflösen. Könnte auf ein Feuchtigkeitsproblem beim Abfüllen oder Transport hinweisen.",
  },
];

const columns: IssueColumn<IssueUser>[] = [
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
  { header: "Company", render: (r) => r.title },
  { header: "Issue Type", render: (r) => r.type },
  {
    header: "Batch ID",
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
        title="Latest Issues from Users"
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
