import type { Task } from "../../components/tasks/types";

export type RoutineItem = Task;

export const initialRoutineItems: RoutineItem[] = [
  {
    id: 1,
    title: "Academia",
    time: "07:00",
    category: "Diário",
    categoryColor: "#f4a8b5",
    dotColor: "#f4a8b5",
    completed: true,
  },
  {
    id: 2,
    title: "Ler 30 minutos",
    time: "",
    category: "Diário",
    categoryColor: "#82c9a0",
    dotColor: "#82c9a0",
    completed: false,
  },
  {
    id: 3,
    title: "Meditação",
    time: "06:30",
    category: "Diário",
    categoryColor: "#f4a8b5",
    dotColor: "#f4a8b5",
    completed: true,
  },
  {
    id: 4,
    title: "Reunião de planejamento",
    time: "09:00",
    category: "Semanal",
    categoryColor: "#e87878",
    dotColor: "#e87878",
    completed: false,
  },
  {
    id: 5,
    title: "Pagar conta de luz",
    time: "",
    category: "Mensal",
    categoryColor: "#c4a8d9",
    dotColor: "#c4a8d9",
    completed: false,
  },
];

export const toggleRoutineCompleted = (items: RoutineItem[], id: number) =>
  items.map((item) =>
    item.id === id ? { ...item, completed: !item.completed } : item,
  );

export const groupRoutineItems = (items: RoutineItem[]) => ({
  daily: items.filter((item) => item.category === "Diário"),
  weekly: items.filter((item) => item.category === "Semanal"),
  monthly: items.filter((item) => item.category === "Mensal"),
});
