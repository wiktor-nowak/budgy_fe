import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const Login = ({ onSwitch }: { onSwitch: () => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Don't have an account yet?
            <button type="button" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={onSwitch}>
              Sign up here
            </button>
          </p>
        </div>

        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-2">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                  <a className="text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">Forgot password?</a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    {...register('password')}
                    className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  />
                  {errors.password && <p className="text-xs text-red-600 mt-2">{errors.password.message}</p>}
                </div>
              </div>

              <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;