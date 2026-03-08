"use client";

import { LoaderCircleIcon, LogOutIcon } from "lucide-react";
import { Button } from "../shadcnui/button";
import { useState } from "react";
import signOut from "@/hooks/signOut";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const [loader, setLoader] = useState(false);
  const { replace } = useRouter();

  const logoutHandler = async () => {
    try {
      setLoader(true);

      const { isSuccess, message } = await signOut();

      if (isSuccess) {
        toast.success(message);

        replace("/auth/login");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Button
      onClick={logoutHandler}
      variant={"destructive"}>
      {loader ?
        <>
          <LoaderCircleIcon className="animate-spin" /> Logingout...
        </>
      : <>
          <LogOutIcon /> Logout
        </>
      }
    </Button>
  );
};

export default LogoutButton;
