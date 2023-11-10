"use client";

type InstarBtn = {
  onClick: () => void;
  title: string;
  size?: "small" | "large";
};

export default function InstarBtn({
  onClick,
  title,
  size = "small",
}: InstarBtn) {
  const bgClass = size === "large" ? "text-3xl p-2" : "text-2xl p-1";
  const btnClass = size === "large" ? "p-3" : "p-2";

  return (
    <div
      className={`block  bg-gradient-to-tr from-amber-400  
  via-rose-500  to-fuchsia-500  rounded-md ${bgClass}`}
    >
      <button
        onClick={onClick}
        className={` bg-white rounded 
      transition-opacity hover:opacity-80 ${btnClass}`}
      >
        {title}
      </button>
    </div>
  );
}
