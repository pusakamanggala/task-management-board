export type TaskFilter = "assignee" | "label" | "dueDate";

// labels
export const FILTER_LABELS: Record<TaskFilter, string> = {
  assignee: "Assignee",
  label: "Label",
  dueDate: "Due Date",
};
