import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "../shadcn/sheet";
import { Button } from "../shadcn/button";
import { SeverityBadge } from "../atoms/SeverityBadge";
import { RotateCcw } from "lucide-react";
import { CreateRecallSheet } from "./CreateRecallSheet";
import { Separator } from "../shadcn/separator";

export type IssueProd = {
  batchid: string;
  company: string;
  type: string;
  severity: string;
  date: string;
  title: string;
  description: string;
};

export type IssueUser = {
  batchid: string;
  type: string;
  severity: string;
  date: string;
  title: string;
  description: string;
};

type AnyIssue = IssueProd | IssueUser;

type Props = {
  issue: AnyIssue | null;
  onClose: () => void;
  tag?: string;
};

function isIssue(i: AnyIssue): i is IssueProd {
  return "company" in i;
}

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

export function IssueDetailSheet({ issue, onClose, tag }: Props) {
  const [recallOpen, setRecallOpen] = useState(false);

  return (
    <>
      <Sheet open={issue !== null} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="right" className="w-120 sm:max-w-120 flex flex-col">
          <SheetHeader className="pb-2">
            <div className="flex items-center gap-3">
              <SheetTitle className="font-mono text-base">
                Issue of {issue?.batchid}
              </SheetTitle>
            </div>
            <SheetDescription className="text-muted-foreground">
              {tag && (
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                  {tag}
                </span>
              )}
            </SheetDescription>
          </SheetHeader>

          <Separator />

          {issue && (
            <div className="flex flex-col gap-5 px-4 py-4 flex-1 overflow-y-auto">
              <DetailRow
                label="Severity"
                value={<SeverityBadge label={issue.severity} />}
              />
              <DetailRow label="Date" value={issue.date} />
              <DetailRow label="Issue Type" value={issue.type} />
              {isIssue(issue) && issue.company && (
                <DetailRow label="Company" value={issue.company} />
              )}
              {issue.title && <DetailRow label="Title" value={issue.title} />}
              {issue.description && (
                <DetailRow label="Description" value={issue.description} />
              )}
            </div>
          )}

          <SheetFooter className="flex flex-row gap-2 px-4 pb-6">
            <Button
              variant="secondary"
              className="flex-1 cursor-pointer"
              onClick={() => setRecallOpen(true)}
            >
              <RotateCcw />
              Create Recall
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {issue && (
        <CreateRecallSheet
          issue={issue}
          open={recallOpen}
          onClose={() => setRecallOpen(false)}
          tag={tag}
        />
      )}
    </>
  );
}
