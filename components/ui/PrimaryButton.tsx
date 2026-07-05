import React from "react";
import {
  Pressable,
  Text,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const PrimaryButton = ({
  label,
  onPress,
  disabled = false,
  style,
  textStyle,
}: PrimaryButtonProps) => {
  useDeviceContext(tw);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={tw.style(
        `h-12 rounded-3xl items-center justify-center`,
        disabled ? `bg-[#b8b1aa]` : `bg-[#7b9ed9]`,
        style as any,
      )}
    >
      <Text
        style={tw.style(
          `text-base font-semibold`,
          disabled ? `text-[#f3f2f0]` : `text-white`,
          textStyle as any,
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default PrimaryButton;
