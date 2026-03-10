import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
// import { useTransactions } from "@/lib/hooks/transactions";
import { Bar, XAxis, YAxis, BarChart } from "recharts";

const chartConfig = {
  desktop: {
    label: "Balance",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const Charts = () => {
  // const { data: transactions, isLoading, isError } = useTransactions();

  return (
    <div className="bg-bg-light dark:bg-dark-card p-4 rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle>Transactions summary</CardTitle>
          <CardDescription>Total cash flow per category</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer={true}
              data={chartData}
              layout="vertical"
              margin={{
                left: -20,
              }}
            >
              <XAxis type="number" dataKey="desktop" hide />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Shows data based on summaries of each month and its balance.
          </div>
          <div className="leading-none text-muted-foreground">
            Visit monthly spending page to see more details.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Charts;
