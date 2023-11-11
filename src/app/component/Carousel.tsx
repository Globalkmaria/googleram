"use client";

import { ReactNode } from "react";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type Props = {
  children: ReactNode;
};

export default function Carousel({ children }: Props) {
  return <MultiCarousel responsive={responsive}>{children}</MultiCarousel>;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};
