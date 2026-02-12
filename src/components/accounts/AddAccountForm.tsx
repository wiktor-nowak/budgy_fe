import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ACCOUNT_TYPES } from "@/lib/constants";
import {
  createAccountSchema,
  type CreateAccountFormType,
} from "@/schemas/accounts";
import { Checkbox } from "../ui/checkbox";
import { useCreateAccount } from "@/lib/hooks/accounts";
import { toastErrorWithMessage } from "@/lib/errors/uiErrors";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AddAccountFormTypes {
  isFirstAccount: boolean;
}

export const AddAccountForm = ({ isFirstAccount }: AddAccountFormTypes) => {
  const navigate = useNavigate();
  const form = useForm<CreateAccountFormType>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      type: ACCOUNT_TYPES.BANK,
      balance: 0,
      description: "",
      setAsMain: isFirstAccount ? true : false,
    },
  });
  const { mutate } = useCreateAccount();

  // useEffect(() => {
  //   if (accountToEdit) {
  //     form.setValue("name", accountToEdit.name);
  //     form.setValue("type", accountToEdit.type);
  //     form.setValue("balance", accountToEdit.balance);
  //     form.setValue("description", accountToEdit.description);
  //     form.setValue("setAsMain", false);
  //   }
  // }, [accountToEdit, form]);

  const onSubmit = async (data: CreateAccountFormType) => {
    // try {
    //   const token = localStorage.getItem("token");
    //   if (accountToEdit) {
    //     await updateAccount(accountToEdit.id, data);
    //     setAccountToEdit(null);
    //     toast.success("Account updated successfully!");
    //   } else if (token) {
    //     await addAccount(token, data, isFirstAccount);
    //     toast.success("Account created successfully!");
    //     if (isFirstAccount) {
    //       navigate("/home");
    //     }
    //   }
    //   form.reset();
    // } catch (error) {
    //   toast.error("Operation failed");
    //   console.error(error);
    // } finally {
    //   refetchAccounts();
    // }
    mutate(data, {
      onSuccess: () => {
        toast.success("Account created successfully!");
        navigate("/login");
      },
      onError: (error) => {
        toastErrorWithMessage(error, "Unable to create account.");
      },
    });
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                // disabled={!!accountToEdit}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ACCOUNT_TYPES).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="setAsMain"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isFirstAccount}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {isFirstAccount
                    ? "It will be your first account"
                    : "Set as main account"}
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" variant="outline">
          {/* {accountToEdit ? "Update Account" : "Add Account"} */}
          Add Account
        </Button>
      </form>
    </Form>
  );
};

export default AddAccountForm;
