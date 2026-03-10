import AddAccountForm from "@/components/forms/AddAccountForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AddFirstAccount = () => {
  return (
    <main className="w-full mx-auto flex flex-col justify-center">
      <Card className="mx-auto max-w-lg min-w-lg max-h-fit">
        <CardHeader>
          <CardTitle className="text-xl">
            {/* {accountToEdit ? "Update Account" : "Add Account"} */}
            Add Account
          </CardTitle>
          <CardDescription>
            {/* {accountToEdit
            ? "Enter the new details of the account"
            : "Enter the details of the new account"} */}
            Enter the details of your fresh account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddAccountForm isFirstAccount />
        </CardContent>
      </Card>
    </main>
  );
};

export default AddFirstAccount;
