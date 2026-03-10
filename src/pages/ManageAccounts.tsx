// import AddAccountForm from "../components/accounts/AddAccountForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash2 } from "lucide-react";
import { useAccounts } from "@/lib/hooks/accounts";
import type { AccountType } from "@/schemas/accounts";
import AddAccountForm from "@/components/forms/AddAccountForm";

const ManageAccounts = () => {
  const { data: accounts, isLoading } = useAccounts();
  function handleEdit() {}
  function removeAccount() {}

  return (
    <>
      <AddAccountForm />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Accounts</h2>
        {!isLoading ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[100px]">Balance</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isLoading &&
                accounts &&
                accounts.map((account: AccountType) => (
                  <TableRow key={account.name}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell>{account.type}</TableCell>
                    <TableCell>
                      {Number(account.balance).toFixed(2) + " PLN"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit()}
                        >
                          <FilePenLine className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAccount()}
                          disabled={false}
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
    </>
  );
};

export default ManageAccounts;
