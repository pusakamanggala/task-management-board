"use client";

import { Task } from "@/types/task";
import TaskCard from "@/components/custom/task-card";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function DraggableItem({
  task,
  onToggleChecklist,
  refetch,
}: {
  task: Task;
  onToggleChecklist: (itemId: string) => void;
  refetch: () => void;
}) {
  const { attributes, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform) || undefined,
    willChange: "transform",
    visibility: isDragging ? "hidden" : "visible",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* pass drag handle explicitly */}
      <TaskCard
        task={task}
        onToggleChecklist={onToggleChecklist}
        refetch={refetch}
      />
    </div>
  );
}
