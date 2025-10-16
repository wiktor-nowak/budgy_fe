import AddAccountForm from "../components/accounts/AddAccountForm";
import AccountsList from "../components/accounts/AccountsList";
import { useState } from "react";
import { type Account } from "@/api/accounts";

const ManageAccounts = () => {
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);

  return (
    <div>
      <AddAccountForm
        accountToEdit={accountToEdit}
        setAccountToEdit={setAccountToEdit}
      />
      <AccountsList
        setAccountToEdit={setAccountToEdit}
        accountToEdit={accountToEdit}
      />
    </div>
  );
};

export default ManageAccounts;
