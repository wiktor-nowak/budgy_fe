import { useForm, type Resolver, Controller } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormFields>({
    resolver: zodResolver(expenseSchema) as Resolver<ExpenseFormFields>,
    defaultValues: {
      amount: expense?.amount || 0,
      accountId: expense?.accountId || "",
      categoryId: expense?.categoryId || "",
      description: expense?.description || "",
    },
  });

  useEffect(() => {
    reset(expense);
  }, [expense, reset]);

  return (
    <form onSubmit={handleSubmit(onSave)} className="p-4 grid gap-3">
      <div className="grid grid-cols-3 gap-3">
        <Controller
          name="accountId"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={String(account.id)}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="Amount"
          {...register("amount")}
        />
      </div>
      <div>
        <Input
          id="description"
          placeholder="Description"
          {...register("description")}
        />
      </div>
      <div className="flex justify-end gap-2">
        {errors ? <p></p> : <p>Elo</p>}
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
