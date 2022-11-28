import BackButton from "@/shared/components/BackButton";

const NotFoundPage = () => {
  return (
    <>
      <BackButton />
      <div className="text-center">
        <p>404!</p>
        <p>The page you are looking is not exist</p>
      </div>
    </>
  );
};

export default NotFoundPage;
