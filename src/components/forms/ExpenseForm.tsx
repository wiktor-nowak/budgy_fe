import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type Category } from "@/api/categories";
import { type Account } from "@/api/accounts";
import { type ExpenseUpdateData } from "@/api/expenses";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
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
  FormMessage,
} from "@/components/ui/form";

const expenseSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  accountId: z.string().min(1, "Please select an account"),
  categoryId: z.string().min(1, "Please select a category"),
  description: z.string().optional(),
});

type ExpenseFormFields = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  expense?: ExpenseUpdateData;
  accounts: Account[];
  categories: Category[];
  onSave: (data: ExpenseFormFields) => void;
  onCancel: () => void;
}

const ExpenseForm = ({
  expense,
  accounts,
  categories,
  onSave,
  onCancel,
}: ExpenseFormProps) => {
  const form = useForm<ExpenseFormFields>({
    resolver: zodResolver(expenseSchema) as Resolver<ExpenseFormFields>,
    defaultValues: {
      amount: expense?.amount || 0,
      accountId: expense?.accountId || "",
      categoryId: expense?.categoryId || "",
      description: expense?.description || "",
    },
  });

  useEffect(() => {
    form.reset(expense);
  }, [expense, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="p-4 grid gap-3">
        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="accountId"
            render={({ field }) => (
              <FormItem>
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
                      <SelectItem key={account.id} value={String(account.id)}>
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
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    {...field}
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

export default ExpenseForm;
