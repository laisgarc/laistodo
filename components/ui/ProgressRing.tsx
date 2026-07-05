import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle as SvgCircle, G } from "react-native-svg";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";

interface ProgressRingProps {
  completed: number;
  total: number;
  size?: number;
}

const ProgressRing = ({ completed, total, size = 64 }: ProgressRingProps) => {
  useDeviceContext(tw);

  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = total === 0 ? 0 : (completed / total) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={{ position: "relative", width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G>
          <SvgCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#ede7df"
            strokeWidth={5}
            fill="none"
          />
          <SvgCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#7b9ed9"
            strokeWidth={5}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </G>
      </Svg>
      <View
        style={{
          position: "absolute",
          inset: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#7b9ed9" }}>
          {completed}/{total}
        </Text>
      </View>
    </View>
  );
};

export default ProgressRing;
