"use client";

import AddTaskModal from "@/components/custom/add-task-modal";
import TaskCard from "@/components/custom/task-card";
import { useAddTask } from "@/hooks/useAddTask";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useToggleChecklist } from "@/hooks/useToggleChecklist";
import { TaskStatus } from "@/types/task";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const { tasks, refetch } = useGetTasks();
  const toggleChecklist = useToggleChecklist();
  const addTask = useAddTask();

  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "label";
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Filter tasks based on query
  const filteredTasks: typeof tasks = { ...tasks };

  Object.keys(filteredTasks).forEach((status) => {
    filteredTasks[status as TaskStatus] = filteredTasks[
      status as TaskStatus
    ].filter((task) => {
      if (!filter || !query) return true;

      switch (filter) {
        case "label":
          return (
            task.label.toLowerCase().includes(query) ||
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query)
          );
        case "dueDate":
          return task.dueDate.toLowerCase().includes(query);
        case "assignee":
          return task.assignee?.some((member) =>
            member.name.toLowerCase().includes(query)
          );
        default:
          return true;
      }
    });
  });

  const statusOrder: TaskStatus[] = [
    "todo",
    "doing",
    "review",
    "done",
    "rework",
  ];

  return (
    <div className="flex flex-wrap gap-6 container mx-auto p-4">
      {statusOrder.map((status) => (
        <div key={status} className="w-full md:max-w-[350px] space-y-3">
          <div className="flex gap-2 items-center">
            <h2 className="font-semibold text-xl">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </h2>
            <AddTaskModal
              taskStatus={status}
              handleAddTask={(task) => {
                addTask(task);
                refetch();
              }}
            />
          </div>
          {filteredTasks[status]?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleChecklist={(itemId) => toggleChecklist(task.id, itemId)}
              refetch={refetch}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
