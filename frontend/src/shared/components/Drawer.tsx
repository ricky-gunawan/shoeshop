import { ReactNode, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type DrawerProps = {
  children: ReactNode | ReactNode[];
};

const Drawer = ({ children }: DrawerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`fixed top-20 ${open ? "" : "-translate-x-[103%]"} transition-transform duration-500 lg:translate-x-0`}>
      <button onClick={() => setOpen((prev) => !prev)} className="absolute right-0 top-0 translate-x-full lg:hidden">
        {open ? <XMarkIcon className="h-6 w-6 text-black" /> : <div className="rounded-sm bg-black/30 py-1 tracking-wider text-neutral-50 [writing-mode:vertical-lr]">Filter</div>}
      </button>
      {children}
    </div>
  );
};

export default Drawer;
