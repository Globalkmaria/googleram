import React from "react";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="absolute top-[122px] max-w-screen-xl w-full min-h-[calc(100vh-122px)]">
      {children}
    </main>
  );
}

export default Main;
