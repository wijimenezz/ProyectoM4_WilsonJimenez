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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  console.log("SELECTED TASK", selectedTask);

  const handleCreateTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,

      badge: {
        label: "Task",
        color: data.color,
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
  const openTask = (task: Task) => {
    console.log("TASK CLICKED:", task);

    setSelectedTask(task);
  };

  return (
    <div className="dashboard">
      <TopNavigation />
      <main className="dashboard__main" aria-label="Project Board">
        <BoardHeader onNewTask={() => setShowModal(true)} />

        <KanbanBoard tasks={tasks} onTaskClick={openTask} />
        {selectedTask && (
          <div
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              background: "white",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              zIndex: 9999,
            }}
          >
            <h3>{selectedTask.title}</h3>

            <p>{selectedTask.description}</p>

            <button onClick={() => setSelectedTask(null)}>Close</button>
          </div>
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
