import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { AppProviders } from "~/components/providers/AppProviders";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "Webminer",
  description: "Web Scraping and Automation Platform with AI Capabilities",
  icons: [{ rel: "icon", url: "/icon.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider 
    afterSignOutUrl={"/sign-in"}
    appearance={{
      elements: {
        formButtonPrimary: "bg-primary hover:bg-primary/90 text-white text-sm !shadow-none",
        formButtonSecondary: "bg-secondary hover:bg-secondary/90 text-sm !shadow-none",
      },
    }}

    >
      <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
        <body>
          <AppProviders>
            {children}
          </AppProviders>
          </body>
          <Toaster />
      </html>
    </ClerkProvider>
  );
}
