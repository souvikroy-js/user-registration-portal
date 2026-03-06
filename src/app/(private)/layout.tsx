import Header from "@/components/Header/Private/Header";
import { auth } from "@/lib/betterAuth/auth";
import { PageLayoutProps } from "@/lib/type";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const layout = async ({ children }: PageLayoutProps) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      redirect("/auth/login");
    }
  } catch (error) {
    console.error("Dashboard auth error:", error);
    redirect("/auth/login");
  }

  return (
    <main className="mx-auto max-w-7xl">
      <Header />
      {children}
    </main>
  );
};

export default layout;
