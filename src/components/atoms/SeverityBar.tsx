const severityBarColor: Record<string, string> = {
  Critical: "bg-destructive",
  High: "bg-severity-high-foreground",
  Medium: "bg-severity-medium-foreground",
  Low: "bg-severity-low-foreground",
};

export function SeverityBar({ label }: { label: string }) {
  return (
    <div className={`w-1 h-6 rounded-full ${severityBarColor[label] ?? "bg-muted-foreground"}`} />
  );
}
