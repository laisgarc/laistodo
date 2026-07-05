export interface CalendarEvent {
  id: number;
  title: string;
  time?: string;
  category?: string;
  color?: string;
  completed?: boolean;
  date: string; // YYYY-MM-DD
}
