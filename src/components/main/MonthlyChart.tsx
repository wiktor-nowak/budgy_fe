import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface SummaryItem {
  categoryName: string;
  totalSpent: number;
}

interface MonthlyChartProps {
  categories: SummaryItem[];
}

const PLANNED_BUDGET = 1000;

const MonthlyChart = ({ categories }: MonthlyChartProps) => {
  const data = categories.map((category) => ({
    name: category.categoryName,
    Amount: Number(category.totalSpent),
    Percent: (Number(category.totalSpent) * 100) / PLANNED_BUDGET,
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 100,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-90} textAnchor="end" interval={0} />
          <YAxis yAxisId="left" orientation="left" stroke="#000000"></YAxis>
          <YAxis yAxisId="right" orientation="right" stroke="#000000"></YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <ReferenceLine yAxisId="left" y={0} stroke="#000" />
          <Bar
            yAxisId="left"
            dataKey="Amount"
            fill="var(--color-forestgreen)"
          />
          <Bar
            yAxisId="right"
            dataKey="Percent"
            fill="var(--color-grassgreen)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;