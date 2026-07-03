import { ScrollView, View, Text, Pressable } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import React, { useState } from "react";
import { LocaleConfig, Calendar as RNCalendar } from "react-native-calendars";
import { Clock, Tag, CheckCircle, Circle } from "lucide-react-native";

interface EventItem {
  id: number;
  title: string;
  time?: string;
  category?: string;
  color?: string;
  completed?: boolean;
  date: string; // YYYY-MM-DD
}

LocaleConfig.locales.fr = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul.",
    "Ago",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
};

LocaleConfig.defaultLocale = "fr";

const CalendarScreen = () => {
  useDeviceContext(tw);

  const [selectedDate, setSelectedDate] = useState("2026-07-02");

  const [events, setEvents] = useState<EventItem[]>([
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
  ]);

  const toggleCompleted = (id: number) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e)),
    );
  };

  // Build marked dates for react-native-calendars (multi-dot)
  const markedDates: Record<string, any> = {};
  events.forEach((ev) => {
    if (!markedDates[ev.date]) markedDates[ev.date] = { dots: [] };
    markedDates[ev.date].dots.push({
      key: `ev-${ev.id}`,
      color: ev.color || "#7b9ed9",
    });
  });
  // ensure selected is marked
  if (!markedDates[selectedDate]) markedDates[selectedDate] = {};
  markedDates[selectedDate].selected = true;

  const eventsForSelected = events.filter((e) => e.date === selectedDate);

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow bg-[#f5f5f3] px-5 py-6`}
      keyboardShouldPersistTaps="never"
    >
      {/* Header */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-3xl font-bold text-[#2d2a27]`}>Calendário</Text>
      </View>

      <View
        style={tw.style(`mb-4`, {
          backgroundColor: "#fffdf9",
          borderRadius: 24,
          padding: 16,
          borderWidth: 1.111,
          borderColor: "rgba(45,42,39,0.07)",
        })}
      >
        <RNCalendar
          markingType={"multi-dot"}
          markedDates={markedDates}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          monthFormat={"MMMM yyyy"}
          hideExtraDays={false}
          theme={{
            calendarBackground: "#fffdf9",
            textSectionTitleColor: "#9b9590",
            dayTextColor: "#2d2a27",
            textMonthFontWeight: "700",
            textMonthFontSize: 18,
            textDayHeaderFontSize: 12,
            textDayFontSize: 14,
            selectedDayBackgroundColor: "#ffffff",
            selectedDayTextColor: "#2d2a27",
            todayTextColor: "#7b9ed9",
            arrowColor: "#2d2a27",
            dotColor: "#7b9ed9",
          }}
        />
      </View>

      {/* Date header */}
      <View style={tw`mt-2 mb-2`}>
        <Text style={tw`text-sm text-gray-400`}>quinta-feira, 2 de julho</Text>
      </View>

      {/* Events list */}
      <View>
        {eventsForSelected.length === 0 ? (
          <View style={tw`flex items-center justify-center h-40`}>
            <Text style={tw`text-gray-500`}>Sem eventos para este dia.</Text>
          </View>
        ) : (
          eventsForSelected.map((ev) => (
            <Pressable
              key={ev.id}
              onPress={() => toggleCompleted(ev.id)}
              style={tw`bg-white rounded-2xl p-4 mb-3 border border-gray-200`}
            >
              <View style={tw`flex-row items-start gap-3`}>
                <View
                  style={tw.style(`w-1 h-8 rounded-full`, {
                    backgroundColor: ev.color || "#7b9ed9",
                    opacity: ev.completed ? 0.3 : 1,
                  })}
                />

                <View style={tw`flex-1`}>
                  <Text
                    style={tw.style(
                      `text-sm font-medium`,
                      ev.completed
                        ? `line-through text-gray-400`
                        : `text-[#2d2a27]`,
                    )}
                  >
                    {ev.title}
                  </Text>

                  <View style={tw`flex-row gap-2 mt-1 items-center`}>
                    {ev.time && (
                      <View style={tw`flex-row items-center gap-1`}>
                        <Clock size={11} color="#9b9590" />
                        <Text style={tw`text-xs text-gray-400`}>{ev.time}</Text>
                      </View>
                    )}
                    {ev.category && (
                      <View style={tw`flex-row items-center gap-1`}>
                        <Tag size={11} color={ev.color || "#7b9ed9"} />
                        <Text style={tw`text-xs text-gray-400`}>
                          {ev.category}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={tw`mt-1`}>
                  {ev.completed ? (
                    <CheckCircle size={18} color={ev.color || "#7b9ed9"} />
                  ) : (
                    <Circle size={18} color={ev.color || "#7b9ed9"} />
                  )}
                </View>
              </View>
            </Pressable>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default CalendarScreen;
