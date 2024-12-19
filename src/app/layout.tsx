"use client";

import "@/app/globals.css";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@radix-ui/themes/styles.css";
import { Header } from "@/components/shared/header";
import { Toaster } from "@/components/ui/toaster";
import { KeyDialog } from "@/components/shared/key-dialog";
import { Footer } from "@/components/shared/footer";
import { WalletUiContext } from "@/utils/store/wallet.store";
import { GoogleTagManager } from "@next/third-parties/google";
import goldrushConfig from "../../goldrush.config";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      {goldrushConfig.gtag_id && (
        <GoogleTagManager gtmId={goldrushConfig.gtag_id} />
      )}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <WalletUiContext>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
            <KeyDialog />
            <Toaster />
          </div>
        </WalletUiContext>
      </body>
    </html>
  );
}
