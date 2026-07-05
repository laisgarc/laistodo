export type RecurrenceOption =
  | "Sem recorrência"
  | "Diário"
  | "Semanal"
  | "Mensal";

export const recurrenceOptions: RecurrenceOption[] = [
  "Sem recorrência",
  "Diário",
  "Semanal",
  "Mensal",
];

export interface CategoryOption {
  label: string;
  color: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
}

export const categories: CategoryOption[] = [
  {
    label: "Trabalho",
    color: "#7b9ed9",
    activeBg: "rgba(123,158,217,0.13)",
    activeBorder: "rgba(123,158,217,0.27)",
    activeText: "#7b9ed9",
  },
  {
    label: "Pessoal",
    color: "#82c9a0",
    activeBg: "rgba(130,201,160,0.13)",
    activeBorder: "rgba(130,201,160,0.27)",
    activeText: "#82c9a0",
  },
  {
    label: "Saúde",
    color: "#f4a8b5",
    activeBg: "rgba(244,168,181,0.13)",
    activeBorder: "rgba(244,168,181,0.27)",
    activeText: "#f4a8b5",
  },
  {
    label: "Finanças",
    color: "#c4a8d9",
    activeBg: "rgba(196,168,217,0.13)",
    activeBorder: "rgba(196,168,217,0.27)",
    activeText: "#c4a8d9",
  },
];

export const priorities = ["Baixa", "Média", "Alta"] as const;
export type PriorityOption = (typeof priorities)[number];

export const priorityStyles: Record<
  PriorityOption,
  { bg: string; border: string; text: string }
> = {
  Baixa: {
    bg: "rgba(130, 201, 160, 0.133)",
    border: "rgba(130, 201, 160, 0.267)",
    text: "#82c9a0",
  },
  Média: {
    bg: "rgba(242,201,122,0.13)",
    border: "rgba(242,201,122,0.27)",
    text: "#f2c97a",
  },
  Alta: {
    bg: "rgba(232, 120, 120, 0.133)",
    border: "rgba(232, 120, 120, 0.267)",
    text: "#f4a8b5",
  },
};
