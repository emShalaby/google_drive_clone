import React from "react";
import { Input } from "./ui/input";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-xl font-semibold">Crash Drive</h1>
        <div className="ml-auto flex items-center gap-2">
          <Input placeholder="Search in Drive" className="w-64 md:w-80" />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
