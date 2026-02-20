import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createTransactionSchema,
  type CreateTransactionFormType,
} from "@/schemas/transactions";
import { useAccountsWithCategories } from "@/lib/hooks/accounts";

// interface TransactionFormTypes {
//   expense?: ExpenseUpdateData;
//   categories: Category[];
//   onSave: (data: ExpenseFormFields) => void;
//   onCancel: () => void;
// }

// accountId: z.string(),
// categoryId: z.string(),
// amount: z.coerce
//   .number("Please enter a number")
//   .refine((n) => n !== 0, "Amount cannot be zero"),
// description: z.string(),
// transactionDate: z.date(),

const TransactionForm = () => {
  const form = useForm<CreateTransactionFormType>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      accountId: "",
      categoryId: "",
      amount: 0,
      description: "",
      transactionDate: new Date(),
    },
  });
  const { data: accounts = [] } = useAccountsWithCategories();

  // derived part
  const selectedAccountId = form.watch("accountId");
  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);
  const categories = selectedAccount?.categories ?? [];

  // useEffect(() => {
  //   form.reset(expense);
  // }, [expense, form]);

  const onSubmit = async () => {};
  const onCancel = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="accountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
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
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
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
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    value={field.value as number}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;
