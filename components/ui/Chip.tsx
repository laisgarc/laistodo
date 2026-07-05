import React from "react";
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  indicatorColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Chip = ({
  label,
  active = false,
  onPress,
  indicatorColor,
  style,
  textStyle,
}: ChipProps) => {
  useDeviceContext(tw);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      hitSlop={8}
      style={tw.style(
        `rounded-3xl px-4 h-10 justify-center flex-row items-center gap-2`,
        active ? `bg-[#7b9ed9]` : `bg-[#f8f7f5] border border-[#ede7df]`,
        style as any,
      )}
    >
      {indicatorColor ? (
        <View
          style={tw.style(`w-2.5 h-2.5 rounded-full`, {
            backgroundColor: indicatorColor,
          })}
        />
      ) : null}
      <Text
        style={tw.style(
          `text-sm font-semibold`,
          active ? `text-white` : `text-[#2d2a27]`,
          textStyle as any,
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default Chip;
