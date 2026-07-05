import React from "react";
import { View, Text } from "react-native";
import { LocaleConfig, Calendar as RNCalendar } from "react-native-calendars";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";

interface CalendarBoardProps {
  markedDates: Record<string, any>;
  onDayPress: (day: { dateString: string }) => void;
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

const CalendarBoard = ({ markedDates, onDayPress }: CalendarBoardProps) => {
  useDeviceContext(tw);

  return (
    <View
      style={tw.style(`bg-white rounded-3xl`, {
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
        onDayPress={onDayPress}
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
                      key={dot?.key ?? index}
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
  );
};

export default CalendarBoard;
