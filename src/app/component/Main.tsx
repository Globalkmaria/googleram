import React from "react";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="absolute top-[122px] max-w-screen-xl w-full">
      {children}
    </main>
  );
}

export default Main;
