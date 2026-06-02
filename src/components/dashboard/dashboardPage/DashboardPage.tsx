// src/features/dashboard/dashboardPage/DashboardPage.tsx
import "./DasboardPage.css";
import { useMemo, useState } from "react";
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
  const {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    updateChecklist,
  } = useTasks(user!.uid);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const openCreateModal = () => {
    setTaskToEdit(null);
    setShowTaskModal(true);
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setShowTaskModal(true);
  };

  const handleSendEmails = async () => {
    if (!user?.email) {
      alert("No user email available to send notifications.");
      return;
    }

    const taskSummary = tasks
      .map((task) => {
        const status = task.done
          ? "Completada"
          : task.columnId === "in-progress"
          ? "En progreso"
          : "Por hacer";
        const deadline = task.deadline
          ? `Fecha límite: ${task.deadline}`
          : "Sin fecha límite";
        return `- ${task.title} (${status}) — ${deadline}`;
      })
      .join("\n");

    const summary = `Resumen de tareas (${tasks.length}):\n\n${taskSummary}`;

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: user.email,
          summary,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || "Error sending email");
      }

      alert("Email enviado correctamente a " + user.email);
    } catch (error: any) {
      console.error("Email send failed", error);
      alert(
        "No se pudo enviar el email. Revise la consola o la configuración del servidor.",
      );
    }
  };

  // --- Notifications: tasks due within threshold or overdue ---
  const NOTIF_THRESHOLD_DAYS = 1; // 1 day to deadline

  const parseLocalDateYMD = (ymd?: string) => {
    if (!ymd) return null;
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const notifications = useMemo(() => {
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    return tasks
      .filter((t) => t.deadline && !t.done)
      .map((t) => {
        const deadlineDate = parseLocalDateYMD(t.deadline);
        if (!deadlineDate) return null;
        const diffDays = Math.ceil(
          (deadlineDate.getTime() - todayStart.getTime()) / (1000 * 60 * 60 * 24),
        );
        return {
          id: t.id,
          title: t.title,
          deadline: t.deadline!,
          daysLeft: diffDays,
          overdue: diffDays < 0,
        };
      })
      .filter(Boolean)
      .filter((n) => n!.overdue || n!.daysLeft <= NOTIF_THRESHOLD_DAYS)
      .sort((a, b) => (a!.daysLeft - b!.daysLeft)) as Array<{
      id: string;
      title: string;
      deadline: string;
      daysLeft: number;
      overdue: boolean;
    }>;
  }, [tasks]);

  const handleSaveTask = async (data: TaskFormData) => {
    const progress =
      data.checklist.length > 0
        ? Math.round(
            (data.checklist.filter((item) => item.done).length /
              data.checklist.length) *
              100,
          )
        : 0;

    const isComplete =
      data.checklist.length > 0 &&
      data.checklist.filter((item) => item.done).length ===
        data.checklist.length;

    const columnId = isComplete
      ? "done"
      : progress > 0
        ? "in-progress"
        : "todo";

    if (!taskToEdit) {
      await addTask({
        title: data.title,
        description: data.description,
        badge: {
          label: data.colorLabel,
          color: data.color,
        },
        deadline: data.deadline || undefined,
        progress,
        assignees: [],
        checklist: data.checklist,
        attachments: data.attachments,
        columnId,
        done: isComplete,
      });
      return;
    }

    await editTask(taskToEdit.id, {
      title: data.title,
      description: data.description,
      badge: {
        label: data.colorLabel,
        color: data.color,
      },
      deadline: data.deadline || undefined,
      attachments: data.attachments,
      checklist: data.checklist,
      progress,
      columnId,
      done: isComplete,
    });
    setTaskToEdit(null);
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
    if (taskToEdit?.id === taskId) {
      setTaskToEdit(null);
      setShowTaskModal(false);
    }
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const handleToggleCompleteTask = async (task: Task) => {
    await editTask(task.id, {
      done: !task.done,
      columnId: task.done ? "todo" : "done",
    });
  };

  if (loading) {
    return (
      <div className="dashboard">
        <TopNavigation
          notifications={notifications}
          onNotificationClick={(taskId: string) => {
            const t = tasks.find((x) => x.id === taskId);
            if (t) setSelectedTask(t);
          }}
        />
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
      <TopNavigation
        notifications={notifications}
        onNotificationClick={(taskId: string) => {
          const t = tasks.find((x) => x.id === taskId);
          if (t) setSelectedTask(t);
        }}
      />

      <main className="dashboard__main" aria-label="Project Board">
        <BoardHeader
          onNewTask={openCreateModal}
          onSendEmails={handleSendEmails}
        />

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

        <KanbanBoard
          tasks={tasks}
          onTaskClick={setSelectedTask}
          onEditTask={openEditModal}
          onDeleteTask={handleDeleteTask}
          onToggleCompleteTask={handleToggleCompleteTask}
        />

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

      {showTaskModal && (
        <TaskFormModal
          task={taskToEdit ?? undefined}
          title={taskToEdit ? "Editar tarea" : "Create New Task"}
          submitLabel={taskToEdit ? "Guardar cambios" : "Create Task"}
          onClose={() => {
            setShowTaskModal(false);
            setTaskToEdit(null);
          }}
          onSubmit={async (data) => {
            await handleSaveTask(data);
            setShowTaskModal(false);
          }}
        />
      )}
    </div>
  );
};
