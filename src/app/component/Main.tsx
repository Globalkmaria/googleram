import React from "react";

function Main({ children }: { children: React.ReactNode }) {
  return <div className="absolute top-[122px]">{children}</div>;
}

export default Main;
