import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SummaryCategory } from "@/lib/types/summary";

interface MonthlyTableProps {
  categories: SummaryCategory[];
}

const MonthlyTable = ({ categories }: MonthlyTableProps) => {
  const spendingCategories = categories.filter((category) => category.totalSpent > 0);
  const totalSpent = spendingCategories.reduce(
    (sum, category) => sum + category.totalSpent,
    0,
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="p-2 font-bold">Category</TableHead>
          <TableHead className="p-2 text-right">Spent</TableHead>
          <TableHead className="p-2 text-right">Share</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {spendingCategories.map((category) => {
          const share = totalSpent > 0 ? (category.totalSpent / totalSpent) * 100 : 0;
          return (
            <TableRow key={category.categoryId}>
              <TableCell className="p-2 font-bold">
                {category.categoryName}
              </TableCell>
              <TableCell className="p-2 text-right">
                {category.totalSpent.toFixed(2)} PLN
              </TableCell>
              <TableCell className="p-2 text-right">
                {share.toFixed(1)}%
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default MonthlyTable;
