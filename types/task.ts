// Priority levels for tasks
export type TaskPriority = "low" | "medium" | "high";

// Label categories
export type TaskLabel = "feature" | "bug" | "issue" | "undefined";

export type TaskStatus = "todo" | "doing" | "review" | "Done" | "Rework";

// Checklist item (subtask)
export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

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
  assignee: Member[] | null;
  dueDate: string; // ISO string (e.g., "2025-09-17")
  label: TaskLabel;
  priority?: TaskPriority;
  checklist: ChecklistItem[];
  attachment?: Attachment | null | undefined;
  createdAt: string;
  updatedAt: string;
  status: TaskStatus;
}
