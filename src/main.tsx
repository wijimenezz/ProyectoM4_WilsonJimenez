import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TaskManagerApp } from "./TaskManagerApp";
import { Authenticator } from "./features/auth/Authenticator";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Authenticator>
      <TaskManagerApp />
    </Authenticator>
  </StrictMode>,
);
