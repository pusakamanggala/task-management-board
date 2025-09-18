"use client";

import { useCallback } from "react";
import { Task, TaskStatus } from "@/types/task";
import { TASKS_STORAGE_KEY } from "@/constants/storage";
import { toast } from "sonner";

export function useUpdateTaskStatus() {
  const updateTaskStatus = useCallback(
    (taskId: string, newStatus: TaskStatus) => {
      if (typeof window === "undefined") return;

      const existing = localStorage.getItem(TASKS_STORAGE_KEY);
      const allTasks: Task[] = existing ? JSON.parse(existing) : [];

      const updatedTasks = allTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );

      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
      toast.success("Task status updated!");
    },
    []
  );

  return { updateTaskStatus };
}
