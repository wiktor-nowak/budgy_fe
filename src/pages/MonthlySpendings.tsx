import MonthlyDetails from "@/components/main/MonthlyDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMonthlySummaries } from "@/lib/hooks/summary";

const monthLabel = (year: number, month: number) =>
  new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

const MonthlySpendings = () => {
  const { data: summaries = [], isLoading, isError } = useMonthlySummaries();

  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="text-lg font-semibold">Monthly Spendings</h2>
      {isLoading ? <p className="mt-4 text-sm text-muted-foreground">Loading summaries...</p> : null}
      {isError ? (
        <p className="mt-4 text-sm text-destructive">
          Unable to load monthly summaries.
        </p>
      ) : null}
      {!isLoading && !isError && summaries.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No summary data available yet.
        </p>
      ) : null}
      {!isLoading && !isError && summaries.length > 0 ? (
        <Tabs defaultValue={summaries[0].id} className="mt-4">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2">
            {summaries.map((summary) => (
              <TabsTrigger key={summary.id} value={summary.id}>
                {summary.accountName} · {monthLabel(summary.year, summary.month)}
              </TabsTrigger>
            ))}
          </TabsList>
          {summaries.map((summary) => (
            <TabsContent key={summary.id} value={summary.id} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Opening</div>
                  <div className="text-lg font-semibold">
                    {summary.openingBalance.toFixed(2)} PLN
                  </div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Income</div>
                  <div className="text-lg font-semibold text-emerald-600">
                    {summary.totalIncome.toFixed(2)} PLN
                  </div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Spent</div>
                  <div className="text-lg font-semibold text-rose-600">
                    {summary.totalSpent.toFixed(2)} PLN
                  </div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Closing</div>
                  <div className="text-lg font-semibold">
                    {summary.closingBalance.toFixed(2)} PLN
                  </div>
                </div>
              </div>
              <MonthlyDetails summary={summary} />
            </TabsContent>
          ))}
        </Tabs>
      ) : null}
    </div>
  );
};

export default MonthlySpendings;
