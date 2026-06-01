import "./DasboardPage.css";
import { useState } from "react";
import { KanbanBoard } from "../board/kanbanBoard/KanbanBoard";
import { BoardHeader } from "../boardHeader/BoardHeader";
import { TopNavigation } from "../topNavigation/TopNavigation";

import type { Task } from "../board/taskCard/TaskCard.Types";
import { INITIAL_TASKS } from "../../../data/InitialTasks";
import type { ChecklistItem, TaskFormData } from "../../taskForm/TypesTaskForm";
import TaskFormModal from "../../taskForm/TaskFormModal";
import ChecklistModal from "../../taskForm/CheckListModal";

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

    const updatedTask: Task = {
      ...selectedTask,
      checklist: updatedChecklist,
      progress,
    };

    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
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
