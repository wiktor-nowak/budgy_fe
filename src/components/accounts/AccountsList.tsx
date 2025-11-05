import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { FilePenLine, Trash2 } from "lucide-react";
import { deleteAccount, getAccount, type Account } from "@/api/accounts";

interface AccountsListProps {
  accountToEdit: Account | null;
  setAccountToEdit: (account: Account | null) => void;
  accounts: Account[];
  refetchAccounts: () => void;
}

const AccountsList = ({
  setAccountToEdit,
  accounts,
  refetchAccounts,
}: AccountsListProps) => {
  const removeAccount = async (id: string) => {
    try {
      await deleteAccount(id);
      refetchAccounts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const account = await getAccount(id);
      setAccountToEdit(account);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Accounts</h2>
      {accounts.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead className="w-[100px]">Balance</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.name}>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.type}</TableCell>
                <TableCell>{account.balance}</TableCell>
                <TableCell>{account.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(String(account.id))}
                    >
                      <FilePenLine className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAccount(account.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No accounts.</p>
      )}
    </div>
  );
};

export default AccountsList;
