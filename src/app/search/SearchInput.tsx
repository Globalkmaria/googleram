"use client";

import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchInput({ onSearch }: Props) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        autoFocus
        id="keyword"
        name="keyword"
        type="text"
        placeholder="Search user with user or username..."
        className="w-full h-10 p-5 text bg-white 
      border-2 border-gray-300 rounded focus:outline-none"
      />
    </form>
  );
}
