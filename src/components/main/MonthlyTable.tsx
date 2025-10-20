interface Category {
  name: string;
  planned: number;
  spent: number;
}

interface MonthlyTableProps {
  categories: Category[];
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Category {
  name: string;
  planned: number;
  spent: number;
}

interface MonthlyTableProps {
  categories: Category[];
}

const MonthlyTable = ({ categories }: MonthlyTableProps) => {
  return (
    <Table className="text-sm text-left text-text-secondary dark:text-dark-text-secondary">
      <TableHeader>
        <TableRow className="border-b-2 border-gray-300">
          <TableHead className="p-2 font-bold">Category</TableHead>
          <TableHead className="p-2 text-right">Planned</TableHead>
          <TableHead className="p-2 text-right">Spent</TableHead>
          <TableHead className="p-2 text-right">Percent</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, index) => {
          const percent = (category.spent * 100) / category.planned;
          return (
            <TableRow key={index} className="border-b border-bg dark:border-dark-bg">
              <TableCell className="p-2 font-bold">{category.name}</TableCell>
              <TableCell className="p-2 text-right">
                {category.planned.toFixed(2)} PLN
              </TableCell>
              <TableCell className={`p-2 text-right text-dark`}>
                {category.spent.toFixed(2)} PLN
              </TableCell>
              <TableCell
                className={`p-2 text-right ${
                  percent > 100 ? "text-warning" : ""
                }`}
              >
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
