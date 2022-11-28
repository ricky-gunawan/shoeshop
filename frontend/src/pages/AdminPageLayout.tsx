import AdminBar from "@/features/appbar/admin-bar";
import useAppDispatch from "@/shared/hooks/useAppDispatch";
import useAppSelector from "@/shared/hooks/useAppSelector";
import { setModalContent, setModalDisplay } from "@/shared/models/modalSlice";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminPageLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (!auth.roles.includes(21)) {
      dispatch(setModalContent({ header: "warning", message: "You must login as an admin!" }));
      dispatch(setModalDisplay(true));
      navigate("/login", { replace: true, state: { from: { pathname } } });
    }
  }, []);
  return (
    <>
      <div className="fixed top-0 left-1/2 z-10 h-16 w-full max-w-screen-2xl -translate-x-1/2">
        <AdminBar />
      </div>
      <div className="mt-20">
        <Outlet />
      </div>
    </>
  );
};

export default AdminPageLayout;
