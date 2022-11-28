import { useRegisterApi } from "@/shared/api/auth";
import ErrorMessage from "@/shared/components/ErrorMessage";
import Loader from "@/shared/components/Loader";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import { setModalContent, setModalDisplay, setModalNeedFeedback } from "@/shared/models/modalSlice";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password_1: "",
    password_2: "",
    address: "",
  });
  const [passwordWarning, setPasswordWarning] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerApi = useRegisterApi();

  const handleFormChanges = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: registerApi,
    onSuccess: (data: UserCred) => {
      dispatch(setModalContent({ header: "system", message: "User Created!" }));
      dispatch(setModalNeedFeedback(true));
      dispatch(setModalDisplay(true));
      navigate("/login");
    },
    onError: (error: ServerError) => {},
  });

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    setPasswordWarning(false);
    if (form.password_1 === form.password_2) {
      mutate({ name: form.name, email: form.email, password: form.password_1, address: form.address });
    } else {
      setPasswordWarning(true);
    }
  };

  return (
    <div className="max-w-sm rounded-md border-2 bg-neutral-50 px-8 pb-8 shadow-lg">
      <div className="mx-auto my-6 w-fit text-2xl font-bold">Sign Up</div>
      <form onSubmit={handleSignup}>
        <input
          value={form.name}
          onChange={handleFormChanges}
          type="text"
          name="name"
          id="signUp_name"
          className="mb-4 w-full rounded-sm border border-slate-300 bg-slate-100 focus:border-green-700 focus:ring-green-700"
          placeholder="Enter name"
          required
        />
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
        {error?.status == 409 ? <div className="mx-auto -mt-2 mb-4 w-fit text-sm text-red-500">Email has been used</div> : ""}
        <input
          value={form.password_1}
          onChange={handleFormChanges}
          type="password"
          name="password_1"
          id="signUp_password_1"
          className="mb-4 w-full rounded-sm border border-slate-300 bg-slate-100 focus:border-green-700 focus:ring-green-700"
          placeholder="Enter password"
          required
        />
        <input
          value={form.password_2}
          onChange={handleFormChanges}
          type="password"
          name="password_2"
          id="signUp_password_2"
          className="mb-4 w-full rounded-sm border border-slate-300 bg-slate-100 focus:border-green-700 focus:ring-green-700"
          placeholder="Confirm password"
          required
        />
        {passwordWarning ? <div className="mx-auto -mt-2 mb-4 w-fit text-sm text-red-500">Password doesn't match</div> : ""}
        <textarea
          value={form.address}
          onChange={handleFormChanges}
          name="address"
          id="signUp_address"
          className="mb-4 h-20 w-full rounded-sm border border-slate-300 bg-slate-100 focus:border-green-700 focus:ring-green-700"
          placeholder="Enter Address (for shipping)"
          required
        />
        {isLoading ? (
          <div className="mx-auto -mt-2 mb-4 w-full text-sm text-red-500">
            <Loader />
          </div>
        ) : (
          ""
        )}
        {isError && error.status != 409 ? (
          <div className="mx-auto -mt-2 mb-4 w-fit text-sm text-red-500">
            <ErrorMessage />
          </div>
        ) : (
          ""
        )}
        <input type="submit" value="Submit" className="h-8 w-full cursor-pointer rounded-md bg-green-500 text-white hover:bg-green-600" />
      </form>
      <div className="mx-auto my-2 w-fit text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline hover:text-orange-600">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
