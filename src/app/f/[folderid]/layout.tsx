import React from "react";
import Header from "~/components/header";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Header />
      <div className="flex min-h-screen flex-col bg-gray-800">
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-[2000px]">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
