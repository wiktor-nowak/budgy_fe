import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCategories, type Category } from "@/api/categories";
import { getMyAccounts, type Account } from "@/api/accounts";
import { addExpense } from "@/api/expenses";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const spendingSchema = z.object({
  amount: z.coerce.number(),
  accountId: z.string().min(1, "Please select an account"),
  categoryId: z.string().min(1, "Please select a category"),
  description: z.string().optional(),
});

type SpendingFormFields = z.infer<typeof spendingSchema>;

const AddSpending = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SpendingFormFields>({
    resolver: zodResolver(spendingSchema) as Resolver<SpendingFormFields>,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedCategories, fetchedAccounts] = await Promise.all([
          getCategories(),
          getMyAccounts(),
        ]);
        setCategories(fetchedCategories);
        setAccounts(fetchedAccounts);
      } catch (error) {
        console.error("Failed to fetch data for AddSpending page", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: SpendingFormFields) => {
    setFormError(null);
    try {
      await addExpense(data);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      console.error(error);
    }
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Add Spending</CardTitle>
        <CardDescription>Enter the details of the new expense</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {formError && (
            <p className="text-red-500 text-xs mb-4">{formError}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2 w-full">
              <Label htmlFor="accountId">Account</Label>
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
              {errors.accountId && (
                <p className="text-red-500 text-xs">
                  {errors.accountId.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs">{errors.amount.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categoryId">Category</Label>
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
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <p className="text-red-500 text-xs">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
          </div>
          <Button type="submit" className="w-full">
            Add Spending
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default AddSpending;
