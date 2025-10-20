import { Fragment, useEffect, useState } from "react";
import { getExpenses, updateExpense, type ExpenseData, type ExpenseUpdateData } from "@/api/expenses";
import { getCategories, type Category } from "@/api/categories";
import { getMyAccounts, type Account } from "@/api/accounts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FiCreditCard,
  FiDollarSign,
  FiCheck,
  FiX,
  FiEdit,
} from "react-icons/fi";
import ExpenseForm from "@/components/forms/ExpenseForm";

const Transactions = () => {
  const [transactions, setTransactions] = useState<ExpenseData[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [expenseData, accountsData, categoriesData] = await Promise.all([
        getExpenses(),
        getMyAccounts(),
        getCategories(),
      ]);
      setTransactions(expenseData);
      setAccounts(accountsData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to fetch transaction data.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleEdit = (id: string) => {
    setOpenRowId(openRowId === id ? null : id);
  };

  const handleUpdateExpense = async (data: ExpenseUpdateData) => {
    if (!openRowId) return;
    try {
      await updateExpense(openRowId, data);
      setOpenRowId(null);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Failed to update expense", error);
      setError("Failed to update expense.");
    }
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

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
            <TableHead className="p-2 text-right pr-4">Amount</TableHead>
            <TableHead className="p-2 text-center">Method</TableHead>
            <TableHead className="p-2 text-center">Shared</TableHead>
            <TableHead className="p-2">Details</TableHead>
            <TableHead className="p-2"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <Fragment key={transaction.id}>
              <TableRow
                className={`border-b border-bg dark:border-dark-bg ${
                  openRowId === transaction.id ? "text-gray-400 dark:text-gray-500" : ""
                }`}
              >
                <TableCell className="p-2">
                  {new Date(transaction.createdAt).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className="p-2">
                  {transaction.category.name}
                </TableCell>
                <TableCell className="p-2 text-right pr-4 text-warning">
                  -{Math.abs(transaction.amount).toFixed(2)} PLN
                </TableCell>
                <TableCell className="p-2 text-center">
                  {transaction.account.type === "CASH" ? (
                    <FiDollarSign className="mx-auto" />
                  ) : (
                    <FiCreditCard className="mx-auto" />
                  )}
                </TableCell>
                <TableCell className="p-2 text-center">
                  {transaction.shared ? (
                    <FiCheck className="mx-auto" />
                  ) : (
                    <FiX className="mx-auto" />
                  )}
                </TableCell>
                <TableCell className="p-2">
                  {transaction.description?.substring(0, 50) || ""}
                  {transaction.description && transaction.description.length > 50 && "..."}
                </TableCell>
                <TableCell className="p-2 text-right">
                  <FiEdit
                    className="cursor-pointer"
                    onClick={() => handleToggleEdit(transaction.id)}
                  />
                </TableCell>
              </TableRow>
              {openRowId === transaction.id && (
                <TableRow>
                  <TableCell colSpan={7} className="p-0">
                    <div>
                      <ExpenseForm
                        expense={transaction}
                        accounts={accounts}
                        categories={categories}
                        onSave={handleUpdateExpense}
                        onCancel={() => setOpenRowId(null)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transactions;
