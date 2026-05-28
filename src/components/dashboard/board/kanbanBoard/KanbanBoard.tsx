// ======= ASÍ DEBE QUEDAR EL ARCHIVO COMPLETO =======

import "./KanbanBoard.css";
import { TaskCard } from "../taskCard/TaskCard";
import type { Task } from "../taskCard/TaskCard.Types";
import { KanbanColumn } from "./KanbanColumn";

// ======= NUEVO: recibe tasks como prop =======
interface KanbanBoardProps {
  tasks: Task[];
}

export const KanbanBoard = ({ tasks }: KanbanBoardProps) => {
  // ======= NUEVO: filtra las tareas por columna =======
  const todo = tasks.filter((t) => t.columnId === "todo");
  const inProgress = tasks.filter((t) => t.columnId === "in-progress");
  const done = tasks.filter((t) => t.columnId === "done");
  const backlog = tasks.filter((t) => t.columnId === "backlog");
  // ======= FIN NUEVO =======

  return (
    <div className="kanban-board" aria-label="Kanban board" role="region">
      <div className="kanban-board__scroll-container">
        {/* count={todo.length} ← ya no es hardcodeado, se calcula solo */}
        <KanbanColumn title="To Do" count={todo.length} accent="slate">
          {/* ======= NUEVO: renderiza dinámico en lugar de hardcodeado ======= */}
          {todo.map((task) => (
            <li key={task.id} className="kanban-column__list-item">
              <TaskCard {...task} />
            </li>
          ))}
          {/* ======= FIN NUEVO ======= */}
        </KanbanColumn>

        <KanbanColumn
          title="In Progress"
          count={inProgress.length}
          accent="indigo"
          countVariant="active"
        >
          {inProgress.map((task) => (
            <li key={task.id} className="kanban-column__list-item">
              <TaskCard {...task} />
            </li>
          ))}
        </KanbanColumn>

        <KanbanColumn
          title="Done"
          count={done.length}
          accent="emerald"
          countVariant="done"
        >
          {done.map((task) => (
            <li key={task.id} className="kanban-column__list-item">
              <TaskCard {...task} done />
            </li>
          ))}
        </KanbanColumn>

        <KanbanColumn title="Backlog" count={backlog.length} accent="amber">
          {backlog.map((task) => (
            <li key={task.id} className="kanban-column__list-item">
              <TaskCard {...task} />
            </li>
          ))}
        </KanbanColumn>
      </div>
    </div>
  );
};
// ======= FIN ARCHIVO =======
