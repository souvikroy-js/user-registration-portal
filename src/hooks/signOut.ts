import { authClient } from "@/lib/betterAuth/auth-client";

const signOut = async () => {
  try {
    const { error } = await authClient.signOut();

    if (error) {
      return {
        isSuccess: false,
        message: error.message,
      };
    }

    return {
      isSuccess: true,
      message: "User Logout Succesfully 👍",
    };
  } catch (error) {
    console.error(error);

    return {
      isSuccess: false,
      message: "User Logout Failed 😢",
    };
  }
};

export default signOut;
