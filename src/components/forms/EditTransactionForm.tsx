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
  FormMessage,
} from "@/components/ui/form";
import {
  createTransactionSchema,
  type CreateTransactionFormType,
} from "@/schemas/transactions";
import { useAccountsWithCategories } from "@/lib/hooks/accounts";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { CurrencyField } from "../main/CurrencyField";
import { useEffect, useMemo, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  useSingleTransaction,
  useUpdateTransaction,
} from "@/lib/hooks/transactions";
import { toast } from "sonner";
import { toastErrorWithMessage } from "@/lib/errors/uiErrors";

const TRANSACTION_TYPES = {
  income: "income",
  expense: "expense",
};
type TRANSACTION_TYPE = keyof typeof TRANSACTION_TYPES;

type EditTransactionTypes = {
  txId: string;
};

const EditTransactionForm = ({ txId }: EditTransactionTypes) => {
  const form = useForm<CreateTransactionFormType>({
    resolver: zodResolver(createTransactionSchema),
    mode: "onBlur",
    defaultValues: {
      accountId: "",
      categoryId: "",
      amount: 0,
      description: "",
      transactionDate: new Date(),
    },
  });
  const { data: accounts = [] } = useAccountsWithCategories();
  const { data: transaction } = useSingleTransaction(txId);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [transactionType, setTransactionType] =
    useState<TRANSACTION_TYPE>("expense");

  // derived part
  const selectedAccountId = form.watch("accountId");
  const selectedAccount = useMemo(
    () => accounts.find((acc) => acc.id === selectedAccountId),
    [accounts, selectedAccountId],
  );
  const categories = useMemo(
    () => selectedAccount?.categories ?? [],
    [selectedAccount],
  );
  const { mutate } = useUpdateTransaction();

  const handleToggleChange = (value: TRANSACTION_TYPE) => {
    if (value) {
      setTransactionType(value as TRANSACTION_TYPE);
    }
  };

  useEffect(() => {
    if (!transaction || accounts.length === 0) return;
    if (transaction?.amount <= 0) {
      setTransactionType("expense");
    } else {
      setTransactionType("income");
    }
    form.reset({
      accountId: accounts.find((acc) => acc.id === transaction?.accountId)?.id,
      categoryId: categories.find((cat) => cat.id === transaction?.categoryId)
        ?.id,
      amount: Math.abs(Number(transaction?.amount)),
      description: transaction?.description ?? undefined,
      transactionDate: new Date(transaction?.transactionDate),
    });
  }, [transaction, form, accounts, categories]);

  const onSubmit = async (data: CreateTransactionFormType) => {
    mutate(
      {
        data: {
          ...data,
          amount:
            transactionType === "expense"
              ? -Number(data.amount)
              : Number(data.amount),
        },
        txId,
      },
      {
        onSuccess: () => {
          toast.success("Transaction edited successfully!", {
            position: "bottom-center",
          });
        },
        onError: (error) => {
          toastErrorWithMessage(error, "Unable to edit transaction.");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) =>
          console.log("FORM ERRORS:", errors),
        )}
        className="grid grid-cols-4 grid-rows-2 gap-2 p-2 justify-items-stretch m-auto max-w-[800px]"
      >
        <FormField
          control={form.control}
          name="transactionDate"
          render={({ field }) => (
            <FormItem>
              <FormControl className="w-full">
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!field.value}
                      className="justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
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
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={categories.length === 0}
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
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
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
          name="description"
          render={({ field }) => (
            <FormItem className="col-start-4 col-end-5 row-start-1 row-end-3">
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ToggleGroup
          type="single"
          variant="outline"
          value={transactionType}
          onValueChange={handleToggleChange}
          className="justify-self-end items-start"
        >
          <ToggleGroupItem value={TRANSACTION_TYPES.expense}>-</ToggleGroupItem>
          <ToggleGroupItem value={TRANSACTION_TYPES.income}>+</ToggleGroupItem>
        </ToggleGroup>

        <CurrencyField control={form.control} name="amount" />

        <Button type="submit" variant="secondary">
          Edit
        </Button>
      </form>
    </Form>
  );
};

export default EditTransactionForm;
