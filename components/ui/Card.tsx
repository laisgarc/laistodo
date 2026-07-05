import React from "react";
import { View, type ViewStyle } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card = ({ children, style }: CardProps) => {
  useDeviceContext(tw);

  return (
    <View
      style={tw.style(
        `bg-white rounded-3xl p-5 border border-[#ede7df] shadow-sm`,
        style,
      )}
    >
      {children}
    </View>
  );
};

export default Card;
