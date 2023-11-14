"use client";

import useSWR from "swr";
import Cards from "./Cards";
import SearchInput from "./SearchInput";
import { useState } from "react";

export default function UsersSearch() {
  const [keyword, setKeyword] = useState("");
  const { data: users, isLoading } = useSWR(
    keyword.length ? `/api/users?keyword=${keyword}` : null
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
