import React from "react";

function Main({ children }: { children: React.ReactNode }) {
  return <main className="absolute top-[122px]">{children}</main>;
}

export default Main;
