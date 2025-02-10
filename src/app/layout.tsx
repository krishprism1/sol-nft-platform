import type { Metadata } from "next";
import "./globals.css";
import { WalletConnectionProvider } from "@/components/wallet/WalletProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "MrGain",
  description: "NFT to Earn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WalletConnectionProvider>
          {children}
        </WalletConnectionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
