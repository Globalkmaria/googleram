"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

export default function ModalPortal({ children }: Props) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(
      document.documentElement
    ).overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = originalStyle;
    };
  }, []);

  if (typeof window === "undefined") {
    return null;
  }

  const node = document.getElementById("portal") as Element;
  return createPortal(children, node);
}
