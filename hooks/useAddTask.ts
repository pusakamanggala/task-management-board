"use client";

import { Task } from "@/types/task";
import { TASKS_STORAGE_KEY } from "@/constants/storage";
import { toast } from "sonner";

export function useAddTask() {
  return (task: Task) => {
    try {
      const existing = localStorage.getItem(TASKS_STORAGE_KEY);
      const tasks: Task[] = existing ? JSON.parse(existing) : [];

      tasks.push(task);

      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Failed to add task to localStorage:", error);
      toast.error("Failed to add task!");
    }
  };
}
