import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCategories, type Category } from "@/api/categories";
import { getMyAccounts, getMainAccount, type Account } from "@/api/accounts";
import { addExpense } from "@/api/expenses";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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
  const [mainAccount, setMainAccount] = useState<string>("");

  const form = useForm<SpendingFormFields>({
    resolver: zodResolver(spendingSchema) as Resolver<SpendingFormFields>,
    defaultValues: {
      amount: 0,
      accountId: "",
      categoryId: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedCategories, fetchedAccounts, mainAccountId] =
          await Promise.all([
            getCategories(),
            getMyAccounts(),
            getMainAccount(),
          ]);
        setCategories(fetchedCategories);
        setAccounts(fetchedAccounts);
        setMainAccount(mainAccountId);
        form.setValue("accountId", mainAccountId);
      } catch (error) {
        toast.error("Failed to fetch data for AddSpending page");
        console.error("Failed to fetch data for AddSpending page", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: SpendingFormFields) => {
    try {
      await addExpense(data);
      form.reset();
      form.setValue("accountId", mainAccount);
      toast.success("Spending added successfully!");
    } catch (error) {
      toast.error(
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="accountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select an account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem
                            key={account.id}
                            value={String(account.id)}
                          >
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
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Add Spending
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default AddSpending;
