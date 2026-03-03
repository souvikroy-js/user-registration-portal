import { PageLayoutProps } from "@/lib/type";

const layout = ({ children }: PageLayoutProps) => {
  return <main className="mx-auto max-w-7xl">{children}</main>;
};

export default layout;
