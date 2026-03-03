import ThemeProvider from "@/components/Providers/ThemeProvider";
import { geistMono, geistSans } from "@/lib/fonts";
import { PageLayoutProps } from "@/lib/type";
import "./globals.css";

const RootLayout = ({ children }: PageLayoutProps) => {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          enableSystem={false}>
          <main className="mx-auto max-w-7xl">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
