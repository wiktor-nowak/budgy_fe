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
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormFields } from "@/schemas/auth";
import { toastErrorWithMessage } from "@/lib/errors/uiErrors";
import { useLogin } from "@/lib/hooks/auth";

const Login = () => {
  const form = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormFields) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        toastErrorWithMessage(error, "Login failed.");
      },
    });
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/register")}
            >
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
