"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { taskFormSchema, TaskFormValues } from "@/lib/schemas/taskFormSchema";
import { Task, TaskLabel, TaskPriority } from "@/types/task";
import { nanoid } from "nanoid";
import { Eye, Trash2 } from "lucide-react";
import { members } from "@/data/members";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useUpdateTask } from "@/hooks/useUpdateTask";

interface EditTaskModalProps {
  task: Task;
  refetch: () => void;
}

const priorities: TaskPriority[] = ["low", "medium", "high"];
const labels: TaskLabel[] = ["feature", "bug", "issue", "undefined"];

export default function EditTaskModal({ task, refetch }: EditTaskModalProps) {
  const [open, setOpen] = useState(false);
  const { updateTask } = useUpdateTask();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      dueDate: task.dueDate,
      label: task.label,
      priority: task.priority,
      checklist: task.checklist || [],
      attachment: task.attachment || null,
    },
  });

  const {
    fields: checklistFields,
    append: appendChecklist,
    remove: removeChecklist,
  } = useFieldArray({ control: form.control, name: "checklist" });

  const onSubmit = (values: TaskFormValues) => {
    updateTask(task.id, (prevTask) => ({
      ...prevTask,
      ...values,
      updatedAt: new Date().toISOString(),
    }));
    refetch();
    setOpen(false);
  };

  // Sync form if task changes
  useEffect(() => {
    form.reset({
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      dueDate: task.dueDate,
      label: task.label,
      priority: task.priority,
      checklist: task.checklist || [],
      attachment: task.attachment || null,
    });
  }, [task, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-200 hover:bg-blue-300 p-2 h-fit w-fit cursor-pointer">
          <Eye className="text-blue-500" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Task title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Task description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              {/* Label */}
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {labels.map((label) => (
                          <SelectItem key={label} value={label}>
                            {label.charAt(0).toUpperCase() + label.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priority */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority.charAt(0).toUpperCase() +
                              priority.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Assignees */}
            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignees</FormLabel>
                  <FormControl>
                    <MultiSelect
                      values={field.value?.map((m) => m.id) || []}
                      onValuesChange={(ids) => {
                        const selectedMembers = members.filter((m) =>
                          ids.includes(m.id)
                        );
                        field.onChange(
                          selectedMembers.length > 0 ? selectedMembers : null
                        );
                      }}
                    >
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder="Select members..." />
                      </MultiSelectTrigger>
                      <MultiSelectContent>
                        <MultiSelectGroup>
                          {members.map((member) => (
                            <MultiSelectItem key={member.id} value={member.id}>
                              <span className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage
                                    src={member.avatarUrl || ""}
                                    alt={member.name}
                                  />
                                </Avatar>
                                {member.name}
                              </span>
                            </MultiSelectItem>
                          ))}
                        </MultiSelectGroup>
                      </MultiSelectContent>
                    </MultiSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Checklist */}
            <div className="space-y-2">
              <FormLabel>Checklist</FormLabel>
              {checklistFields.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`checklist.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder="Subtask title" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeChecklist(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendChecklist({ id: nanoid(), title: "", completed: false })
                }
              >
                Add Subtask
              </Button>
            </div>

            {/* Attachment */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="attachment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attachment</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return field.onChange(null);
                          field.onChange({
                            id: nanoid(),
                            filename: file.name,
                            fileType: file.type,
                          });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("attachment") && (
                <p className="text-sm text-muted-foreground mt-1">
                  Selected: {form.watch("attachment")?.filename} (
                  {form.watch("attachment")?.fileType})
                </p>
              )}
            </div>

            <div className="ml-auto w-fit space-x-1">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="cursor-pointer"
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" className="cursor-pointer">
                Update Task
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
