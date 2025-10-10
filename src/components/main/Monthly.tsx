import { monthlyData } from "../../data/monthlyData";
import MonthlyChart from "./MonthlyChart";
import MonthlyTable from "./MonthlyTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Monthly = () => {
  return (
    <div className="bg-bg-light dark:bg-dark-card p-4 rounded-lg h-full">
      <h2 className="text-text-primary dark:text-dark-text-primary text-lg font-semibold">
        Monthly Spendings
      </h2>
      <Tabs defaultValue={monthlyData[0].month} className="mt-4">
        <TabsList>
          {monthlyData.map((data, index) => (
            <TabsTrigger key={index} value={data.month}>
              {data.month}
            </TabsTrigger>
          ))}
        </TabsList>
        {monthlyData.map((data, index) => (
          <TabsContent key={index} value={data.month}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MonthlyTable categories={data.categories} />
              <MonthlyChart categories={data.categories} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Monthly;
