import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { SummaryCategory } from "@/lib/types/summary";

interface MonthlyChartProps {
  categories: SummaryCategory[];
}

const MonthlyChart = ({ categories }: MonthlyChartProps) => {
  const data = categories
    .filter((category) => category.totalSpent > 0)
    .map((category) => ({
      categoryName: category.categoryName,
      totalSpent: Number(category.totalSpent.toFixed(2)),
    }));

  const chartConfig = {
    totalSpent: {
      label: "Spent",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[320px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 16,
          right: 12,
          left: 12,
          bottom: 24,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="categoryName"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          angle={-24}
          textAnchor="end"
          height={72}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="totalSpent"
          fill="var(--color-totalSpent)"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default MonthlyChart;
