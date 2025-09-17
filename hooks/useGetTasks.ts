import { useState, useEffect, useCallback } from "react";
import { Task, TaskStatus } from "@/types/task";
import { TASKS_STORAGE_KEY } from "@/constants/storage";

export function useGetTasks() {
  const [tasks, setTasks] = useState<Record<TaskStatus, Task[]>>({
    todo: [],
    doing: [],
    review: [],
    done: [],
    rework: [],
  });

  const fetchTasks = useCallback(() => {
    if (typeof window === "undefined") return;

    const existing = localStorage.getItem(TASKS_STORAGE_KEY);
    const allTasks: Task[] = existing ? JSON.parse(existing) : [];

    const grouped: Record<TaskStatus, Task[]> = {
      todo: [],
      doing: [],
      review: [],
      done: [],
      rework: [],
    };

    allTasks.forEach((task) => grouped[task.status].push(task));

    setTasks(grouped); // triggers re-render
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, refetch: fetchTasks };
}
