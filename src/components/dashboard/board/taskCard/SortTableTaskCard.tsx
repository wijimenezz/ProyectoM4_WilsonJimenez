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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
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
