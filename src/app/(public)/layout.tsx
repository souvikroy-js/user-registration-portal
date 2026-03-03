import Header from "@/components/Header/Public/Header";
import { PageLayoutProps } from "@/lib/type";

const layout = ({ children }: PageLayoutProps) => {
  return (
    <main className="mx-auto max-w-7xl">
      <Header />
      {children}
    </main>
  );
};

export default layout;
