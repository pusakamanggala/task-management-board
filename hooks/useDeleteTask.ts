"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { Task } from "@/types/task";
import { TASKS_STORAGE_KEY } from "@/constants/storage";

export function useDeleteTask() {
  const deleteTask = useCallback((taskId: string) => {
    if (typeof window === "undefined") return;

    try {
      const existing = localStorage.getItem(TASKS_STORAGE_KEY);
      const allTasks: Task[] = existing ? JSON.parse(existing) : [];

      const filteredTasks = allTasks.filter((task) => task.id !== taskId);

      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(filteredTasks));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  }, []);

  return { deleteTask };
}
