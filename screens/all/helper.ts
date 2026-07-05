import type { Task } from "../../components/tasks/types";

export interface AllSection {
  title: string;
  color: string;
  items: Task[];
}

export const sections: AllSection[] = [
  {
    title: "TRABALHO",
    color: "#5f76d1",
    items: [
      {
        id: 1,
        title: "Reunião de planejamento",
        time: "09:00",
        category: "Semanal",
        categoryColor: "#d94e4a",
        dotColor: "#d94e4a",
        completed: false,
      },
      {
        id: 2,
        title: "Review de código",
        time: "14:00",
        category: "Semanal",
        categoryColor: "#f3b03f",
        dotColor: "#f3b03f",
        completed: false,
      },
    ],
  },
  {
    title: "PESSOAL",
    color: "#4caf50",
    items: [
      {
        id: 3,
        title: "Ler 30 minutos",
        time: "",
        category: "Diário",
        categoryColor: "#4caf50",
        dotColor: "#4caf50",
        completed: false,
      },
    ],
  },
  {
    title: "SAÚDE",
    color: "#f56f8b",
    items: [
      {
        id: 4,
        title: "Academia",
        time: "07:00",
        category: "Diário",
        categoryColor: "#4caf50",
        dotColor: "#4caf50",
        completed: true,
      },
      {
        id: 5,
        title: "Meditação",
        time: "06:30",
        category: "Diário",
        categoryColor: "#79cea0",
        dotColor: "#79cea0",
        completed: true,
      },
    ],
  },
  {
    title: "FINANÇAS",
    color: "#b18bff",
    items: [
      {
        id: 6,
        title: "Pagar conta de luz",
        time: "",
        category: "Mensal",
        categoryColor: "#e25757",
        dotColor: "#e25757",
        completed: false,
      },
    ],
  },
];
