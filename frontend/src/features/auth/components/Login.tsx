import { setAuth } from "@/features/auth/models/authSlice";
import { useLoginApi } from "@/shared/api/auth";
import ErrorMessage from "@/shared/components/ErrorMessage";
import Loader from "@/shared/components/Loader";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const loginApi = useLoginApi();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data: UserCred) => {
      dispatch(setAuth(data));
      navigate(from);
    },
    onError: (error: AxiosError<ServerError>) => {},
  });

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    mutate(form);
  };
  return (
    <div className="max-w-sm rounded-md border-2 bg-neutral-50 px-8 pb-8 shadow-lg">
      <div className="mx-auto my-6 w-fit text-2xl font-bold">Log In</div>
      <form onSubmit={handleLogin}>
        <input
          value={form.email}
          onChange={handleFormChanges}
          type="email"
          name="email"
          id="signUp_email"
          className="mb-4 w-full rounded-sm border border-slate-300 bg-slate-100 focus:border-green-700 focus:ring-green-700"
          placeholder="Enter email"
          required
        />
        <input
          value={form.password}
          onChange={handleFormChanges}
          type="password"
          name="password"
          id="signUp_password"
          className="mb-4 w-full rounded-sm border border-slate-300 bg-slate-100 focus:border-green-700 focus:ring-green-700"
          placeholder="Enter password"
          required
        />
        {isLoading ? (
          <div className="mx-auto -mt-2 mb-4 w-full text-sm text-red-500">
            <Loader />
          </div>
        ) : (
          ""
        )}
        {error?.response?.data.status == 401 ? (
          <div className="mx-auto -mt-2 mb-4 w-fit text-sm text-red-500">{error?.response?.data.message}</div>
        ) : isError ? (
          <div className="mx-auto -mt-2 mb-4 w-fit text-sm text-red-500">
            <ErrorMessage />
          </div>
        ) : (
          ""
        )}
        <div className="text-xs">
          <div className="text-center">For demo, use email/password below or sign up!</div>
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <div>email: admin@admin.com</div>
              <div>password: admin123xyz</div>
            </div>
            <span>or</span>
            <div>
              <div>email: user1@user.com</div>
              <div>password: user123xyz</div>
            </div>
          </div>
        </div>
        <input type="submit" value="login" className="h-8 w-full cursor-pointer rounded-md bg-green-500 uppercase text-white hover:bg-green-600" />
      </form>
      <div className="mx-auto my-2 w-fit text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="underline hover:text-orange-600">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
