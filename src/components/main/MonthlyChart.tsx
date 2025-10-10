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

interface Category {
  name: string;
  planned: number;
  spent: number;
}

interface MonthlyChartProps {
  categories: Category[];
}

const MonthlyChart = ({ categories }: MonthlyChartProps) => {
  const data = categories.map((category) => ({
    name: category.name,
    Amount: category.spent,
    Percent: (category.spent * 100) / category.planned,
  }));

  return (
    <div className="">
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
