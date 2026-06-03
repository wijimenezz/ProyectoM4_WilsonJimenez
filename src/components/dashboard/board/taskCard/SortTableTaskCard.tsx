import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard } from "./TaskCard";
import type { Task } from "../../../../types/TaskCard.Types";

interface SortableTaskCardProps {
  task: Task;
  onTaskClick: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleCompleteTask: (task: Task) => void;
}

export const SortableTaskCard = ({
  task,
  onTaskClick,
  onEditTask,
  onDeleteTask,
  onToggleCompleteTask,
}: SortableTaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: isDragging
      ? "box-shadow 0.2s ease"
      : "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease",
    opacity: isDragging ? 0.45 : 1,
    boxShadow: isDragging
      ? "0 16px 40px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.12)"
      : undefined,
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging ? 999 : undefined,
    scale: isDragging ? "1.02" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard
        {...task}
        onClick={() => onTaskClick(task)}
        onEditTask={() => onEditTask(task)}
        onDeleteTask={() => onDeleteTask(task.id)}
        onToggleCompleteTask={() => onToggleCompleteTask(task)}
      />
    </div>
  );
};
