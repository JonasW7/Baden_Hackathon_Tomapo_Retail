import { NavLink } from "react-router-dom";
import {
  AlertTriangle,
  Users,
  Package,
  Warehouse,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import {
  IssueTable,
  Badge,
  type IssueColumn,
} from "@/components/molecules/IssueTable";
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
  match: string;
};
type ActiveRecall = {
  product: string;
  batch: string;
  units: number;
  notified: number;
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
    id: "RPT-101",
    user: "Max M.",
    product: "Organic Yogurt",
    issue: "Foreign Object",
    severity: "High",
    match: "94%",
  },
  {
    id: "RPT-102",
    user: "Anna K.",
    product: "Whole Milk",
    issue: "Off Taste",
    severity: "Medium",
    match: "78%",
  },
  {
    id: "RPT-103",
    user: "Tom B.",
    product: "Cheese Block",
    issue: "Mold",
    severity: "High",
    match: "89%",
  },
];

const activeRecalls: ActiveRecall[] = [
  {
    product: "Chocolate Hazelnut Spread",
    batch: "CHO-2024-11",
    units: 2000,
    notified: 1450,
  },
  {
    product: "Organic Apple Juice",
    batch: "APJ-2024-09",
    units: 850,
    notified: 720,
  },
];

// --- Column Definitions ---
const productionColumns: IssueColumn<ProductionIssue>[] = [
  {
    header: "Batch ID",
    render: (r) => <span className="font-mono text-xs">{r.id}</span>,
  },
  { header: "Company", render: (r) => r.company },
  { header: "Issue Type", render: (r) => r.type },
  { header: "Severity", render: (r) => <Badge label={r.severity} /> },
];

const userColumns: IssueColumn<UserIssue>[] = [
  {
    header: "Report ID",
    render: (r) => <span className="font-mono text-xs">{r.id}</span>,
  },
  { header: "User", render: (r) => r.user },
  { header: "Product", render: (r) => r.product },
  { header: "Issue", render: (r) => r.issue },
  { header: "Severity", render: (r) => <Badge label={r.severity} /> },
  {
    header: "AI Batch Match",
    render: (r) => (
      <span className="font-semibold text-sidebar-primary-foreground">
        {r.match}
      </span>
    ),
  },
];

// --- Dashboard ---
export default function Dashboard() {
  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Warehouse}
          label="Production Issues"
          value={7}
          color="bg-orange-100 text-orange-600"
        />
        <StatCard
          icon={Users}
          label="User Issues"
          value={12}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={RotateCcw}
          label="Recalls Issued"
          value={2}
          color="bg-red-100 text-red-600"
        />
        <StatCard
          icon={Package}
          label="Batches Tracked"
          value={348}
          color="bg-green-100 text-green-700"
        />
      </div>

      {/* Production Issues */}
      <IssueTable
        title="Incoming Issues from Production"
        viewAllTo="/issues-production"
        columns={productionColumns}
        rows={productionIssues}
        getKey={(r) => r.id}
      />

      {/* User Issues */}
      <IssueTable
        title="Incoming Issues from Users"
        viewAllTo="/issues-user"
        columns={userColumns}
        rows={userIssues}
        getKey={(r) => r.id}
      />

      {/* Recall Center */}
      <div className="bg-card rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">
            Recall Center
          </h2>
          <NavLink
            to="/recall-center"
            className="flex items-center gap-1 text-sm text-sidebar-primary-foreground hover:underline cursor-pointer"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>
        <div className="space-y-3">
          {activeRecalls.map((recall) => (
            <div
              key={recall.batch}
              className="flex items-center justify-between rounded-lg bg-muted px-4 py-3"
            >
              <div>
                <p className="font-medium text-sm">
                  Active recall:{" "}
                  <span className="font-bold">{recall.product}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Batch {recall.batch} · {recall.units.toLocaleString()} units
                  in circulation · {recall.notified.toLocaleString()} users
                  notified
                </p>
              </div>
              <Badge label="Critical" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
