import ErrorMessage from "@/shared/components/ErrorMessage";
import Loader from "@/shared/components/Loader";
import NetworkErrorMessage from "@/shared/components/NetworkErrorMessage";

type LoadingAndErrorHandlerProps = {
  isLoading: boolean | undefined;
  isError: boolean | undefined;
  isPaused: boolean | undefined;
};

const LoadingAndErrorHandler = ({ isLoading, isError, isPaused }: LoadingAndErrorHandlerProps): JSX.Element | null => {
  if (isError) {
    return (
      <div className="mt-48">
        <ErrorMessage />
      </div>
    );
  } else if (isPaused) {
    return (
      <div className="mt-48">
        <NetworkErrorMessage />
      </div>
    );
  } else if (isLoading) {
    return (
      <div className="mt-48">
        <Loader />
      </div>
    );
  }
  return null;
};

export default LoadingAndErrorHandler;
