import type { Task } from "../../components/tasks/types";

export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Reunião de planejamento",
    time: "09:00",
    category: "Semanal",
    categoryColor: "#7b9ed9",
    completed: false,
    dotColor: "#e87878",
  },
  {
    id: 2,
    title: "Academia",
    time: "07:00",
    category: "Diário",
    categoryColor: "#7b9ed9",
    completed: true,
    dotColor: "#f4a8b5",
  },
  {
    id: 3,
    title: "Ler 30 minutos",
    time: "",
    category: "Diário",
    categoryColor: "#7b9ed9",
    completed: false,
    dotColor: "#82c9a0",
  },
  {
    id: 4,
    title: "Pagar conta de luz",
    time: "",
    category: "Mensal",
    categoryColor: "#7b9ed9",
    completed: true,
    dotColor: "#c4a8d9",
  },
  {
    id: 5,
    title: "Review de código",
    time: "14:00",
    category: "",
    categoryColor: "",
    completed: true,
    dotColor: "#7b9ed9",
  },
  {
    id: 6,
    title: "Meditação",
    time: "06:30",
    category: "Diário",
    categoryColor: "#7b9ed9",
    completed: false,
    dotColor: "#f4a8b5",
  },
];

export const getCompletedCount = (tasks: Task[]) =>
  tasks.filter((task) => task.completed).length;

export const getCompletionPercentage = (tasks: Task[]) => {
  if (tasks.length === 0) {
    return 0;
  }

  return Math.round((getCompletedCount(tasks) / tasks.length) * 100);
};

export const toggleTaskCompleted = (tasks: Task[], id: number) =>
  tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
