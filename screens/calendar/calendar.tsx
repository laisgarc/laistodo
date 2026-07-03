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

LocaleConfig.locales["pt-br"] = {
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
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
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
  dayNamesShort: ["D", "S", "T", "Q", "Q", "S", "S"],
};

LocaleConfig.defaultLocale = "pt-br";

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

  const [year, month, day] = selectedDate.split("-").map(Number);
  const selectedDateLabel =
    `${weekdays[new Date(year, month - 1, day).getDay()]}, ${day} de ${monthNames[month - 1]}`.toUpperCase();

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
          backgroundColor: "#ffffff",
          borderRadius: 28,
          padding: 18,
          borderWidth: 1,
          borderColor: "#f1ece8",
          shadowColor: "#000",
          shadowOpacity: 0.04,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 8 },
          elevation: 4,
        })}
      >
        <RNCalendar
          markingType={"multi-dot"}
          markedDates={markedDates}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          monthFormat={"MMMM yyyy"}
          hideExtraDays={false}
          enableSwipeMonths={true}
          theme={{
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#9b9590",
            textSectionTitleDisabledColor: "#9b9590",
            selectedDayBackgroundColor: "#7b9ed9",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#7b9ed9",
            dayTextColor: "#2d2a27",
            textDisabledColor: "#d1cdc7",
            arrowColor: "#2d2a27",
            monthTextColor: "#2d2a27",
            textMonthFontWeight: "700",
            textMonthFontSize: 18,
            textDayHeaderFontSize: 12,
            textDayFontSize: 14,
            textDayStyle: {
              marginTop: 2,
            },
          }}
          dayComponent={({ date, state, marking }) => {
            const isSelected = marking?.selected;
            return (
              <View style={tw`items-center justify-center w-10 h-10`}>
                <View
                  style={tw.style(`items-center justify-center rounded-full`, {
                    width: 34,
                    height: 34,
                    backgroundColor: isSelected ? "#7b9ed9" : "transparent",
                  })}
                >
                  <Text
                    style={tw.style(`text-sm`, {
                      color: isSelected
                        ? "#ffffff"
                        : state === "disabled"
                          ? "#d1cdc7"
                          : "#2d2a27",
                      fontWeight: isSelected ? "700" : "500",
                    })}
                  >
                    {date?.day}
                  </Text>
                </View>
                {marking?.dots?.length ? (
                  <View style={tw`flex-row gap-1 mt-1`}>
                    {marking.dots.map((dot: any, index: number) => (
                      <View
                        key={index}
                        style={tw.style(`w-1.5 h-1.5 rounded-full`, {
                          backgroundColor: dot.color,
                        })}
                      />
                    ))}
                  </View>
                ) : null}
              </View>
            );
          }}
        />
      </View>

      {/* Date header */}
      <View style={tw`mt-2 mb-2`}>
        <Text
          style={tw`text-[10px] tracking-[0.25px] uppercase text-[#9b9590]`}
        >
          {selectedDateLabel}
        </Text>
      </View>

      {/* Events list */}
      <View>
        {eventsForSelected.length === 0 ? (
          <View style={tw`flex items-center justify-center h-40`}>
            <Text style={tw`text-[#9b9590]`}>Sem eventos para este dia.</Text>
          </View>
        ) : (
          eventsForSelected.map((ev) => (
            <Pressable
              key={ev.id}
              onPress={() => toggleCompleted(ev.id)}
              style={tw`bg-white rounded-3xl p-5 mb-3 border border-[#ede7df] shadow-sm`}
            >
              <View style={tw`flex-row items-start gap-3`}>
                <View
                  style={tw.style(`rounded-full`, {
                    width: 4,
                    height: 46,
                    backgroundColor: ev.color || "#7b9ed9",
                    opacity: ev.completed ? 0.35 : 1,
                  })}
                />

                <View style={tw`flex-1`}>
                  <Text
                    style={tw.style(
                      `text-base font-semibold`,
                      ev.completed
                        ? `text-gray-400 line-through`
                        : `text-[#2d2a27]`,
                    )}
                  >
                    {ev.title}
                  </Text>

                  <View style={tw`flex-row flex-wrap items-center gap-3 mt-2`}>
                    {ev.time && (
                      <View style={tw`flex-row items-center gap-1`}>
                        <Clock size={12} color="#9b9590" />
                        <Text style={tw`text-xs text-[#9b9590]`}>
                          {ev.time}
                        </Text>
                      </View>
                    )}
                    {ev.category && (
                      <View style={tw`flex-row items-center gap-1`}>
                        <Tag size={12} color={ev.color || "#7b9ed9"} />
                        <Text
                          style={tw.style(`text-xs font-semibold`, {
                            color: ev.color || "#7b9ed9",
                          })}
                        >
                          {ev.category}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={tw`mt-1 items-center justify-center`}>
                  <View
                    style={tw.style(`rounded-full border border-[#f1ece8]`, {
                      width: 10,
                      height: 10,
                      backgroundColor: ev.color || "#7b9ed9",
                      opacity: ev.completed ? 0.55 : 1,
                    })}
                  />
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
