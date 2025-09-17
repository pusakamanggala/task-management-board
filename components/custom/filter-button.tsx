"use client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { TaskFilter, FILTER_LABELS } from "@/types/filter";

export default function FilterButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = (searchParams.get("filter") as TaskFilter) || "label";

  const setFilter = (value: TaskFilter) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", value);

    // reset q when filter changes
    params.delete("q");

    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          {FILTER_LABELS[activeFilter]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(["assignee", "label", "dueDate"] as TaskFilter[]).map((key) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setFilter(key)}
            disabled={key === activeFilter}
          >
            {FILTER_LABELS[key]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
