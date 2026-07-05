import React from "react";
import { View, Text, type TextStyle, type ViewStyle } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";

interface EmptyStateProps {
  message: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const EmptyState = ({ message, style, textStyle }: EmptyStateProps) => {
  useDeviceContext(tw);

  return (
    <View style={tw.style(`flex items-center justify-center h-40`, style)}>
      <Text style={tw.style(`text-[#9b9590]`, textStyle)}>{message}</Text>
    </View>
  );
};

export default EmptyState;
