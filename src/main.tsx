import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TaskManagerApp } from "./TaskManagerApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskManagerApp />
  </StrictMode>,
);
