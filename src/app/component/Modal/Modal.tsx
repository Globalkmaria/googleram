"use client";

import { useRouter } from "next/navigation";

import {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

type Props = {
  children: ReactNode;
  onClose?: () => void;
};

export default function Modal({ children }: Props) {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  useEffect(() => {
    const originalStyle = window.getComputedStyle(
      document.documentElement
    ).overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = originalStyle;
    };
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed z-50 
      left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 w-full h-full"
      onClick={onClick}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 
        -translate-y-1/2 w-4/5 h-3/5 max-w-7xl"
        ref={wrapper}
      >
        {children}
      </div>
    </div>
  );
}
