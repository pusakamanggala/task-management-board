"use client";

import { Clock3Icon, SquareCheckBig } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import TaskLabelBadge from "./task-label-badge";
import MemberStack from "./member-stack";
import { Task } from "@/types/task";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import EditTaskModal from "./edit-task-modal";
import DeleteTaskButton from "./delete-tast-button";

export default function TaskCard({
  task,
  onToggleChecklist,
  refetch,
}: {
  task: Task;
  onToggleChecklist: (itemId: string) => void;
  refetch: () => void;
}) {
  return (
    <div className="border p-3 rounded-xl bg-blue-100 space-y-2 shadow-xs w-full mb-4">
      {/* cover image */}
      {/* <div className="w-full h-[230px] relative mb-4">
        <Image
          src="https://placehold.co/600x400/png"
          alt="cover-image"
          className="w-full h-full object-cover rounded-t-md"
          fill
          sizes="30px"
        />
      </div> */}

      <div className="flex items-center justify-between">
        <TaskLabelBadge label={task.label} />
        <div className="space-x-1">
          <EditTaskModal task={task} refetch={refetch} />

          <DeleteTaskButton taskId={task.id} refetch={refetch} />
        </div>
      </div>

      <Progress
        value={
          task.checklist.length === 0
            ? 0
            : (task.checklist.filter((item) => item.completed).length /
                task.checklist.length) *
              100
        }
      />

      {/* desc */}
      <p className="text-sm text-slate-600 py-1">{task.description}</p>

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

      <div className="flex flex-row justify-between w-full">
        <div className="flex gap-2">
          {/* deadline */}
          <Badge className="bg-teal-300/50 text-xs text-teal-800">
            <Clock3Icon />
            <span>8 Aug</span>
          </Badge>

          {/* task list count */}
          <div className="flex gap-1 text-xs text-slate-600 items-center">
            <SquareCheckBig size={16} className="stroke-[1px]" />{" "}
            {task.checklist.filter((item) => item.completed).length}/
            {task.checklist.length}
          </div>
        </div>

        <MemberStack members={task.assignee || []} />
      </div>
    </div>
  );
}
