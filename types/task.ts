// types/task.ts

// Priority levels for tasks
export type TaskPriority = "low" | "medium" | "high";

// Label categories
export type TaskLabel = "feature" | "bug" | "issue" | "undefined";

// Checklist item (subtask)
export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

// Dummy attachments (only name/icon, no file upload needed)
export interface Attachment {
  id: string;
  filename: string;
  fileType: string; // e.g., "pdf", "png", "docx"
}

// Team member (for assignee)
export interface Member {
  id: string;
  name: string;
  avatarUrl?: string;
}

// Main Task type
export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: Member | null;
  dueDate: string; // ISO string (e.g., "2025-09-17")
  label: TaskLabel;
  priority?: TaskPriority;
  checklist: ChecklistItem[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

// Column (like To Do, Doing, Review, Done, Rework)
export interface Column {
  id: string;
  title: string;
  taskIds: string[]; // store task IDs for ordering
}

// Board (contains multiple columns)
export interface Board {
  id: string;
  title: string;
  columns: Column[];
  tasks: Record<string, Task>; // normalize tasks by ID
}
