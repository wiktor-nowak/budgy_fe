import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useState } from "react";
import type { ACCOUNT_TYPES_UNION } from "@/lib/types";

export interface Account {
  name: string;
  type: ACCOUNT_TYPES_UNION;
  description: string;
  balance: number;
}

const AccountsList = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const fetchAccounts = async () => {
    try {
      const response = await fetch("http://localhost:3003/api/accounts");

      if (!response.ok) {
        throw new Error("Response not okay!");
      }

      const accountsR = await response.json();
      setAccounts(() => {
        return accountsR.response.map(
          (category: {
            name: string;
            type: ACCOUNT_TYPES_UNION;
            balance: number;
            description: string;
          }) => {
            const { name, type, balance, description } = category;
            return {
              name,
              type,
              balance,
              description,
            };
          }
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Accounts</h2>
      <Button onClick={fetchAccounts}>REFRESH</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.name}>
              <TableCell>{account.name}</TableCell>
              <TableCell>{account.type}</TableCell>
              <TableCell>{account.balance}</TableCell>
              <TableCell>{account.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountsList;
