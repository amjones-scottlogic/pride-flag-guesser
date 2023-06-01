import React from "react";

type PageProps = {
  children: React.ReactNode;
};

function Page({ children }: PageProps) {
  return (
    <div className="w-full flex flex-col h-screen content-center justify-center text-gray-200 font-sans">
      <div className="w-full sm:w-1/2 lg:w-1/3 m-auto">{children}</div>
    </div>
  );
}

export default Page;
