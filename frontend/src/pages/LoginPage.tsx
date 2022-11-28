import Login from "@/features/auth/components/Login";
import BackButton from "@/shared/components/BackButton";

const LoginPage = () => {
  return (
    <>
      <BackButton />
      <div className="mx-auto w-fit">
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
