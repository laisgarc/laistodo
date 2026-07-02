import { View, Text, Pressable } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import React from "react";
import {
  CheckSquare,
  Calendar,
  RotateCw,
  Tag,
  Plus,
} from "lucide-react-native";

interface TabNavigatorProps {
  activeTab: "today" | "calendar" | "routine" | "all";
  onTabChange: (tab: "today" | "calendar" | "routine" | "all") => void;
  onAddPress?: () => void;
}

const TabNavigator = ({
  activeTab,
  onTabChange,
  onAddPress,
}: TabNavigatorProps) => {
  useDeviceContext(tw);

  const tabs = [
    { id: "today", label: "Hoje", icon: CheckSquare },
    { id: "calendar", label: "Calendário", icon: Calendar },
    { id: "routine", label: "Rotina", icon: RotateCw },
    { id: "all", label: "Todas", icon: Tag },
  ] as const;

  return (
    <View
      style={tw`flex-row items-center justify-between bg-[#f5f5f3] px-4 pb-4 pt-2 border-t border-gray-200`}
    >
      {/* Tab buttons */}
      <View style={tw`flex-row gap-4 flex-1`}>
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <Pressable
              key={id}
              onPress={() => onTabChange(id)}
              style={tw`flex-col items-center gap-1 py-1 px-3`}
            >
              <Icon
                size={22}
                color={isActive ? "#7b9ed9" : "#b0aaa3"}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <Text
                style={tw.style(
                  `text-[10px] font-medium text-center`,
                  isActive ? `text-[#7b9ed9]` : `text-[#b0aaa3]`,
                )}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Floating Action Button */}
      <Pressable
        onPress={onAddPress}
        style={tw`bg-[#7b9ed9] rounded-full p-3 shadow-lg`}
      >
        <Plus size={22} color="white" strokeWidth={2.5} />
      </Pressable>
    </View>
  );
};

export default TabNavigator;
