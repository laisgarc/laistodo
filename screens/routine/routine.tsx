import { ScrollView, View, Text, Pressable } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import React, { useState } from "react";
import { Clock, Tag, CheckCircle, Circle } from "lucide-react-native";

interface RoutineItem {
  id: number;
  title: string;
  time: string;
  category: string;
  color: string;
  completed: boolean;
}

const RoutineScreen = () => {
  useDeviceContext(tw);

  const [items, setItems] = useState<RoutineItem[]>([
    {
      id: 1,
      title: "Academia",
      time: "07:00",
      category: "Diário",
      color: "#f4a8b5",
      completed: true,
    },
    {
      id: 2,
      title: "Ler 30 minutos",
      time: "",
      category: "Diário",
      color: "#82c9a0",
      completed: false,
    },
    {
      id: 3,
      title: "Meditação",
      time: "06:30",
      category: "Diário",
      color: "#f4a8b5",
      completed: true,
    },
    {
      id: 4,
      title: "Reunião de planejamento",
      time: "09:00",
      category: "Semanal",
      color: "#e87878",
      completed: false,
    },
    {
      id: 5,
      title: "Pagar conta de luz",
      time: "",
      category: "Mensal",
      color: "#c4a8d9",
      completed: false,
    },
  ]);

  const toggleCompletion = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const groupedItems = items.reduce(
    (groups, item) => {
      if (item.category === "Diário") groups.daily.push(item);
      else if (item.category === "Semanal") groups.weekly.push(item);
      else if (item.category === "Mensal") groups.monthly.push(item);
      return groups;
    },
    {
      daily: [] as RoutineItem[],
      weekly: [] as RoutineItem[],
      monthly: [] as RoutineItem[],
    },
  );

  const renderSection = (
    title: string,
    labelColor: string,
    count: number,
    sectionItems: RoutineItem[],
  ) => {
    if (sectionItems.length === 0) return null;

    return (
      <View style={tw`mb-4`}>
        <View style={tw`flex-row items-center gap-2 mb-3`}>
          <View
            style={tw.style(`flex-row items-center rounded-full px-3 py-1.5`, {
              backgroundColor: `${labelColor}1a`,
            })}
          >
            <Tag size={14} color={labelColor} />
            <Text
              style={tw.style(`text-xs font-semibold ml-1`, {
                color: labelColor,
              })}
            >
              {title}
            </Text>
          </View>
          <Text style={tw`text-xs text-[#9b9590]`}>
            {count} tarefa{count > 1 ? "s" : ""}
          </Text>
        </View>

        {sectionItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => toggleCompletion(item.id)}
            style={tw`bg-white rounded-3xl p-5 mb-3 border border-[#ede7df] shadow-sm`}
          >
            <View style={tw`flex-row items-center gap-3`}>
              <View
                style={tw.style(`rounded-full`, {
                  width: 4,
                  height: 46,
                  backgroundColor: item.color,
                })}
              />

              <View style={tw`flex-row items-center justify-between flex-1`}>
                <View style={tw`flex-1`}>
                  <View style={tw`flex-row items-center gap-3`}>
                    <View
                      style={tw.style(
                        `rounded-full border border-[#f1ece8] p-2 bg-white`,
                        {
                          shadowColor: "#000",
                          shadowOpacity: 0.02,
                          shadowRadius: 4,
                          shadowOffset: { width: 0, height: 1 },
                          elevation: 1,
                        },
                      )}
                    >
                      {item.completed ? (
                        <CheckCircle size={16} color={item.color} />
                      ) : (
                        <Circle size={16} color={item.color} />
                      )}
                    </View>
                    <Text
                      style={tw.style(
                        `text-base font-semibold`,
                        item.completed
                          ? `text-gray-400 line-through`
                          : `text-[#2d2a27]`,
                      )}
                    >
                      {item.title}
                    </Text>
                  </View>

                  <View style={tw`flex-row flex-wrap items-center gap-3 mt-2`}>
                    {item.time ? (
                      <View style={tw`flex-row items-center gap-1`}>
                        <Clock size={12} color="#9b9590" />
                        <Text style={tw`text-xs text-[#9b9590]`}>
                          {item.time}
                        </Text>
                      </View>
                    ) : null}
                    <Text
                      style={tw.style(`text-xs font-semibold`, {
                        color: item.color,
                      })}
                    >
                      {item.category}
                    </Text>
                  </View>
                </View>

                <View
                  style={tw.style(`rounded-full`, {
                    width: 10,
                    height: 10,
                    backgroundColor: item.color,
                  })}
                />
              </View>
            </View>
          </Pressable>
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

      {renderSection(
        "Diário",
        "#f4a8b5",
        groupedItems.daily.length,
        groupedItems.daily,
      )}
      {renderSection(
        "Semanal",
        "#7b9ed9",
        groupedItems.weekly.length,
        groupedItems.weekly,
      )}
      {renderSection(
        "Mensal",
        "#c4a8d9",
        groupedItems.monthly.length,
        groupedItems.monthly,
      )}
    </ScrollView>
  );
};

export default RoutineScreen;
