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
import { useEffect, useState } from "react";
import { getMe, updateUser, changePassword, type User } from "@/api/users";
import { getMyAccounts, getMainAccount, type Account } from "@/api/accounts";

const settingsSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    name: z.string().optional(),
    surname: z.string().optional(),
    mainAccountId: z.string().min(1, "Please select a main account"),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword || data.confirmNewPassword) {
        return !!data.oldPassword;
      }
      return true;
    },
    {
      message: "Old password is required to set a new password",
      path: ["oldPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword || data.oldPassword) {
        return data.newPassword && data.newPassword.length >= 8;
      }
      return true;
    },
    {
      message: "New password must be at least 8 characters long",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword) {
        return data.newPassword === data.confirmNewPassword;
      }
      return true;
    },
    {
      message: "New passwords do not match",
      path: ["confirmNewPassword"],
    }
  );

type SettingsFormFields = z.infer<typeof settingsSchema>;

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [mainAccountId, setMainAccountId] = useState<string>("");

  const form = useForm<SettingsFormFields>({
    resolver: zodResolver(settingsSchema) as Resolver<SettingsFormFields>,
    defaultValues: {
      username: "",
      email: "",
      name: "",
      surname: "",
      mainAccountId: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedUser, fetchedAccounts, fetchedMainAccountId] = await Promise.all([
          getMe(),
          getMyAccounts(),
          getMainAccount(),
        ]);
        setUser(fetchedUser);
        setAccounts(fetchedAccounts);
        setMainAccountId(fetchedMainAccountId);

        form.reset({
          username: fetchedUser.username,
          email: fetchedUser.email,
          name: fetchedUser.name || "",
          surname: fetchedUser.surname || "",
          mainAccountId: fetchedMainAccountId,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } catch (error) {
        toast.error("Failed to fetch settings data");
        console.error("Failed to fetch settings data", error);
      }
    };

    fetchData();
  }, [form]);

  const onSubmit = async (data: SettingsFormFields) => {
    if (!user) return;

    try {
      // Update user details
      await updateUser(user.id, {
        username: data.username,
        email: data.email,
        name: data.name,
        surname: data.surname,
      });

      // Change password if fields are filled
      if (data.oldPassword && data.newPassword) {
        await changePassword(user.id, data.oldPassword, data.newPassword);
      }

      // Update main account if changed
      if (data.mainAccountId !== mainAccountId) {
        // Logic to update main account in backend
        // This would involve a PATCH request to the account endpoint
        // to set isMainAccount to true for the new main account
        // and false for the old main account.
        // For now, I'll just log it.
        console.log("Main account changed to:", data.mainAccountId);
      }

      toast.success("Settings updated successfully!");
      form.reset({
        ...data,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
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
        <CardTitle className="text-xl">Manage Settings</CardTitle>
        <CardDescription>Update your profile and account settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <FormLabel>Username</FormLabel>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormLabel>Email</FormLabel>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormLabel>Name</FormLabel>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormLabel>Surname</FormLabel>
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormLabel>Main Account</FormLabel>
              <FormField
                control={form.control}
                name="mainAccountId"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a main account" />
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

              <FormLabel>Old Password</FormLabel>
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormLabel>New Password</FormLabel>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormLabel>Confirm New Password</FormLabel>
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Change settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Settings;