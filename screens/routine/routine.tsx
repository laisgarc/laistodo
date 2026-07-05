import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { Clock } from "lucide-react-native";
import { SectionBadge, TaskCard } from "../../components";
import {
  groupRoutineItems,
  initialRoutineItems,
  toggleRoutineCompleted,
  type RoutineItem,
} from "./helper";

const RoutineScreen = () => {
  useDeviceContext(tw);

  const [items, setItems] = useState<RoutineItem[]>(initialRoutineItems);

  const groupedItems = groupRoutineItems(items);

  const toggleCompletion = (id: number) => {
    setItems((prev) => toggleRoutineCompleted(prev, id));
  };

  const renderSection = (
    title: string,
    labelColor: string,
    sectionItems: RoutineItem[],
  ) => {
    if (sectionItems.length === 0) return null;

    return (
      <View style={tw`mb-4`}>
        <SectionBadge
          title={title}
          count={sectionItems.length}
          color={labelColor}
        />

        {sectionItems.map((item) => (
          <TaskCard
            key={item.id}
            task={item}
            onToggle={toggleCompletion}
            renderMeta={
              <View style={tw`flex-row flex-wrap items-center gap-3 mt-2`}>
                {item.time ? (
                  <View style={tw`flex-row items-center gap-1`}>
                    <Clock size={12} color="#9b9590" />
                    <Text style={tw`text-xs text-[#9b9590]`}>{item.time}</Text>
                  </View>
                ) : null}
                <Text
                  style={tw.style(`text-xs font-semibold`, {
                    color: item.dotColor,
                  })}
                >
                  {item.category}
                </Text>
              </View>
            }
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow bg-[#f5f5f3] px-5 py-6`}
      keyboardShouldPersistTaps="never"
    >
      <View style={tw`mb-6`}>
        <Text style={tw`text-3xl font-bold text-[#2d2a27]`}>Recorrentes</Text>
      </View>

      {renderSection("Diário", "#f4a8b5", groupedItems.daily)}
      {renderSection("Semanal", "#7b9ed9", groupedItems.weekly)}
      {renderSection("Mensal", "#c4a8d9", groupedItems.monthly)}
    </ScrollView>
  );
};

export default RoutineScreen;
