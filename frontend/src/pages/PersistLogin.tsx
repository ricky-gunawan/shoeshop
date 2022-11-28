import Spinner from "@/shared/components/Spinner";
import useAppSelector from "@/shared/hooks/useAppSelector";
import useRefreshToken from "@/shared/hooks/useRefreshToken";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const auth = useAppSelector((store) => store.auth);

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        await refresh();
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    !auth.accessToken && refreshAuth();
  }, [auth]);
  return (
    <>
      {isLoading ? (
        <div className="mt-32">
          <Spinner />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
