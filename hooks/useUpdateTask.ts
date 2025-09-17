"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { Task } from "@/types/task";
import { TASKS_STORAGE_KEY } from "@/constants/storage";

export function useUpdateTask() {
  const updateTask = useCallback(
    (taskId: string, updater: (task: Task) => Task) => {
      if (typeof window === "undefined") return;

      try {
        const existing = localStorage.getItem(TASKS_STORAGE_KEY);
        const allTasks: Task[] = existing ? JSON.parse(existing) : [];

        const updatedTasks = allTasks.map((task) =>
          task.id === taskId ? updater(task) : task
        );

        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
        toast.success("Task updated successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update task");
      }
    },
    []
  );

  return { updateTask };
}
