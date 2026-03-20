import type { MonthlySummary } from "@/lib/types/summary";
import MonthlyChart from "./MonthlyChart";
import MonthlyTable from "./MonthlyTable";

const MonthlyDetails = ({ summary }: { summary: MonthlySummary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MonthlyTable categories={summary.categorySummaries} />
      <MonthlyChart categories={summary.categorySummaries} />
    </div>
  );
};

export default MonthlyDetails;
