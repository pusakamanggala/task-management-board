"use client";

import { Task } from "@/types/task";
import { TASKS_STORAGE_KEY } from "@/constants/storage";

export function useGetTaskDetail() {
  return (id: string): Task | undefined => {
    const existing = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!existing) return undefined;

    const tasks: Task[] = JSON.parse(existing);
    return tasks.find((task) => task.id === id);
  };
}
