import React from "react";
import { View, Text, type TextStyle, type ViewStyle } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";

interface SectionBadgeProps {
  title: string;
  count?: number;
  color: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  countStyle?: TextStyle;
}

const SectionBadge = ({
  title,
  count,
  color,
  style,
  titleStyle,
  countStyle,
}: SectionBadgeProps) => {
  useDeviceContext(tw);

  return (
    <View style={tw.style(`flex-row items-center gap-3 mb-3`, style)}>
      <View
        style={tw.style(`rounded-full px-3 py-1.5 flex-row items-center`, {
          backgroundColor: `${color}1a`,
        })}
      >
        <View
          style={tw.style(`w-2 h-2 rounded-full`, {
            backgroundColor: color,
          })}
        />
        <Text
          style={tw.style(`text-xs font-semibold ml-1`, { color }, titleStyle)}
        >
          {title}
        </Text>
      </View>
      {typeof count === "number" ? (
        <Text style={tw.style(`text-xs text-[#9b9590]`, countStyle)}>
          ({count})
        </Text>
      ) : null}
    </View>
  );
};

export default SectionBadge;
