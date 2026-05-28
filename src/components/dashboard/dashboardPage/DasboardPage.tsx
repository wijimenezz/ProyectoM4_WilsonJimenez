import "./DasboardPage.css";
import { useState } from "react";
import { KanbanBoard } from "../board/kanbanBoard/KanbanBoard";
import { BoardHeader } from "../boardHeader/BoardHeader";
import { TopNavigation } from "../topNavigation/TopNavigation";

import type { Task } from "../board/taskCard/TaskCard.Types";
import { INITIAL_TASKS } from "../../../data/InitialTasks";
import type { TaskFormData } from "../../taskForm/TypesTaskForm";
import TaskFormModal from "../../taskForm/TaskFormModal";

export const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [showModal, setShowModal] = useState(false);

  const handleCreateTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      badge: { label: "Task", color: data.color },
      deadline: data.deadline || undefined,
      progress: 0,
      assignees: [],
      columnId: "todo",
    };
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="dashboard">
      <TopNavigation />
      <main className="dashboard__main" aria-label="Project Board">
        <BoardHeader onNewTask={() => setShowModal(true)} />

        <KanbanBoard tasks={tasks} />
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
