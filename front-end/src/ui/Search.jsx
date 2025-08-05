"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const formSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search;
    const searchValue = search.value.trim();

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", "1");
    if (searchValue) {
      newParams.set("search", searchValue);
    } else {
      newParams.delete("search");
    }
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <form className="flex items-center" onSubmit={formSubmit}>
      <input
        type="text"
        name="search"
        placeholder="جستجو ..."
        autoComplete="off"
        defaultValue={searchParams.get("search") || ""}
        className="flex-1 py-3 text-xs bg-secondary-0 textField__input"
      />
      <button type="submit" className="p-2">
        <MagnifyingGlassIcon className="h-6 text-primary-800" />
      </button>
    </form>
  );
}
