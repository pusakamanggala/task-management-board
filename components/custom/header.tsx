import { Suspense } from "react";
import FilterButton from "./filter-button";
import SearchBar from "./search-bar";

export default function Header() {
  return (
    <header className="min-h-[70px] py-2 flex items-center border-b-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="hidden md:block">Adhivasindo</h1>
        <Suspense>
          <div className="flex gap-2">
            <FilterButton />
            <SearchBar />
          </div>
        </Suspense>
      </div>
    </header>
  );
}
