import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../shadcn/sheet";
import { Separator } from "../shadcn/separator";
import { SeverityBadge } from "../atoms/SeverityBadge";
import type { Recall } from "../organisms/RecallList";

type Props = {
  recall: Recall | null;
  onClose: () => void;
};

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-bold text-foreground min-w-24">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

const statusColor: Record<string, string> = {
  Active: "Critical",
  Monitoring: "High",
  Resolved: "Low",
};

export function RecallDetailSheet({ recall, onClose }: Props) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <Sheet open={recall !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-120 sm:max-w-120 flex flex-col">
        <SheetHeader className="pb-2">
          <div className="flex items-center gap-3">
            <SheetTitle className="font-mono text-base">
              Recall of {recall?.id}
            </SheetTitle>
          </div>
          <SheetDescription className="text-muted-foreground">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
              Recall
            </span>
          </SheetDescription>
        </SheetHeader>

        <Separator />

        {recall && (
          <div className="flex flex-col gap-5 px-4 py-4 flex-1 overflow-y-auto">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Title
              </span>
              <span className="text-sm font-semibold text-foreground">
                {recall.title}
              </span>
            </div>

            <Separator />

            {/* Description */}
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Description
              </span>
              <span className="text-sm text-foreground whitespace-pre-wrap">
                {recall.description}
              </span>
            </div>

            <Separator />

            {/* Collapsible details */}
            <div>
              <button
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setDetailsOpen((v) => !v)}
              >
                {detailsOpen ? (
                  <ChevronDown className="size-3" />
                ) : (
                  <ChevronRight className="size-3" />
                )}
                Details
              </button>
              {detailsOpen && (
                <div className="flex flex-col gap-3 mt-3">
                  <DetailRow
                    label="Status"
                    value={<SeverityBadge label={statusColor[recall.status]} />}
                  />
                  <DetailRow label="Date" value={recall.date} />
                  <DetailRow label="Product" value={recall.product} />
                  <DetailRow
                    label="Units"
                    value={`${recall.units.toLocaleString()} in circulation`}
                  />
                  <DetailRow
                    label="Resolved"
                    value={`${recall.resolved.toLocaleString()} (${Math.round((recall.resolved / recall.units) * 100)}%)`}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
