import { SeverityBadge } from "@/components/atoms/SeverityBadge";

type RecallStatus = "Active" | "Monitoring" | "Resolved";

export type Recall = {
  id: string;
  product: string;
  batch: string;
  units: number;
  resolved: number;
  status: RecallStatus;
  title: string;
  description: string;
  date: string;
};

const statusColor: Record<RecallStatus, string> = {
  Active: "Critical",
  Monitoring: "High",
  Resolved: "Low",
};

type RecallListProps = {
  recalls: Recall[];
  onRowClick?: (recall: Recall) => void;
};

export function RecallList({ recalls, onRowClick }: RecallListProps) {
  return (
    <div className="space-y-3">
      {recalls.map((recall) => (
        <div
          key={recall.batch}
          onClick={() => onRowClick?.(recall)}
          className={`bg-card rounded-xl shadow-sm px-5 py-4 flex items-center justify-between ${onRowClick ? "cursor-pointer hover:bg-muted/60 transition-colors" : ""}`}
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
              {recall.resolved.toLocaleString()} units resolved
            </p>
          </div>
          <div className="text-right text-sm text-muted-foreground min-w-36">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs">Resolved</span>
              <span className="text-xs font-semibold text-foreground">
                {Math.round((recall.resolved / recall.units) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all"
                style={{
                  width: `${Math.round((recall.resolved / recall.units) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
