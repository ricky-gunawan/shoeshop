import HomeBar from "@/features/appbar/home-bar";
import { Outlet } from "react-router-dom";

const PublicPageLayout = () => {
  return (
    <>
      <div className="fixed top-0 left-1/2 z-10 h-16 w-full max-w-screen-2xl -translate-x-1/2">
        <HomeBar />
      </div>
      <div className="mt-20">
        <Outlet />
      </div>
    </>
  );
};

export default PublicPageLayout;
