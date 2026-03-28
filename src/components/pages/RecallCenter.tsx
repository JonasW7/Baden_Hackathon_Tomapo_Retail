import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RecallList, type Recall } from "@/components/organisms/RecallList";
import { RecallDetailSheet } from "@/components/molecules/RecallDetailSheet";

type RecallStatus = "Active" | "Monitoring" | "Resolved";

const recalls: Recall[] = [
  {
    id: "RCL-001",
    product: "Lindt Excellence 85%",
    batch: "LINDT-85-2026-0201",
    units: 5000,
    resolved: 0,
    status: "Active",
    severity: "High",
    title: "Rückruf: Lindt Excellence 85% — mögliche Fremdkörper",
    description:
      "Das Bundesamt für Lebensmittelsicherheit (BLV) hat Lindt & Sprüngli aufgefordert, die Charge LINDT-85-2026-0201 zurückzurufen. Bei Stichprobenkontrollen wurden in vereinzelten Tafeln Metallsplitter nachgewiesen, die beim Reinigungsprozess des Conchierers abgelöst wurden. Betroffen ist ausschliesslich die Charge 2026-0201 mit Mindesthaltbarkeitsdatum 01.2028.",
    date: "2026-03-12",
  },
  {
    id: "RCL-002",
    product: "Organic Apple Juice",
    batch: "APJ-2024-09",
    units: 850,
    resolved: 720,
    status: "Active",
    severity: "Critical",
    title: "Undisclosed allergen — APJ-2024-09",
    description:
      "Lab analysis confirmed traces of sulphites not declared on the label. Affects customers with sulphite sensitivity. Retailer shelves cleared on 2026-03-22.",
    date: "2026-03-22",
  },
  {
    id: "RCL-003",
    product: "Whole Grain Crackers",
    batch: "WGC-2024-07",
    units: 1200,
    resolved: 1200,
    status: "Resolved",
    severity: "Low",
    title: "Packaging seal defect — WGC-2024-07",
    description:
      "A faulty sealing run caused approximately 12% of units to have compromised packaging, increasing risk of contamination. All units have been retrieved and destroyed.",
    date: "2026-03-10",
  },
  {
    id: "RCL-004",
    product: "Fresh Spinach Bag",
    batch: "FSB-2024-10",
    units: 400,
    resolved: 280,
    status: "Monitoring",
    severity: "Medium",
    title: "Possible E. coli contamination — FSB-2024-10",
    description:
      "Two consumer reports linked to this batch. Precautionary recall issued while lab results are pending. Monitoring ongoing — no confirmed cases as of 2026-03-27.",
    date: "2026-03-25",
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
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedId = searchParams.get("recall");
  const selected = recalls.find((r) => r.id === selectedId) ?? null;

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

      <RecallList
        recalls={filtered}
        onRowClick={(r) => setSearchParams({ recall: r.id })}
      />

      <RecallDetailSheet
        recall={selected}
        onClose={() => setSearchParams({})}
      />
    </div>
  );
}
