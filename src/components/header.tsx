import React from "react";
import { UploadButton } from "./upload-button";
import { Input } from "./ui/input";

const Header = ({ currentPath }: { currentPath: string[] }) => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-xl font-semibold">Crash Drive</h1>
        <div className="ml-auto flex items-center gap-2">
          <Input placeholder="Search in Drive" className="w-64 md:w-80" />
          <UploadButton currentPath={currentPath} />
        </div>
      </div>
    </header>
  );
};

export default Header;
