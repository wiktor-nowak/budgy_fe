import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  validateEmailSchema,
  type ValidateEmailFormFields,
} from "@/schemas/auth";
import { toastErrorWithMessage } from "@/lib/errors/uiErrors";
import { useEffect, useState } from "react";
import { verifyEmail } from "@/lib/api/auth";

const Verified = () => {
  const form = useForm<ValidateEmailFormFields>({
    resolver: zodResolver(validateEmailSchema),
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const onSubmit = async (data: ValidateEmailFormFields) => {
    try {
      await verifyEmail(data);
      navigate("/login");
    } catch (error) {
      toastErrorWithMessage(error, "Login failed.");
    }
  };

  useEffect(() => {
    const value = searchParams.get("match");
    if (value) setIsVerified(JSON.parse(value));
  }, [searchParams]);

  const renderVeryficationForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Re-Send
        </Button>
      </form>
    </Form>
  );

  const renderSuccess = () => (
    <Button
      variant="default"
      className="w-full"
      onClick={() => navigate("/login")}
    >
      Login
    </Button>
  );

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isVerified ? "SUCCESS!" : "Not Verified!"}
        </CardTitle>
        <CardDescription>
          {isVerified
            ? "Email verified successfully! Please navigate to login with button below."
            : "Enter your email address so we can re-send veryfication message to you."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isVerified ? renderSuccess() : renderVeryficationForm()}
      </CardContent>
    </Card>
  );
};

export default Verified;
