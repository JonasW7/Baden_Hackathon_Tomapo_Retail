import { useState } from "react";
import { createAlert } from "@/services/alertService.js";
import { ChevronDown, ChevronRight, RotateCcw, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "../shadcn/sheet";
import { Button } from "../shadcn/button";
import { Separator } from "../shadcn/separator";
import { Input } from "../shadcn/input";
import { SeverityBadge } from "../atoms/SeverityBadge";
import type { IssueProd, IssueUser } from "./IssueDetailSheet";

type Props = {
  issue: IssueProd | IssueUser;
  open: boolean;
  onClose: () => void;
  tag?: string;
};

function FixedField({
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

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

export function CreateRecallSheet({ issue, open, onClose, tag }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fromIssueOpen, setFromIssueOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-120 sm:max-w-120 flex flex-col">
        <SheetHeader className="pb-2">
          <SheetTitle>
            Create Recall for{" "}
            <span className="font-mono text-foreground">{issue.batchid}</span>
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            {tag && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                {tag}
              </span>
            )}
          </SheetDescription>
        </SheetHeader>

        <Separator />

        <div className="flex flex-col gap-6 px-4 py-4 flex-1 overflow-y-auto">
          {/* Editable fields */}
          <FormField label="Title">
            <Input
              placeholder="e.g. Temperature breach — FreshFarms batch"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>

          <FormField label="Description">
            <textarea
              className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 resize-none dark:bg-input/30"
              placeholder="Describe the issue and actions required..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>

          <Separator />

          {/* Collapsible "From Issue" section */}
          <div>
            <button
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer hover:text-foreground transition-colors"
              onClick={() => setFromIssueOpen((v) => !v)}
            >
              {fromIssueOpen ? (
                <ChevronDown className="size-3" />
              ) : (
                <ChevronRight className="size-3" />
              )}
              From Issue
            </button>
            {fromIssueOpen && (
              <div className="flex flex-col gap-3 mt-3">
                <FixedField
                  label="Severity"
                  value={<SeverityBadge label={issue.severity} />}
                />
                <FixedField
                  label="Batch ID"
                  value={<span className="font-mono">{issue.batchid}</span>}
                />
                {"company" in issue && issue.company && (
                  <FixedField label="Company" value={issue.company} />
                )}
                <FixedField label="Issue Type" value={issue.type} />
                <FixedField label="Date" value={issue.date} />
              </div>
            )}
          </div>
        </div>

        <SheetFooter className="flex flex-row gap-2 px-4 pb-6">
          <Button
            variant="default"
            className="flex-1 cursor-pointer"
            onClick={onClose}
          >
            <X />
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="flex-1 cursor-pointer"
            disabled={!title.trim() || loading}
            onClick={async () => {
              setLoading(true);
              try {
                await createAlert({
                  title,
                  description,
                  batchId: issue.batchid,
                  severity: issue.severity.toLowerCase(),
                  category: issue.type,
                  source: "retailer",
                });
                onClose();
              } finally {
                setLoading(false);
              }
            }}
          >
            <RotateCcw />
            {loading ? "Creating…" : "Create Recall"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
