import { useEffect, useState } from "react";
import { getMonthlySummary } from "../../lib/api/expenses";
import MonthlyTable from "./MonthlyTable";
import MonthlyChart from "./MonthlyChart";

interface MonthlyDetailsProps {
  year: number;
  month: number;
}

const MonthlyDetails = ({ year, month }: MonthlyDetailsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [summary, setSummary] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const data = await getMonthlySummary(year, month);
        setSummary(data);
      } catch (error) {
        console.error("Failed to fetch monthly summary", error);
      }
      setIsLoading(false);
    };

    fetchSummary();
  }, [year, month]);

  if (isLoading) {
    return <div>Loading monthly details...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MonthlyTable categories={summary} />
      <MonthlyChart categories={summary} />
    </div>
  );
};

export default MonthlyDetails;
