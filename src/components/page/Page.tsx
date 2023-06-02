import React from "react";

type PageProps = {
  children: React.ReactNode;
};

function Page({ children }: PageProps) {
  return (
    <div className="w-full flex flex-col h-screen content-center justify-center text-gray-200 font-sans">
      <div className="w-full xl:w-1/2 m-auto">{children}</div>
    </div>
  );
}

export default Page;
