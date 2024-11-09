import { signal } from '@preact/signals';
import useAppStateContext from "../../contexts/AppStateProvider";
import type { MeetupGroupItem } from "../../types/types";

const loginForm = signal({
  email: "",
  password: "",
});

type LoginProps = {
  group: MeetupGroupItem | null;
};
export default function Login({ group }: LoginProps) {
  const {
    api: { userLogin },
  } = useAppStateContext();

  if (!group) {
    return (
      <div class="flex flex-col gap-1">
        <p>Error loading group. Reload the page</p>
      </div>
    );
  }

  const handleInputChange = (event: Event, field: 'email' | 'password') => {
    const target = event.target as HTMLInputElement;
    loginForm.value = {
      ...loginForm.value,
      [field]: target.value,
    };
  };

  const handleLogin = () => {
    userLogin({
      email: loginForm.value.email,
      password: loginForm.value.password,
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                onChange={(e) => handleInputChange(e, 'email')}
                value={loginForm.value.email}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                onChange={(e) => handleInputChange(e, 'password')}
                value={loginForm.value.password}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
            <div className="flex items-center justify-end mt-2">
              <div className="text-sm">
                <button
                  type="button"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleLogin}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
      </div>
    </div>
  );
}
