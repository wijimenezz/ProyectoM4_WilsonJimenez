// src/features/dashboard/dashboardPage/DashboardPage.tsx
import "./DasboardPage.css";
import { useState } from "react";
import { KanbanBoard } from "../board/kanbanBoard/KanbanBoard";
import { BoardHeader } from "../boardHeader/BoardHeader";
import { TopNavigation } from "../topNavigation/TopNavigation";
import TaskFormModal from "../../taskForm/TaskFormModal";
import ChecklistModal from "../../taskForm/CheckListModal";

import type {
  Task,
  TaskFormData,
  ChecklistItem,
} from "../../../types/TaskCard.Types";
import { useAuth } from "../../../features/auth/Authenticator";
import { useTasks } from "../../../hooks/UseTask";

export const DashboardPage = () => {
  const { user } = useAuth();
  const { tasks, loading, error, addTask, removeTask, updateChecklist } =
    useTasks(user!.uid);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);

  // CREATE — construye la Task y la manda a Firestore
  const handleCreateTask = async (data: TaskFormData) => {
    await addTask({
      title: data.title,
      description: data.description,
      badge: {
        label: data.colorLabel,
        color: data.color,
      },
      deadline: data.deadline || undefined,
      progress: 0,
      assignees: [],
      checklist: data.checklist,
      attachments: data.attachments,
      columnId: "todo",
    });
  };

  // UPDATE checklist + progreso
  const handleSaveChecklist = async (updatedChecklist: ChecklistItem[]) => {
    if (!selectedTask) return;
    await updateChecklist(selectedTask.id, updatedChecklist);
    setSelectedTask(null);
  };

  // DELETE
  const handleDeleteTask = async (taskId: string) => {
    await removeTask(taskId);
  };

  if (loading) {
    return (
      <div className="dashboard">
        <TopNavigation />
        <main className="dashboard__main">
          <p
            style={{
              padding: "var(--space-8)",
              color: "var(--color-text-muted)",
            }}
          >
            Loading tasks...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <TopNavigation />

      <main className="dashboard__main" aria-label="Project Board">
        <BoardHeader onNewTask={() => setShowModal(true)} />

        {error && (
          <p
            style={{
              color: "var(--color-danger)",
              padding: "0 var(--space-6)",
            }}
          >
            {error}
          </p>
        )}

        <KanbanBoard tasks={tasks} onTaskClick={setSelectedTask} />

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
          onSubmit={async (data) => {
            await handleCreateTask(data);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};
