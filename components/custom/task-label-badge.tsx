"use client";

import { Badge } from "../ui/badge";
import { TaskLabel } from "@/types/task";

type Props = {
  label: TaskLabel;
  className?: string;
};

const LABEL_STYLES: Record<TaskLabel, { classes: string; text: string }> = {
  feature: {
    classes: "bg-blue-200 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    text: "Feature",
  },
  bug: {
    classes: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    text: "Bug",
  },
  issue: {
    classes:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    text: "Issue",
  },
  undefined: {
    classes: "bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300",
    text: "Undefined",
  },
};

export default function TaskLabelBadge({ label, className = "" }: Props) {
  const meta = LABEL_STYLES[label] || LABEL_STYLES["undefined"];

  return (
    <Badge
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${meta.classes} ${className}`}
    >
      {meta.text}
    </Badge>
  );
}
