"use client";

import { useState } from "react";
import { useAddTask } from "@/hooks/useAddTask";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useToggleChecklist } from "@/hooks/useToggleChecklist";
import { useUpdateTaskStatus } from "@/hooks/useUpdateTaskStatus";
import { Task, TaskStatus } from "@/types/task";
import { useSearchParams } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import TaskCard from "@/components/custom/task-card";
import Column from "@/components/custom/column";

export default function Home() {
  const { tasks, refetch } = useGetTasks();
  const toggleChecklist = useToggleChecklist();
  const addTask = useAddTask();
  const { updateTaskStatus } = useUpdateTaskStatus();

  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "label";
  const query = searchParams.get("q")?.toLowerCase() || "";

  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId, setActiveId] = useState<string | null>(null);

  const statusOrder: TaskStatus[] = [
    "todo",
    "doing",
    "review",
    "done",
    "rework",
  ];

  // filter tasks
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
          return task.dueDate?.toLowerCase().includes(query);
        case "assignee":
          return task.assignee?.some((m) =>
            m.name.toLowerCase().includes(query)
          );
        default:
          return true;
      }
    });
  });

  // find task across statuses
  const findTaskById = (id?: string | null): Task | null => {
    if (!id) return null;

    for (const status of Object.keys(tasks) as Array<TaskStatus>) {
      const found = tasks[status]?.find((t) => t.id === id);
      if (found) return found;
    }

    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const taskId = String(active.id);
    const newStatus = over.id as TaskStatus;
    const currentTask = findTaskById(taskId);
    if (!currentTask) return;

    if (currentTask.status !== newStatus) {
      updateTaskStatus(taskId, newStatus);
      refetch();
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeTask = findTaskById(activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-wrap gap-6 container mx-auto p-4">
        {statusOrder.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={filteredTasks[status]}
            addTask={addTask}
            toggleChecklist={toggleChecklist}
            refetch={refetch}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && (
          <div style={{ width: "100%", maxWidth: 350 }}>
            <TaskCard
              task={activeTask}
              onToggleChecklist={() => {}}
              refetch={() => {}}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
