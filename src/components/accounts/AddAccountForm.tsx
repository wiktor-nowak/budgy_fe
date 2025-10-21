import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useEffect } from "react";
import { type Account, updateAccount } from "@/api/accounts";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(ACCOUNT_TYPES),
  balance: z.coerce
    .number()
    .nonnegative()
    .default(0)
    .transform((val) => +val.toFixed(2)),
  description: z.string(),
});

type FormFields = z.infer<typeof schema>;

interface AddAccountFormProps {
  accountToEdit: Account | null;
  setAccountToEdit: (account: Account | null) => void;
}

const AddAccountForm = ({
  accountToEdit,
  setAccountToEdit,
}: AddAccountFormProps) => {
  const form = useForm<FormFields>({
    resolver: zodResolver(schema) as Resolver<FormFields>,
    defaultValues: {
      name: "",
      type: "BANK",
      balance: 0,
      description: "",
    },
  });

  useEffect(() => {
    if (accountToEdit) {
      form.setValue("name", accountToEdit.name);
      form.setValue("type", accountToEdit.type);
      form.setValue("balance", accountToEdit.balance);
      form.setValue("description", accountToEdit.description);
    }
  }, [accountToEdit, form]);

  const onSubmit = async (data: FormFields) => {
    try {
      const token = localStorage.getItem("token");
      if (accountToEdit) {
        await updateAccount(accountToEdit.id, data);
        setAccountToEdit(null);
        toast.success("Account updated successfully!");
      } else {
        const response = await fetch("http://localhost:3003/api/accounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Response not okay!: " + response.status);
        }

        toast.success("Account added successfully!");
      }
      form.reset();
    } catch (error) {
      toast.error("Operation failed");
      console.error(error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          {accountToEdit ? "Update Account" : "Add Account"}
        </CardTitle>
        <CardDescription>
          {accountToEdit
            ? "Enter the new details of the account"
            : "Enter the details of the new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                    disabled={!!accountToEdit}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ACCOUNT_TYPES.map((type) => (
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
                    <Input type="number" step="0.01" {...field} />
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
            <Button type="submit" className="w-full">
              {accountToEdit ? "Update Account" : "Add Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddAccountForm;
