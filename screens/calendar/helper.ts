import type { CalendarEvent } from "../../components/events/types";

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Reunião de planejamento",
    time: "09:00",
    category: "Semanal",
    color: "#e87878",
    completed: false,
    date: "2026-07-02",
  },
  {
    id: 2,
    title: "Academia",
    time: "07:00",
    category: "Diário",
    color: "#f2c97a",
    completed: true,
    date: "2026-07-02",
  },
  {
    id: 3,
    title: "Ler 30 minutos",
    category: "Diário",
    color: "#82c9a0",
    completed: false,
    date: "2026-07-02",
  },
  {
    id: 4,
    title: "Pagar conta de luz",
    time: "18:00",
    category: "Mensal",
    color: "#b293f5",
    completed: false,
    date: "2026-07-12",
  },
  {
    id: 5,
    title: "Almoço com cliente",
    time: "13:30",
    category: "Semanal",
    color: "#f59e0b",
    completed: false,
    date: "2026-07-09",
  },
  {
    id: 6,
    title: "Revisar metas",
    time: "16:00",
    category: "Mensal",
    color: "#34d399",
    completed: false,
    date: "2026-07-15",
  },
];

const weekdays = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

const monthNames = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export const toggleEventCompleted = (
  events: CalendarEvent[],
  id: number,
): CalendarEvent[] =>
  events.map((event) =>
    event.id === id ? { ...event, completed: !event.completed } : event,
  );

export const buildMarkedDates = (
  events: CalendarEvent[],
  selectedDate: string,
): Record<
  string,
  { dots?: Array<{ key: string; color: string }>; selected?: boolean }
> => {
  const markedDates: Record<
    string,
    { dots?: Array<{ key: string; color: string }>; selected?: boolean }
  > = {};

  events.forEach((event) => {
    if (!markedDates[event.date]) {
      markedDates[event.date] = { dots: [] };
    }

    markedDates[event.date].dots?.push({
      key: `event-${event.id}`,
      color: event.color || "#7b9ed9",
    });
  });

  if (!markedDates[selectedDate]) {
    markedDates[selectedDate] = {};
  }

  markedDates[selectedDate].selected = true;

  return markedDates;
};

export const getEventsForDate = (
  events: CalendarEvent[],
  selectedDate: string,
): CalendarEvent[] => events.filter((event) => event.date === selectedDate);

export const formatSelectedDateLabel = (selectedDate: string): string => {
  const [year, month, day] = selectedDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const weekday = weekdays[date.getDay()];
  const monthName = monthNames[month - 1];

  return `${weekday}, ${day} de ${monthName}`.toUpperCase();
};
