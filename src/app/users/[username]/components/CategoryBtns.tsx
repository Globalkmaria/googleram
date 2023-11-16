import React from "react";

import { CATEGORIES, Categories } from "@/model/posts";
import Category from "./Category";

type Props = {
  currentCategory: Categories;
  onChangeCategory: (category: Categories) => void;
};

export default function CategoryBtns({
  currentCategory,
  onChangeCategory,
}: Props) {
  return (
    <div className="flex w-full gap-6 justify-center">
      {CATEGORIES.map((category) => (
        <Category
          key={category}
          type={category}
          focused={category === currentCategory}
          onClick={onChangeCategory}
        />
      ))}
    </div>
  );
}
