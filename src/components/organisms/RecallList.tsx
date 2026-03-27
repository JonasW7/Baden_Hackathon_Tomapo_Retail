import { SeverityBadge } from "@/components/atoms/SeverityBadge";

type RecallStatus = "Active" | "Monitoring" | "Resolved";

export type Recall = {
  product: string;
  batch: string;
  units: number;
  notified: number;
  status: RecallStatus;
};

const statusColor: Record<RecallStatus, string> = {
  Active: "Critical",
  Monitoring: "High",
  Resolved: "Low",
};

type RecallListProps = {
  recalls: Recall[];
};

export function RecallList({ recalls }: RecallListProps) {
  return (
    <div className="space-y-3">
      {recalls.map((recall) => (
        <div
          key={recall.batch}
          className="bg-card rounded-xl shadow-sm px-5 py-4 flex items-center justify-between"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <p className="font-semibold text-foreground">{recall.product}</p>
              <SeverityBadge label={statusColor[recall.status]} />
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              {recall.batch}
            </p>
            <p className="text-sm text-muted-foreground">
              {recall.units.toLocaleString()} units in circulation ·{" "}
              {recall.notified.toLocaleString()} users notified
            </p>
          </div>
          <div className="text-right text-sm text-muted-foreground min-w-36">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs">Notified</span>
              <span className="text-xs font-semibold text-foreground">
                {Math.round((recall.notified / recall.units) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all"
                style={{ width: `${Math.round((recall.notified / recall.units) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
