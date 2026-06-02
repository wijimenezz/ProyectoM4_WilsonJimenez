// src/services/task.service.ts
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Task } from "../types/TaskCard.Types";

// Referencia a la subcolección de tareas del usuario
const tasksRef = (uid: string) => collection(db, "users", uid, "tasks");

export async function createTask(
  uid: string,
  task: Omit<Task, "id" | "createdAt" | "updatedAt">,
) {
  const ref = await addDoc(tasksRef(uid), {
    ...task,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return ref.id;
}

export async function updateTask(
  uid: string,
  taskId: string,
  changes: Partial<Omit<Task, "id" | "createdAt" | "updateAt">>,
) {
  const ref = doc(db, "users", uid, "tasks", taskId);

  await updateDoc(ref, {
    ...changes,
    updatedAt: serverTimestamp(),
  });
}
export async function deleteTask(uid: string, taskId: string) {
  const ref = doc(db, "users", uid, "tasks", taskId);
  await deleteDoc(ref);
}

// Escucha en tiempo real — devuelve la función para desuscribirse
export function subscribeTasks(uid: string, onChange: (tasks: Task[]) => void) {
  const q = query(tasksRef(uid), orderBy("createdAt", "asc"));

  return onSnapshot(q, (snapshot) => {
    const tasks: Task[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Task, "id">),
    }));
    onChange(tasks);
  });
}
