"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { dummyTasks } from "@/data/dummy-task";
import { Suspense } from "react";
import FilterButton from "./filter-button";
import SearchBar from "./search-bar";
import { TASKS_STORAGE_KEY } from "@/constants/storage";

export default function Header() {
  const handlePopulate = () => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(dummyTasks));
    window.location.reload();
  };

  const handleReset = () => {
    localStorage.removeItem(TASKS_STORAGE_KEY);
    window.location.reload();
  };

  return (
    <header className="min-h-[70px] py-2 flex items-center border-b-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="hidden md:block font-semibold">Adhivasindo</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={handlePopulate}>
                Populate Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleReset}>
                Reset Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-2">
          <Suspense>
            <div className="flex gap-2">
              <FilterButton />
              <SearchBar />
            </div>
          </Suspense>
        </div>
      </div>
    </header>
  );
}
