"use client";

import { ReactNode } from "react";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type Props = {
  children: ReactNode;
};

export default function Carousel({ children }: Props) {
  return (
    <MultiCarousel containerClass="w-full flex gap-2" responsive={responsive}>
      {children}
    </MultiCarousel>
  );
}

const responsive = {
  desk: {
    breakpoint: { max: 4000, min: 576 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 4,
  },
};
