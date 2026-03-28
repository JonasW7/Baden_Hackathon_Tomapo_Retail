export type Alert = {
  _id: { $oid: string };
  barcode: string;
  batchId: string;
  source: "official" | "user";
  category: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  actionRequired: string;
  authorId: string;
  status: "active" | "resolved" | "expired";
  createdAt: { $date: string };
  updatedAt: { $date: string };
};
