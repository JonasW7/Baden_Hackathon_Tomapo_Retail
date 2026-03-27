import {
  IssueTableFull,
  SeverityBadge,
  type IssueColumn,
} from "../molecules/IssueTableFull";

export default function HomePage() {
  // --- Mock Data ---
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

  // --- Column Definitions ---
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

  return (
    <>
      <IssueTableFull
        title="Latest Issues from Production"
        columns={productionColumns}
        rows={productionIssues}
        getKey={(r) => r.id}
      />
    </>
  );
}
