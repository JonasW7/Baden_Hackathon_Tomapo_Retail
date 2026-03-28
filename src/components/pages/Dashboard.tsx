import { Users, Package, Warehouse, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  IssueTable,
  type IssueColumn,
} from "@/components/molecules/IssueTableOverview";
import { SeverityBar } from "@/components/atoms/SeverityBar";
import { StatCard } from "@/components/molecules/StatCard";
import { productionIssues } from "./ProductionIssues";
import { userIssues } from "./UserIssues";
import type {
  IssueProd,
  IssueUser,
} from "@/components/molecules/IssueDetailSheet";

const productionColumns: IssueColumn<IssueProd>[] = [
  {
    header: "",
    render: (r) => <SeverityBar label={r.severity} />,
    className: "w-px pr-4",
  },
  {
    header: "Batch ID",
    render: (r) => <span className="font-mono text-xs">{r.batchid}</span>,
    className: "w-40",
  },
  { header: "Company", render: (r) => r.company },
  { header: "Title", render: (r) => r.title },
  { header: "Issue Type", render: (r) => r.type, className: "w-36" },
];

const userColumns: IssueColumn<IssueUser>[] = [
  {
    header: "",
    render: (r) => <SeverityBar label={r.severity} />,
    className: "w-px pr-4",
  },
  {
    header: "Batch ID",
    render: (r) => <span className="font-mono text-xs">{r.batchid}</span>,
    className: "w-40",
  },
  { header: "Title", render: (r) => r.title },
  { header: "Issue Type", render: (r) => r.type, className: "w-36" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Warehouse}
          label="Production Issues"
          value={productionIssues.length}
          color="bg-severity-high text-severity-high-foreground"
        />
        <StatCard
          icon={Users}
          label="User Issues"
          value={userIssues.length}
          color="bg-severity-info text-severity-info-foreground"
        />
        <StatCard
          icon={RotateCcw}
          label="Recalls Issued"
          value={4}
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
        getKey={(r) => r.batchid}
        onRowClick={(r) => navigate(`/issues-production?issue=${r.batchid}`)}
      />

      {/* User Issues */}
      <IssueTable
        title="Latest Issues from Users"
        viewAllTo="/issues-user"
        columns={userColumns}
        rows={userIssues}
        getKey={(r) => r.batchid}
        onRowClick={(r) => navigate(`/issues-user?issue=${r.batchid}`)}
      />
    </div>
  );
}
