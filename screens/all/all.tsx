import React from "react";
import { ScrollView, View, Text } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { Clock, RotateCcw, CheckCircle } from "lucide-react-native";

interface TaskItem {
  id: number;
  title: string;
  time?: string;
  category: string;
  color: string;
  completed?: boolean;
}

const sections: {
  title: string;
  color: string;
  count: number;
  items: TaskItem[];
}[] = [
  {
    title: "TRABALHO",
    color: "#5f76d1",
    count: 2,
    items: [
      {
        id: 1,
        title: "Reunião de planejamento",
        time: "09:00",
        category: "Semanal",
        color: "#d94e4a",
      },
      {
        id: 2,
        title: "Review de código",
        time: "14:00",
        category: "Semanal",
        color: "#f3b03f",
      },
    ],
  },
  {
    title: "PESSOAL",
    color: "#4caf50",
    count: 1,
    items: [
      {
        id: 3,
        title: "Ler 30 minutos",
        category: "Diário",
        color: "#4caf50",
      },
    ],
  },
  {
    title: "SAÚDE",
    color: "#f56f8b",
    count: 2,
    items: [
      {
        id: 4,
        title: "Academia",
        time: "07:00",
        category: "Diário",
        color: "#4caf50",
        completed: true,
      },
      {
        id: 5,
        title: "Meditação",
        time: "06:30",
        category: "Diário",
        color: "#79cea0",
        completed: true,
      },
    ],
  },
  {
    title: "FINANÇAS",
    color: "#b18bff",
    count: 1,
    items: [
      {
        id: 6,
        title: "Pagar conta de luz",
        category: "Mensal",
        color: "#e25757",
      },
    ],
  },
];

const AllScreen = () => {
  useDeviceContext(tw);

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow bg-[#f5f5f3] px-5 py-6`}
      keyboardShouldPersistTaps="handled"
    >
      <View style={tw`mb-6`}>
        <Text style={tw`text-3xl font-bold text-[#2d2a27]`}>Todas</Text>
      </View>

      {sections.map((section) => (
        <View key={section.title} style={tw`mb-5`}>
          <View style={tw`flex-row items-center gap-3 mb-4`}>
            <View
              style={tw.style(`w-2 h-2 rounded-full`, {
                backgroundColor: section.color,
              })}
            />
            <Text
              style={tw`text-xs font-semibold tracking-[0.2px] text-[#9b9590]`}
            >
              {section.title}
            </Text>
            <Text
              style={tw`text-xs font-semibold tracking-[0.2px] text-[#9b9590]`}
            >
              ({section.count})
            </Text>
          </View>

          {section.items.map((item) => (
            <View
              key={item.id}
              style={tw`bg-white rounded-3xl p-4 mb-3 border border-[#ede7df] shadow-sm`}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <View
                  style={tw.style(`rounded-full`, {
                    width: 4,
                    height: 46,
                    backgroundColor: item.color,
                    opacity: item.completed ? 0.35 : 1,
                  })}
                />

                <View style={tw`flex-1`}>
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

                  <View style={tw`flex-row flex-wrap items-center gap-3 mt-2`}>
                    {item.time ? (
                      <View style={tw`flex-row items-center gap-1`}>
                        <Clock size={12} color="#9b9590" />
                        <Text style={tw`text-xs text-[#9b9590]`}>
                          {item.time}
                        </Text>
                      </View>
                    ) : null}
                    <View style={tw`flex-row items-center gap-1`}>
                      {item.completed ? (
                        <CheckCircle size={12} color={item.color} />
                      ) : (
                        <RotateCcw size={12} color="#7b9ed9" />
                      )}
                      <Text style={tw`text-xs font-semibold text-[#7b9ed9]`}>
                        {item.category}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={tw.style(`rounded-full`, {
                    width: 10,
                    height: 10,
                    backgroundColor: item.completed ? item.color : `#7b9ed9`,
                    borderWidth: 1,
                    borderColor: `#f1ece8`,
                  })}
                />
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default AllScreen;
