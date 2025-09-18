"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types/task";
import { Clock3Icon, Grip, SquareCheckBig } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import TaskLabelBadge from "./task-label-badge";
import MemberStack from "./member-stack";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import EditTaskModal from "./edit-task-modal";
import DeleteTaskButton from "./delete-tast-button";
import { format, isBefore, startOfDay } from "date-fns";

export default function TaskCard({
  task,
  onToggleChecklist,
  refetch,
}: {
  task: Task;
  onToggleChecklist: (itemId: string) => void;
  refetch: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="border p-3 rounded-xl bg-blue-100 space-y-2 shadow-xs w-full mb-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <TaskLabelBadge label={task.label} />
        <div className="flex items-center space-x-1">
          <EditTaskModal task={task} refetch={refetch} />
          <DeleteTaskButton taskId={task.id} refetch={refetch} />
          {/* Drag handle */}
          <button
            {...listeners}
            className="cursor-grab p-1 rounded hover:bg-slate-200"
            aria-label="Drag task"
          >
            <Grip size={17} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <Progress
        value={
          task.checklist.length === 0
            ? 0
            : (task.checklist.filter((i) => i.completed).length /
                task.checklist.length) *
              100
        }
      />

      {/* Title & description */}
      <div className="py-2">
        <h3 className="text-sm font-medium">{task.title}</h3>
        <p className="text-sm text-slate-600">{task.description}</p>
      </div>

      {/* Checklist */}
      <div className="space-y-1 mb-4">
        {task.checklist.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <Checkbox
              id={item.id}
              checked={item.completed}
              onCheckedChange={() => {
                onToggleChecklist(item.id);
                refetch();
              }}
              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-none border-slate-500"
            />
            <Label
              htmlFor={item.id}
              className={`${
                item.completed
                  ? "line-through text-slate-400"
                  : "text-slate-700"
              } font-normal`}
            >
              {item.title}
            </Label>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-row justify-between w-full">
        <div className="flex gap-2">
          <Badge
            className={`text-xs ${
              task.dueDate &&
              isBefore(new Date(task.dueDate), startOfDay(new Date()))
                ? "bg-red-300/50 text-red-800"
                : "bg-teal-300/50 text-teal-800"
            }`}
          >
            <Clock3Icon className="mr-1 h-3 w-3" />
            <span>
              {task.dueDate
                ? format(new Date(task.dueDate), "dd MMM")
                : "No due date"}
            </span>
          </Badge>

          <div className="flex gap-1 text-xs text-slate-600 items-center">
            <SquareCheckBig size={16} className="stroke-[1px]" />{" "}
            {task.checklist.filter((i) => i.completed).length}/
            {task.checklist.length}
          </div>
        </div>

        <MemberStack members={task.assignee || []} />
      </div>
    </div>
  );
}
