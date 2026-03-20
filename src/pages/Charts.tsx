import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useTransactions } from "@/lib/hooks/transactions";
import {
  useAccountBalances,
  useAccountsMonthlyCashflow,
  useAccountsMonthlyClosingBalances,
  useLatestMainAccountCategoryBreakdown,
} from "@/lib/hooks/summary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

const SERIES_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const Charts = () => {
  const { data: categoryBreakdown } = useLatestMainAccountCategoryBreakdown();
  const { data: accountBalances = [] } = useAccountBalances();
  const { data: cashflow = [] } = useAccountsMonthlyCashflow();
  const { data: closingBalances = [] } = useAccountsMonthlyClosingBalances();
  const { data: transactions = [] } = useTransactions();

  const recentTransactions = transactions.slice(0, 5);
  const donutData = (categoryBreakdown?.categories ?? []).map((category) => ({
    name: category.categoryName,
    value: Number(category.totalSpent.toFixed(2)),
  }));
  const balancesChartConfig = {
    balance: {
      label: "Balance",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const cashflowByAccount = cashflow.reduce<Record<string, typeof cashflow>>(
    (groups, entry) => {
      groups[entry.accountId] = groups[entry.accountId]
        ? [...groups[entry.accountId], entry]
        : [entry];
      return groups;
    },
    {},
  );

  const cashflowTabs = Object.entries(cashflowByAccount).map(([accountId, entries]) => ({
    accountId,
    accountName: entries[0]?.accountName ?? "Account",
    entries: entries.sort((left, right) => left.label.localeCompare(right.label)),
  }));

  const closingBalanceAccounts = Array.from(
    new Map(
      closingBalances.map((entry) => [
        entry.accountId,
        { accountId: entry.accountId, accountName: entry.accountName },
      ]),
    ).values(),
  );
  const closingBalanceConfig = closingBalanceAccounts.reduce<ChartConfig>(
    (config, account, index) => {
      config[account.accountId] = {
        label: account.accountName,
        color: SERIES_COLORS[index % SERIES_COLORS.length],
      };
      return config;
    },
    {},
  );
  const closingBalanceData = Array.from(
    new Set(closingBalances.map((entry) => entry.label)),
  )
    .sort((left, right) => left.localeCompare(right))
    .map((label) => {
      const matchingRows = closingBalances.filter((entry) => entry.label === label);
      return matchingRows.reduce<Record<string, number | string>>(
        (row, entry) => {
          row.month = label;
          row[entry.accountId] = entry.closingBalance;
          return row;
        },
        { month: label },
      );
    });

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Main Account Spending Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              spent: {
                label: "Spent",
                color: "var(--chart-1)",
              },
            }}
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie data={donutData} dataKey="value" nameKey="name" innerRadius={70}>
                {donutData.map((entry, index) => (
                  <Cell
                    key={`${entry.name}-${index}`}
                    fill={SERIES_COLORS[index % SERIES_COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={balancesChartConfig}>
            <BarChart accessibilityLayer data={accountBalances}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="accountName"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="balance" fill="var(--color-balance)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Income And Spending Per Account</CardTitle>
        </CardHeader>
        <CardContent>
          {cashflowTabs.length > 0 ? (
            <Tabs defaultValue={cashflowTabs[0].accountId}>
              <TabsList className="mb-4 flex h-auto flex-wrap justify-start gap-2">
                {cashflowTabs.map((tab) => (
                  <TabsTrigger key={tab.accountId} value={tab.accountId}>
                    {tab.accountName}
                  </TabsTrigger>
                ))}
              </TabsList>
              {cashflowTabs.map((tab) => (
                <TabsContent key={tab.accountId} value={tab.accountId}>
                  <ChartContainer
                    config={{
                      totalIncome: {
                        label: "Income",
                        color: "var(--chart-2)",
                      },
                      totalSpent: {
                        label: "Spent",
                        color: "var(--chart-5)",
                      },
                    }}
                  >
                    <BarChart accessibilityLayer data={tab.entries}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="label"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                      />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar
                        dataKey="totalIncome"
                        fill="var(--color-totalIncome)"
                        radius={[6, 6, 0, 0]}
                      />
                      <Bar
                        dataKey="totalSpent"
                        fill="var(--color-totalSpent)"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <p className="text-sm text-muted-foreground">No cashflow summary data yet.</p>
          )}
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Closing Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={closingBalanceConfig}>
            <LineChart accessibilityLayer data={closingBalanceData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              {closingBalanceAccounts.map((account) => (
                <Line
                  key={account.accountId}
                  type="monotone"
                  dataKey={account.accountId}
                  stroke={`var(--color-${account.accountId})`}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Last 5 Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-md border px-3 py-2"
                >
                  <div>
                    <div className="font-medium">{transaction.category}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.accountName} ·{" "}
                      {new Date(transaction.transactionDate).toLocaleDateString("en-GB")}
                    </div>
                  </div>
                  <div
                    className={
                      Number(transaction.amount) < 0
                        ? "font-semibold text-rose-600"
                        : "font-semibold text-emerald-600"
                    }
                  >
                    {Number(transaction.amount).toFixed(2)} PLN
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No transactions available yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Charts;
