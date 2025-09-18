"use client";

import AddTaskModal from "@/components/custom/add-task-modal";
import { Task, TaskStatus } from "@/types/task";
import { useDroppable } from "@dnd-kit/core";
import DraggableItem from "./draggable-item";

export default function Column({
  status,
  tasks,
  addTask,
  toggleChecklist,
  refetch,
}: {
  status: TaskStatus;
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleChecklist: (taskId: string, itemId: string) => void;
  refetch: () => void;
}) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className="w-full md:max-w-[350px] space-y-3 min-h-[200px]"
    >
      <div className="flex gap-2 items-center">
        <h2 className="font-semibold text-xl">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </h2>
        <AddTaskModal
          taskStatus={status}
          handleAddTask={(task: Task) => {
            addTask(task);
            refetch();
          }}
        />
      </div>

      {tasks?.map((task) => (
        <DraggableItem
          key={task.id}
          task={task}
          onToggleChecklist={(itemId) => toggleChecklist(task.id, itemId)}
          refetch={refetch}
        />
      ))}
    </div>
  );
}
