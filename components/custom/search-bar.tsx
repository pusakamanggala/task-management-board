"use client";

import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { TaskFilter, FILTER_LABELS } from "@/types/filter";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = (searchParams.get("filter") as TaskFilter) || "label";
  const q = searchParams.get("q") || "";

  const [value, setValue] = useState(q);

  useEffect(() => {
    setValue(q);
  }, [q]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, router, searchParams]);

  return (
    <Input
      type={filter === "dueDate" ? "date" : "text"}
      placeholder={
        filter === "dueDate"
          ? "Select due date"
          : `Search by ${FILTER_LABELS[filter]}...`
      }
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="max-w-[300px]"
    />
  );
}
