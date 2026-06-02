// src/features/dashboard/dashboardPage/DashboardPage.tsx
import "./DasboardPage.css";
import { useState } from "react";
import { KanbanBoard } from "../board/kanbanBoard/KanbanBoard";
import { BoardHeader } from "../boardHeader/BoardHeader";
import { TopNavigation } from "../topNavigation/TopNavigation";
import TaskFormModal from "../../taskForm/TaskFormModal";
import ChecklistModal from "../../taskForm/CheckListModal";

// Un solo import — ya no existe TypesTaskForm
import type {
  Task,
  TaskFormData,
  ChecklistItem,
} from "../../../types/TaskCard.Types";
import { INITIAL_TASKS } from "../../../data/InitialTasks";

export const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);

  // --- Crear tarea desde el formulario ---
  const handleCreateTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,

      badge: {
        label: data.colorLabel, // antes era "Task" hardcodeado
        color: data.color, // BadgeColor correcto
      },

      deadline: data.deadline || undefined,
      progress: 0,
      assignees: [],
      checklist: data.checklist,
      attachments: data.attachments,
      columnId: "todo",
    };

    setTasks((prev) => [...prev, newTask]);
  };

  // --- Abrir tarea para editar checklist ---
  const openTask = (task: Task) => {
    setSelectedTask(task);
  };

  // --- Guardar checklist editado y recalcular progreso ---
  const handleSaveChecklist = (updatedChecklist: ChecklistItem[]) => {
    if (!selectedTask) return;

    const progress =
      updatedChecklist.length > 0
        ? Math.round(
            (updatedChecklist.filter((i) => i.done).length /
              updatedChecklist.length) *
              100,
          )
        : 0;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedTask.id
          ? { ...task, checklist: updatedChecklist, progress }
          : task,
      ),
    );

    setSelectedTask(null);
  };

  return (
    <div className="dashboard">
      <TopNavigation />

      <main className="dashboard__main" aria-label="Project Board">
        <BoardHeader onNewTask={() => setShowModal(true)} />

        <KanbanBoard tasks={tasks} onTaskClick={openTask} />

        {selectedTask && (
          <ChecklistModal
            title={selectedTask.title}
            description={selectedTask.description}
            checklist={selectedTask.checklist}
            onClose={() => setSelectedTask(null)}
            onSave={handleSaveChecklist}
          />
        )}
      </main>

      {showModal && (
        <TaskFormModal
          onClose={() => setShowModal(false)}
          onSubmit={(data) => {
            handleCreateTask(data);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};
