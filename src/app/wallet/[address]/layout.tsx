import "@/app/globals.css";
import "@radix-ui/themes/styles.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function WalletLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  return (
    <div className="min-h-[calc(100vh-150px)] py-8 w-full">{children}</div>
  );
}
