"use client";

import useSWR from "swr";
import Cards from "./Cards";
import SearchInput from "./SearchInput";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function UsersSearch() {
  const [keyword, setKeyword] = useState("");
  const debounceSearch = useDebounce(keyword, 500);
  const { data: users, isLoading } = useSWR(
    `/api/users?keyword=${debounceSearch}`
  );

  const onSearch = (value: string) => {
    setKeyword(value);
  };

  return (
    <>
      <SearchInput onSearch={onSearch} />
      <Cards isLoading={isLoading} users={users} />
    </>
  );
}
