"use client";

import { Task, ChecklistItem } from "@/types/task";
import { TASKS_STORAGE_KEY } from "@/constants/storage";

export function useToggleChecklist() {
  return (taskId: string, checklistId: string) => {
    const existing = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!existing) return;

    const tasks: Task[] = JSON.parse(existing);

    const updatedTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;

      const updatedChecklist = task.checklist.map((item: ChecklistItem) => {
        if (item.id !== checklistId) return item;
        return { ...item, completed: !item.completed };
      });

      return { ...task, checklist: updatedChecklist };
    });

    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
  };
}
