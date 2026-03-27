import { useState } from "react";
import { RecallList, type Recall } from "@/components/organisms/RecallList";

type RecallStatus = "Active" | "Monitoring" | "Resolved";

const recalls: Recall[] = [
  {
    product: "Chocolate Hazelnut Spread",
    batch: "CHO-2024-11",
    units: 2000,
    notified: 1450,
    status: "Active",
  },
  {
    product: "Organic Apple Juice",
    batch: "APJ-2024-09",
    units: 850,
    notified: 720,
    status: "Active",
  },
  {
    product: "Whole Grain Crackers",
    batch: "WGC-2024-07",
    units: 1200,
    notified: 1200,
    status: "Resolved",
  },
  {
    product: "Fresh Spinach Bag",
    batch: "FSB-2024-10",
    units: 400,
    notified: 280,
    status: "Monitoring",
  },
];

const filters: (RecallStatus | "All")[] = [
  "All",
  "Active",
  "Monitoring",
  "Resolved",
];

export default function RecallCenter() {
  const [activeFilter, setActiveFilter] = useState<RecallStatus | "All">("All");

  const filtered =
    activeFilter === "All"
      ? recalls
      : recalls.filter((r) => r.status === activeFilter);

  return (
    <div className="space-y-8">
      {/* Status Filter */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer border ${
              activeFilter === f
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <RecallList recalls={filtered} />
    </div>
  );
}
