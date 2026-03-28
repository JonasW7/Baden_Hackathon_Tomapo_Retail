import { useSearchParams } from "react-router-dom";
import {
  IssueTableFull,
  SeverityBadge,
  type IssueColumn,
} from "../molecules/IssueTableFull";
import {
  IssueDetailSheet,
  type IssueProd,
} from "../molecules/IssueDetailSheet";

export const productionIssues: IssueProd[] = [
  {
    batchid: "LINDT-85-2026-0201",
    company: "Lindt",
    type: "Recall",
    severity: "High",
    date: "2026-03-12",
    title: "Rückruf: Lindt Excellence 85% — mögliche Fremdkörper",
    description:
      "Das Bundesamt für Lebensmittelsicherheit (BLV) hat Lindt & Sprüngli aufgefordert, die Charge LINDT-85-2026-0201 zurückzurufen. Bei Stichprobenkontrollen wurden in vereinzelten Tafeln Metallsplitter nachgewiesen.",
  },
  {
    batchid: "CC-CH-2026-0312",
    company: "Coca-Cola",
    type: "Quality",
    severity: "Medium",
    date: "2026-03-15",
    title: "Qualitätshinweis: Coca-Cola 500ml — abweichender Geschmack",
    description:
      "Unsere Qualitätskontrolle hat bei vereinzelten Flaschen der Charge CC-CH-2026-0312 einen leicht abweichenden Geschmack festgestellt. Es besteht kein Gesundheitsrisiko.",
  },
  {
    batchid: "MIG-2026-0305",
    company: "Migros",
    type: "Information",
    severity: "Low",
    date: "2026-03-18",
    title: "Info: M-Classic Vollmilch — neue Verpackung ab April 2026",
    description:
      "Ab April 2026 erscheint die M-Classic Vollmilch in einer neuen Tetra Pak Verpackung aus 80% recyceltem Karton. Der Inhalt und das Produkt bleiben unverändert.",
  },
];

const columns: IssueColumn<IssueProd>[] = [
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
    render: (r) => <span className="font-mono">{r.batchid}</span>,
  },
];

export default function ProductionIssues() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("issue");
  const selected =
    productionIssues.find((i) => i.batchid === selectedId) ?? null;

  return (
    <div className="space-y-8">
      <IssueTableFull
        title="Latest Issues from Production"
        columns={columns}
        rows={productionIssues}
        getKey={(r) => r.batchid}
        onRowClick={(r) => setSearchParams({ issue: r.batchid })}
      />
      <IssueDetailSheet
        issue={selected}
        onClose={() => setSearchParams({})}
        tag="Production"
      />
    </div>
  );
}
