// import AddAccountForm from "../components/accounts/AddAccountForm";
// import AccountsList from "../components/accounts/AccountsList";
// import { useEffect, useState } from "react";
// import { type Account, getMyAccounts } from "@/lib/api/accounts";

const ManageAccounts = () => {
  // const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);
  // const [accounts, setAccounts] = useState<Account[]>([]);

  // const fetchAccounts = async () => {
  //   const myAccounts = await getMyAccounts();
  //   setAccounts(myAccounts);
  // };

  // useEffect(() => {
  //   fetchAccounts();
  // }, []);

  return (
    <div>
      {/* <AddAccountForm
        accountToEdit={accountToEdit}
        setAccountToEdit={setAccountToEdit}
        isFirstAccount={accounts.length === 0}
        refetchAccounts={fetchAccounts}
      />
      <AccountsList
        setAccountToEdit={setAccountToEdit}
        accountToEdit={accountToEdit}
        accounts={accounts}
        refetchAccounts={fetchAccounts}
      /> */}
    </div>
  );
};

export default ManageAccounts;
