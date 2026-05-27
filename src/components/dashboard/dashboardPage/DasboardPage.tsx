import { useState } from "react";
import { KanbanBoard } from "../board/kanbanBoard/KanbanBoard";
import { BoardHeader } from "../boardHeader/BoardHeader";
import { TopNavigation } from "../topNavigation/TopNavigation";
import "./DasboardPage.css";
import TaskFormModal from "../../taskForm/TaskFormModal";

export const DashboardPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dashboard">
      <TopNavigation />
      <main className="dashboard__main" aria-label="Project Board">
        <BoardHeader onNewTask={() => setShowModal(true)} />
        <KanbanBoard />
      </main>

      {showModal && (
        <TaskFormModal
          onClose={() => setShowModal(false)}
          onSubmit={(data) => {
            console.log("nueva tarea:", data);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};
