import Signup from "@/features/auth/components/Signup";
import BackButton from "@/shared/components/BackButton";

const SignupPage = () => {
  return (
    <>
      <BackButton />
      <div className="mx-auto w-fit">
        <Signup />
      </div>
    </>
  );
};

export default SignupPage;
