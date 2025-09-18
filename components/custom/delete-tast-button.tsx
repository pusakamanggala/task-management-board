"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { Trash2 } from "lucide-react";

type DeleteTaskButtonProps = {
  taskId: string;
  refetch: () => void;
};

export default function DeleteTaskButton({
  taskId,
  refetch,
}: DeleteTaskButtonProps) {
  const [open, setOpen] = useState(false);
  const { deleteTask } = useDeleteTask();

  const handleDelete = () => {
    deleteTask(taskId);
    refetch();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-200 hover:bg-red-300 p-2! h-fit w-fit cursor-pointer">
          <Trash2 className="text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this task is permanent.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
