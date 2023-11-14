"use client";

import { useState } from "react";
import useSWR from "swr";

import { Categories } from "@/model/posts";
import Cards from "./Cards";
import CategoryBtns from "./CategoryBtns";
import Loader from "@/app/component/PropagateLoader";

type Props = {
  username: string;
};

export default function Content({ username }: Props) {
  const [currentCategory, setCurrentCategory] = useState<Categories>("posts");
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(`/api/users/${username}/posts?category=${currentCategory}`);

  const onChangeCategory = (category: Categories) => {
    setCurrentCategory(category);
  };

  return (
    <section className=" border-t border-gray-200 w-full">
      <CategoryBtns
        currentCategory={currentCategory}
        onChangeCategory={onChangeCategory}
      />
      {isLoading ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="w-full text-center">Error</div>
      ) : (
        <Cards posts={posts} />
      )}
    </section>
  );
}
