import { KanbanBoard } from "../board/kanbanBoard/KanbanBoard";
import { BoardHeader } from "../boardHeader/BoardHeader";
import { TopNavigation } from "../topNavigation/TopNavigation";
import "./DasboardPage.css";

export const DashboardPage = () => (
  <div className="dashboard">
    <TopNavigation />
    <main className="dashboard__main" aria-label="Project Board">
      <BoardHeader />
      <KanbanBoard />
    </main>
  </div>
);
