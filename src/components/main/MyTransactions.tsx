import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiCreditCard, FiDollarSign, FiCheck, FiX, FiChevronDown } from "react-icons/fi";

const MyTransactions = () => {
  const transactions = [
    {
      date: new Date("2024-05-01"),
      category: "Food",
      amount: -50.0,
      method: "card",
      splitted: true,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      date: new Date("2024-05-02"),
      category: "Salary",
      amount: 5000.0,
      method: "cash",
      splitted: false,
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      date: new Date("2024-05-03"),
      category: "Car",
      amount: -200.0,
      method: "card",
      splitted: true,
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      date: new Date("2024-05-04"),
      category: "Home",
      amount: -1000.0,
      method: "cash",
      splitted: false,
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      date: new Date("2024-05-05"),
      category: "Bonus",
      amount: 1000.0,
      method: "card",
      splitted: false,
      description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    },
  ];

  const handleIconClick = (method: string) => {
    console.log(`Clicked on ${method} icon`);
  };

  const handleDateClick = (date: Date) => {
    console.log(`Clicked on date: ${date}`);
  };

  const handleCategoryClick = (category: string) => {
    console.log(`Clicked on category: ${category}`);
  };

  const handleRowClick = (index: number) => {
    console.log(`Clicked on row ${index}`);
  };

  return (
    <div className="bg-bg-light dark:bg-dark-card p-4 rounded-lg">
      <h2 className="text-text-primary dark:text-dark-text-primary text-lg font-semibold">
        My Transactions
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center">Method</TableHead>
            <TableHead className="text-center">Splitted</TableHead>
            <TableHead>Details</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell><span className="cursor-pointer" onClick={() => handleDateClick(transaction.date)}>{transaction.date.toLocaleDateString("en-GB")}</span></TableCell>
              <TableCell><span className="cursor-pointer" onClick={() => handleCategoryClick(transaction.category)}>{transaction.category.substring(0, 30)}</span></TableCell>
              <TableCell className={`text-right ${transaction.amount > 0 ? "text-success" : "text-warning"}`}>
                {transaction.amount.toFixed(2)} PLN
              </TableCell>
              <TableCell className="text-center">
                <span className="cursor-pointer" onClick={() => handleIconClick(transaction.method)}>
                  {transaction.method === "card" ? <FiCreditCard className="mx-auto" /> : <FiDollarSign className="mx-auto" />}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className="cursor-pointer" onClick={() => handleIconClick(transaction.splitted ? "splitted" : "not splitted")}>
                  {transaction.splitted ? <FiCheck className="mx-auto" /> : <FiX className="mx-auto" />}
                </span>
              </TableCell>
              <TableCell>{transaction.description.substring(0, 50)}{transaction.description.length > 50 && "..."}</TableCell>
              <TableCell className="text-right">
                <FiChevronDown className="cursor-pointer" onClick={() => handleRowClick(index)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyTransactions;
