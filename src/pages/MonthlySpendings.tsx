import { useEffect, useState } from "react";
import { getExpenseMonths } from "../api/expenses";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import MonthlyDetails from "../components/main/MonthlyDetails";

const monthNames: { [key: number]: string } = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const MonthlySpendings = () => {
  const [months, setMonths] = useState<{ year: number; month: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const data = await getExpenseMonths();
        setMonths(data);
      } catch (error) {
        console.error("Failed to fetch expense months", error);
      }
      setIsLoading(false);
    };

    fetchMonths();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-bg-light dark:bg-dark-card p-4 rounded-lg h-full">
      <h2 className="text-text-primary dark:text-dark-text-primary text-lg font-semibold">
        Monthly Spendings
      </h2>
      {months.length > 0 ? (
        <Tabs
          defaultValue={`${months[0].year}-${months[0].month}`}
          className="mt-4"
        >
          <TabsList>
            {months.map((m) => (
              <TabsTrigger
                key={`${m.year}-${m.month}`}
                value={`${m.year}-${m.month}`}
              >
                {monthNames[m.month]} {String(m.year).slice(-2)}
              </TabsTrigger>
            ))}
          </TabsList>
          {months.map((m) => (
            <TabsContent
              key={`${m.year}-${m.month}-content`}
              value={`${m.year}-${m.month}`}
            >
              <MonthlyDetails year={m.year} month={m.month} />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <p className="mt-4 text-text-secondary dark:text-dark-text-secondary">
          No spending data available to display.
        </p>
      )}
    </div>
  );
};

export default MonthlySpendings;
