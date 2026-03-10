import EditTransactionForm from "@/components/forms/EditTransactionForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toastErrorWithMessage } from "@/lib/errors/uiErrors";
import {
  useDeleteTransaction,
  useTransactions,
  type Transaction,
} from "@/lib/hooks/transactions";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Fragment } from "react/jsx-runtime";
import { toast } from "sonner";

const Transactions = () => {
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const { data: transactions, isLoading, isError } = useTransactions();
  const { mutate } = useDeleteTransaction();

  const handleToggleEdit = (id: string) => {
    setOpenRowId(openRowId === id ? null : id);
  };
  const handleDelete = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        toast.success("Transaction deleted successfully!", {
          position: "bottom-center",
        });
      },
      onError: (error) => {
        toastErrorWithMessage(error, "Unable to delete transaction.");
      },
    });
  };

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
            <TableHead className="p-2 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {!isError && !isLoading && (
          <TableBody>
            {transactions.map((transaction: Transaction) => (
              <Fragment key={transaction.id}>
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
                  <TableCell className="p-2 flex justify-end gap-2">
                    <FiEdit
                      className="cursor-pointer"
                      onClick={() => handleToggleEdit(transaction.id)}
                    />
                    <FiTrash2
                      className="cursor-pointer"
                      onClick={() => handleDelete(transaction.id)}
                    />
                  </TableCell>
                </TableRow>
                {openRowId === transaction.id && (
                  <TableRow>
                    <TableCell colSpan={7} className="p-0">
                      <EditTransactionForm txId={transaction.id} />
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default Transactions;
