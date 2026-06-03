import "./KanbanBoard.css";
import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "../taskCard/TaskCard";
import type { Task } from "../../../../types/TaskCard.Types";
import { KanbanColumn } from "./KanbanColumn";
import { SortableTaskCard } from "../taskCard/SortTableTaskCard";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleCompleteTask: (task: Task) => void;
  onAddTask: () => void;
  onMoveTask: (taskId: string, newColumnId: string) => void;
}

const COLUMN_IDS = ["todo", "in-progress", "done", "in-review"];

export const KanbanBoard = ({
  tasks,
  onTaskClick,
  onEditTask,
  onDeleteTask,
  onToggleCompleteTask,
  onAddTask,
  onMoveTask,
}: KanbanBoardProps) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const todo = tasks.filter((t) => t.columnId === "todo");
  const inProgress = tasks.filter((t) => t.columnId === "in-progress");
  const done = tasks.filter((t) => t.columnId === "done");
  const backlog = tasks.filter((t) => t.columnId === "in-review");

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    // over puede ser una columna o una task, resolvemos el columnId en ambos casos
    const targetColumnId = COLUMN_IDS.includes(overId)
      ? overId
      : tasks.find((t) => t.id === overId)?.columnId;

    if (targetColumnId) {
      onMoveTask(taskId, targetColumnId);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="kanban-board" aria-label="Kanban board" role="region">
        <div className="kanban-board__scroll-container">
          <KanbanColumn
            title="To Do"
            columnId="todo"
            count={todo.length}
            accent="slate"
            onAddTask={onAddTask}
          >
            <SortableContext
              items={todo.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {todo.map((task) => (
                <li key={task.id} className="kanban-column__list-item">
                  <SortableTaskCard
                    task={task}
                    onTaskClick={onTaskClick}
                    onEditTask={onEditTask}
                    onDeleteTask={onDeleteTask}
                    onToggleCompleteTask={onToggleCompleteTask}
                  />
                </li>
              ))}
            </SortableContext>
          </KanbanColumn>

          <KanbanColumn
            title="In Progress"
            columnId="in-progress"
            count={inProgress.length}
            accent="indigo"
            countVariant="active"
            onAddTask={onAddTask}
          >
            <SortableContext
              items={inProgress.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {inProgress.map((task) => (
                <li key={task.id} className="kanban-column__list-item">
                  <SortableTaskCard
                    task={task}
                    onTaskClick={onTaskClick}
                    onEditTask={onEditTask}
                    onDeleteTask={onDeleteTask}
                    onToggleCompleteTask={onToggleCompleteTask}
                  />
                </li>
              ))}
            </SortableContext>
          </KanbanColumn>

          <KanbanColumn
            title="Done"
            columnId="done"
            count={done.length}
            accent="emerald"
            countVariant="done"
          >
            <SortableContext
              items={done.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {done.map((task) => (
                <li key={task.id} className="kanban-column__list-item">
                  <SortableTaskCard
                    task={task}
                    onTaskClick={onTaskClick}
                    onEditTask={onEditTask}
                    onDeleteTask={onDeleteTask}
                    onToggleCompleteTask={onToggleCompleteTask}
                  />
                </li>
              ))}
            </SortableContext>
          </KanbanColumn>

          <KanbanColumn
            title="Backlog"
            columnId="in-review"
            count={backlog.length}
            accent="amber"
            onAddTask={onAddTask}
          >
            <SortableContext
              items={backlog.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {backlog.map((task) => (
                <li key={task.id} className="kanban-column__list-item">
                  <SortableTaskCard
                    task={task}
                    onTaskClick={onTaskClick}
                    onEditTask={onEditTask}
                    onDeleteTask={onDeleteTask}
                    onToggleCompleteTask={onToggleCompleteTask}
                  />
                </li>
              ))}
            </SortableContext>
          </KanbanColumn>
        </div>
      </div>

      {/* Card flotante que sigue al cursor mientras se arrastra */}
      <DragOverlay>
        {activeTask && <TaskCard {...activeTask} onClick={() => {}} />}
      </DragOverlay>
    </DndContext>
  );
};
