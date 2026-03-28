import { Users, Package, Warehouse, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  IssueTable,
  type IssueColumn,
} from "@/components/molecules/IssueTableOverview";
import { SeverityBar } from "@/components/atoms/SeverityBar";
import { StatCard } from "@/components/molecules/StatCard";

// --- Mock Data ---
type ProductionIssue = {
  id: string;
  company: string;
  type: string;
  severity: string;
};
type UserIssue = {
  id: string;
  user: string;
  product: string;
  issue: string;
  severity: string;
  match: boolean;
};

const productionIssues: ProductionIssue[] = [
  {
    id: "BATCH-001",
    company: "FreshFarms GmbH",
    type: "Temperature Deviation",
    severity: "High",
  },
  {
    id: "BATCH-002",
    company: "AlpenMilch AG",
    type: "Contamination Risk",
    severity: "Critical",
  },
  {
    id: "BATCH-003",
    company: "GrainCo Ltd",
    type: "Packaging Defect",
    severity: "Low",
  },
];

const userIssues: UserIssue[] = [
  {
    id: "USR-001",
    user: "Max M.",
    product: "Organic Yogurt",
    issue: "Foreign Object",
    severity: "High",
    match: true,
  },
  {
    id: "USR-002",
    user: "Anna K.",
    product: "Whole Milk",
    issue: "Off Taste",
    severity: "Medium",
    match: true,
  },
  {
    id: "USR-003",
    user: "Tom B.",
    product: "Cheese Block",
    issue: "Mold",
    severity: "High",
    match: false,
  },
];

// --- Column Definitions ---
const productionColumns: IssueColumn<ProductionIssue>[] = [
  {
    header: "",
    render: (r) => <SeverityBar label={r.severity} />,
    className: "w-px pr-4",
  },
  {
    header: "Batch ID",
    render: (r) => <span className="font-mono text-xs">{r.id}</span>,
  },
  { header: "Company", render: (r) => r.company },
  { header: "Issue Type", render: (r) => r.type },
];

const userColumns: IssueColumn<UserIssue>[] = [
  { header: "", render: (r) => <SeverityBar label={r.severity} /> },
  {
    header: "Report ID",
    render: (r) => <span className="font-mono text-xs">{r.id}</span>,
  },
  { header: "User", render: (r) => r.user },
  { header: "Product", render: (r) => r.product },
  { header: "Issue", render: (r) => r.issue },
  {
    header: "Batch Match",
    render: (r) => (
      <span
        className={`font-semibold ${r.match ? "text-severity-low-foreground" : "text-destructive-foreground"}`}
      >
        {r.match ? "Yes" : "No"}
      </span>
    ),
  },
];

// --- Dashboard ---
export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Warehouse}
          label="Production Issues"
          value={7}
          color="bg-severity-high text-severity-high-foreground"
        />
        <StatCard
          icon={Users}
          label="User Issues"
          value={12}
          color="bg-severity-info text-severity-info-foreground"
        />
        <StatCard
          icon={RotateCcw}
          label="Recalls Issued"
          value={2}
          color="bg-destructive text-destructive-foreground"
        />
        <StatCard
          icon={Package}
          label="Batches Tracked"
          value={348}
          color="bg-severity-low text-severity-low-foreground"
        />
      </div>

      {/* Production Issues */}
      <IssueTable
        title="Latest Issues from Production"
        viewAllTo="/issues-production"
        columns={productionColumns}
        rows={productionIssues}
        getKey={(r) => r.id}
        onRowClick={(r) => navigate(`/issues-production?issue=${r.id}`)}
      />

      {/* User Issues */}
      <IssueTable
        title="Latest Issues from Users"
        viewAllTo="/issues-user"
        columns={userColumns}
        rows={userIssues}
        getKey={(r) => r.id}
        onRowClick={(r) => navigate(`/issues-user?issue=${r.id}`)}
      />
    </div>
  );
}
