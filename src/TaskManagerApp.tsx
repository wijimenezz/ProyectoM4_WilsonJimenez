import { RouterProvider } from "react-router-dom";
import { router } from "./router/app.Router";

export const TaskManagerApp = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
