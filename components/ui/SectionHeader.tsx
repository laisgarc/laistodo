import React from "react";
import { View, Text, type TextStyle, type ViewStyle } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

const SectionHeader = ({
  title,
  subtitle,
  style,
  titleStyle,
  subtitleStyle,
}: SectionHeaderProps) => {
  useDeviceContext(tw);

  return (
    <View style={tw.style(`mb-4`, style)}>
      <Text style={tw.style(`text-3xl font-bold text-[#2d2a27]`, titleStyle)}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={tw.style(`text-sm text-[#9b9590] mt-1`, subtitleStyle)}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};

export default SectionHeader;
