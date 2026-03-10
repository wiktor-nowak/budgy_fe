import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FiChevronDown } from "react-icons/fi";
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
import {
  useAccountsWithCategories,
  useMainAccount,
} from "@/lib/hooks/accounts";
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { CurrencyField } from "../main/CurrencyField";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useCreateTransaction } from "@/lib/hooks/transactions";
import { toast } from "sonner";
import { toastErrorWithMessage } from "@/lib/errors/uiErrors";

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

const TRANSACTION_TYPES = {
  income: "income",
  expense: "expense",
};
type TRANSACTION_TYPE = keyof typeof TRANSACTION_TYPES;

const TransactionForm = () => {
  const form = useForm<CreateTransactionFormType>({
    resolver: zodResolver(createTransactionSchema),
    mode: "onBlur",
    defaultValues: {
      accountId: undefined,
      categoryId: undefined,
      amount: 0,
      description: "",
      transactionDate: new Date(),
    },
  });
  const { data: accounts = [] } = useAccountsWithCategories();
  const { data: mainAccount } = useMainAccount();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [transactionType, setTransactionType] =
    useState<TRANSACTION_TYPE>("expense");

  // derived part
  const selectedAccountId = form.watch("accountId");
  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);
  const categories = selectedAccount?.categories ?? [];
  const { mutate } = useCreateTransaction();

  const handleToggleChange = (value: TRANSACTION_TYPE) => {
    if (value) {
      setTransactionType(value as TRANSACTION_TYPE);
    }
  };

  useEffect(() => {
    if (mainAccount) {
      form.setValue("accountId", mainAccount.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainAccount]);

  const onSubmit = async (data: CreateTransactionFormType) => {
    mutate(
      {
        ...data,
        amount:
          transactionType === "expense"
            ? -Number(data.amount)
            : Number(data.amount),
      },
      {
        onSuccess: () => {
          toast.success("Transaction created successfully!", {
            position: "bottom-center",
          });
          form.reset();
        },
        onError: (error) => {
          toastErrorWithMessage(error, "Unable to create transaction.");
        },
      },
    );
  };
  const onCancel = () => {};

  return (
    <DrawerContent className="w-1/3 max-w-1/3 flex flex-col">
      <DrawerHeader>
        <DrawerTitle>Add transaction</DrawerTitle>
        <DrawerDescription>
          Define your transaction with details.
        </DrawerDescription>
      </DrawerHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-1"
        >
          <div className="flex-1 overflow-y-auto px-8 flex flex-col gap-8">
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
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={categories.length === 0}
                  >
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
            <ToggleGroup
              type="single"
              variant="outline"
              value={transactionType}
              onValueChange={handleToggleChange}
            >
              <ToggleGroupItem value={TRANSACTION_TYPES.expense}>
                {TRANSACTION_TYPES.expense.toUpperCase()}
              </ToggleGroupItem>
              <ToggleGroupItem value={TRANSACTION_TYPES.income}>
                {TRANSACTION_TYPES.income.toUpperCase()}
              </ToggleGroupItem>
            </ToggleGroup>
            <CurrencyField
              control={form.control}
              name="amount"
              label="Amount"
            />
            <FormField
              control={form.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Date</FormLabel>
                  <FormControl className="w-full">
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <FiChevronDown />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0 w-[var(--radix-popover-trigger-width)] flex justify-center items-center"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          defaultMonth={field.value}
                          disabled={{ after: new Date() }}
                          onSelect={(date) => {
                            if (!date) return;
                            field.onChange(date);
                            setCalendarOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
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
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DrawerFooter className="mt-auto">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Add transaction</Button>
          </DrawerFooter>
        </form>
      </Form>
    </DrawerContent>
  );
};

export default TransactionForm;
