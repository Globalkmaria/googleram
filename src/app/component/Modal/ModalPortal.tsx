"use client";

import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export default function ModalPortal({ children, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  return (
    <div
      className="h-[100vh] w-[100vw] absolute top-0 left-0 
    flex justify-center items-center z-[99999]"
    >
      <div
        className="absolute top-0 left-0 
        h-[100vh] w-[100vw] 
        bg-slate-400 opacity-20
        "
      ></div>
      <div className=" z-[99999]" ref={ref}>
        {children}
      </div>
    </div>
  );
}
