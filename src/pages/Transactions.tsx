import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactions, type Transaction } from "@/lib/hooks/transactions";
import { FiEdit } from "react-icons/fi";

const Transactions = () => {
  // const [openRowId, setOpenRowId] = useState<string | null>(null);
  const { data: transactions, isLoading, isError } = useTransactions();

  return (
    <div className="bg-bg-light dark:bg-dark-card p-4 rounded-lg">
      <h2 className="text-text-primary dark:text-dark-text-primary text-lg font-semibold">
        My Transactions
      </h2>
      <Table className="w-full mt-4 text-sm text-left text-text-secondary dark:text-dark-text-secondary">
        <TableHeader>
          <TableRow className="border-b-2 border-gray-300">
            <TableHead className="p-2">Date</TableHead>
            <TableHead className="p-2">Category</TableHead>
            <TableHead className="p-2 text-right pr-4">Value</TableHead>
            <TableHead className="p-2 text-center">Account</TableHead>
            <TableHead className="p-2">Details</TableHead>
            <TableHead className="p-2"></TableHead>
          </TableRow>
        </TableHeader>
        {!isError && !isLoading && (
          <TableBody>
            {transactions.map((transaction: Transaction) => (
              // <Fragment key={transaction.id}>
              <TableRow
                className={`border-b border-bg dark:border-dark-bg`}
                key={transaction.id}
              >
                <TableCell className="p-2">
                  {new Date(transaction.transactionDate).toLocaleDateString(
                    "en-GB",
                  )}
                </TableCell>
                <TableCell className="p-2">{transaction.category}</TableCell>
                <TableCell className="p-2 text-right pr-4">
                  {transaction.amount} PLN
                </TableCell>
                <TableCell className="p-2 text-center">
                  {transaction.accountName}
                </TableCell>
                <TableCell className="p-2">
                  {transaction.description?.substring(0, 24) || ""}
                  {transaction.description &&
                    transaction.description.length > 24 &&
                    "..."}
                </TableCell>
                <TableCell className="p-2 text-right">
                  <FiEdit
                    className="cursor-not-allowed stroke-gray-600"
                    onClick={() => {}}
                    // onClick={() => handleToggleEdit(transaction.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default Transactions;
