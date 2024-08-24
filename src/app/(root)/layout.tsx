import { ReactNode } from "react";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <nav>
        <Header className="sticky left-0 top-0">
          <div id="title-wrapper"></div>
          <div className="flex items-center gap-2 lg:gap-4">
            <div id="collaborators-wrapper"></div>
            <div id="notification-wrapper"></div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Header>
      </nav>
      <section>{children}</section>
    </>
  );
}
