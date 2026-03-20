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
  isFirstAccount?: boolean;
}

export const AddAccountForm = ({
  isFirstAccount = false,
}: AddAccountFormTypes) => {
  const navigate = useNavigate();
  const form = useForm<CreateAccountFormType>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      type: ACCOUNT_TYPES.BANK,
      description: "",
      setAsMain: isFirstAccount ? true : false,
    },
  });
  const { mutate } = useCreateAccount();
  const availableAccountTypes = isFirstAccount
    ? [ACCOUNT_TYPES.BANK, ACCOUNT_TYPES.CASH]
    : Object.values(ACCOUNT_TYPES);

  const onSubmit = async (data: CreateAccountFormType) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Account created successfully!");
        navigate(isFirstAccount ? "/" : "/login");
      },
      onError: (error) => {
        toastErrorWithMessage(error, "Unable to create account.");
      },
    });
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
                  {availableAccountTypes.map((type) => (
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
