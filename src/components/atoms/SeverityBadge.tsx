const severityStyle: Record<string, string> = {
  Critical: "bg-destructive text-destructive-foreground",
  High: "bg-severity-high text-severity-high-foreground",
  Medium: "bg-severity-medium text-severity-medium-foreground",
  Low: "bg-severity-low text-severity-low-foreground",
};

export function SeverityBadge({ label }: { label: string }) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${severityStyle[label] ?? "bg-muted text-muted-foreground"}`}
    >
      {label}
    </span>
  );
}