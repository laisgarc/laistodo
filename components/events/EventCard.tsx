import React from "react";
import { Pressable, View, Text } from "react-native";
import { Clock, Tag } from "lucide-react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import type { CalendarEvent } from "./types";

interface EventCardProps {
  event: CalendarEvent;
  onToggle: (id: number) => void;
}

const EventCard = ({ event, onToggle }: EventCardProps) => {
  useDeviceContext(tw);

  return (
    <Pressable
      onPress={() => onToggle(event.id)}
      style={tw`bg-white rounded-3xl p-5 mb-3 border border-[#ede7df] shadow-sm`}
    >
      <View style={tw`flex-row items-start gap-3`}>
        <View
          style={tw.style(`rounded-full`, {
            width: 4,
            height: 46,
            backgroundColor: event.color || "#7b9ed9",
            opacity: event.completed ? 0.35 : 1,
          })}
        />

        <View style={tw`flex-1`}>
          <Text
            style={tw.style(
              `text-base font-semibold`,
              event.completed ? `text-gray-400 line-through` : `text-[#2d2a27]`,
            )}
          >
            {event.title}
          </Text>

          <View style={tw`flex-row flex-wrap items-center gap-3 mt-2`}>
            {event.time ? (
              <View style={tw`flex-row items-center gap-1`}>
                <Clock size={12} color="#9b9590" />
                <Text style={tw`text-xs text-[#9b9590]`}>{event.time}</Text>
              </View>
            ) : null}
            {event.category ? (
              <View style={tw`flex-row items-center gap-1`}>
                <Tag size={12} color={event.color || "#7b9ed9"} />
                <Text
                  style={tw.style(`text-xs font-semibold`, {
                    color: event.color || "#7b9ed9",
                  })}
                >
                  {event.category}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={tw`mt-1 items-center justify-center`}>
          <View
            style={tw.style(`rounded-full border border-[#f1ece8]`, {
              width: 10,
              height: 10,
              backgroundColor: event.color || "#7b9ed9",
              opacity: event.completed ? 0.55 : 1,
            })}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default EventCard;
