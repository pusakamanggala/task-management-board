import * as z from "zod";
import { TaskLabel, TaskPriority, TaskStatus } from "@/types/task";

export const checklistItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Subtask title is required"),
  completed: z.boolean(),
});

export const attachmentSchema = z.object({
  id: z.string(),
  filename: z.string().min(1, "Filename is required"),
  fileType: z.string().min(1, "File type is required"),
});

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  assignee: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        avatarUrl: z.string().optional(),
      })
    )
    .nullable(),
  dueDate: z.string().min(1, "Due date is required"),
  label: z.enum(["feature", "bug", "issue", "undefined"] as [
    TaskLabel,
    ...TaskLabel[]
  ]),
  status: z.enum(["todo", "doing", "review", "done", "rework"] as [
    TaskStatus,
    ...TaskStatus[]
  ]),
  priority: z
    .enum(["low", "medium", "high"] as [TaskPriority, ...TaskPriority[]])
    .optional(),
  checklist: z.array(checklistItemSchema),
  attachment: attachmentSchema.nullable().optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
