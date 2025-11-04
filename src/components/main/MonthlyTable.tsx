import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SummaryItem {
  categoryName: string;
  totalSpent: number;
}

interface MonthlyTableProps {
  categories: SummaryItem[];
}

const PLANNED_BUDGET = 1000;

const MonthlyTable = ({ categories }: MonthlyTableProps) => {
  return (
    <Table className="text-sm text-left text-text-secondary dark:text-dark-text-secondary">
      <TableHeader>
        <TableRow className="border-b-2 border-gray-300">
          <TableHead className="p-2 font-bold">Category</TableHead>
          <TableHead className="p-2 text-right">Planned</TableHead>
          <TableHead className="p-2 text-right">Spent</TableHead>
          <TableHead className="p-2 text-right">Spent vs. Planned (%)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, index) => {
          const spent = Number(category.totalSpent);
          const percent = (spent * 100) / PLANNED_BUDGET;
          return (
            <TableRow key={index} className="border-b border-bg dark:border-dark-bg">
              <TableCell className="p-2 font-bold">{category.categoryName}</TableCell>
              <TableCell className="p-2 text-right">
                {PLANNED_BUDGET.toFixed(2)} PLN
              </TableCell>
              <TableCell className={`p-2 text-right text-dark`}>
                {spent.toFixed(2)} PLN
              </TableCell>
              <TableCell
                className={`p-2 text-right ${percent > 100 ? "text-warning" : ""}`}>
                {percent.toFixed(2)} %
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default MonthlyTable;