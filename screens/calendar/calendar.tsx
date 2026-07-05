import { ScrollView, View, Text } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import React, { useState } from "react";
import {
  SectionHeader,
  EmptyState,
  EventCard,
  CalendarBoard,
} from "../../components";
import {
  initialCalendarEvents,
  buildMarkedDates,
  formatSelectedDateLabel,
  getEventsForDate,
  toggleEventCompleted,
} from "./helper";

const CalendarScreen = () => {
  useDeviceContext(tw);

  const [selectedDate, setSelectedDate] = useState("2026-07-02");
  const [events, setEvents] = useState(initialCalendarEvents);

  const toggleCompleted = (id: number) => {
    setEvents((prev) => toggleEventCompleted(prev, id));
  };

  const markedDates = buildMarkedDates(events, selectedDate);
  const eventsForSelected = getEventsForDate(events, selectedDate);

  const selectedDateLabel = formatSelectedDateLabel(selectedDate);

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow bg-[#f5f5f3] px-5 py-6`}
      keyboardShouldPersistTaps="never"
    >
      <SectionHeader title="Calendário" />

      <CalendarBoard
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />

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
          <EmptyState message="Sem eventos para este dia." />
        ) : (
          eventsForSelected.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onToggle={toggleCompleted}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default CalendarScreen;
