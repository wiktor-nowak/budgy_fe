import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { ACCOUNT_TYPES } from "@/lib/constants";
import { useState, useEffect } from "react";
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
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema) as Resolver<FormFields>,
    defaultValues: {
      name: "",
      type: "BANK",
      balance: 0,
      description: "",
    },
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (accountToEdit) {
      setValue("name", accountToEdit.name);
      setValue("type", accountToEdit.type);
      setValue("balance", accountToEdit.balance);
      setValue("description", accountToEdit.description);
    }
  }, [accountToEdit, setValue]);

  const onSubmit = async (data: FormFields) => {
    try {
      const token = localStorage.getItem("token");
      if (accountToEdit) {
        await updateAccount(accountToEdit.id, data);
        setAccountToEdit(null);
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
          throw new Error("Response not okay!");
        }

        const responseData = await response.json();
        console.log(responseData.response);
      }
    } catch (error) {
      setError("Operation failed");
      console.error(error);
    }
    reset();
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
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!!accountToEdit}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an account type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCOUNT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-red-500 text-xs">{errors.type.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="balance">Balance</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              {...register("balance")}
            />
            {errors.balance && (
              <p className="text-red-500 text-xs">{errors.balance.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
          </div>
          <Button type="submit" className="w-full">
            {accountToEdit ? "Update Account" : "Add Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddAccountForm;
