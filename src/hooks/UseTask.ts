// src/features/tasks/hooks/useTasks.ts

import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  subscribeTasks,
  updateTask,
} from "../services/TaskService";
import type { ChecklistItem, ColumnId, Task } from "../types/TaskCard.Types";

export function useTasks(uid: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Escucha cambios en tiempo real
  useEffect(() => {
    if (!uid) return;

    const unsub = subscribeTasks(uid, (data) => {
      setTasks(data);
      setLoading(false);
    });

    return unsub; // limpia el listener al desmontar
  }, [uid]);

  // CREATE
  const addTask = async (
    task: Omit<Task, "id" | "createdAt" | "updatedAt">,
  ) => {
    try {
      await createTask(uid, task);
    } catch (e) {
      setError("Error al crear la tarea");
      console.error(e);
    }
  };

  // UPDATE
  const editTask = async (
    taskId: string,
    changes: Partial<Omit<Task, "id" | "createdAt" | "updateAt">>,
  ) => {
    try {
      await updateTask(uid, taskId, changes);
    } catch (e) {
      setError("Error al actualizar la tarea");
      console.error(e);
    }
  };

  // DELETE
  const removeTask = async (taskId: string) => {
    try {
      await deleteTask(uid, taskId);
    } catch (e) {
      setError("Error al eliminar la tarea");
      console.error(e);
    }
  };

  // Mover entre columnas
  const moveTask = (taskId: string, columnId: ColumnId) =>
    editTask(taskId, { columnId });

  // Actualizar checklist y recalcular progreso
  const updateChecklist = (taskId: string, checklist: ChecklistItem[]) => {
    const progress =
      checklist.length > 0
        ? Math.round(
            (checklist.filter((i) => i.done).length / checklist.length) * 100,
          )
        : 0;
    return editTask(taskId, { checklist, progress });
  };

  // Tareas agrupadas por columna — listas para el board
  const tasksByColumn = tasks.reduce<Record<ColumnId, Task[]>>(
    (acc, task) => {
      acc[task.columnId].push(task);
      return acc;
    },
    { todo: [], "in-progress": [], "in-review": [], done: [] },
  );

  return {
    tasks,
    tasksByColumn,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    moveTask,
    updateChecklist,
  };
}
