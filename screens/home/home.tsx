import { ScrollView, View, Text, Pressable } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import React, { useState } from "react";
import { Clock, Tag, CheckCircle, Circle } from "lucide-react-native";
import Svg, { Circle as SvgCircle, G } from "react-native-svg";

interface Task {
  id: number;
  title: string;
  time: string;
  category: string;
  categoryColor: string;
  completed: boolean;
  dotColor: string;
}

const ProgressRing = ({
  completed,
  total,
  size = 64,
}: {
  completed: number;
  total: number;
  size?: number;
}) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (completed / total) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={{ position: "relative", width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G>
          {/* Background circle */}
          <SvgCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#ede7df"
            strokeWidth="5"
            fill="none"
          />
          {/* Progress circle */}
          <SvgCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#7b9ed9"
            strokeWidth="5"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </G>
      </Svg>
      {/* Text overlay */}
      <View
        style={{
          position: "absolute",
          inset: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
            color: "#7b9ed9",
          }}
        >
          {completed}/{total}
        </Text>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  useDeviceContext(tw);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Reunião de planejamento",
      time: "09:00",
      category: "Semanal",
      categoryColor: "#7b9ed9",
      completed: false,
      dotColor: "#e87878",
    },
    {
      id: 2,
      title: "Academia",
      time: "07:00",
      category: "Diário",
      categoryColor: "#7b9ed9",
      completed: true,
      dotColor: "#f4a8b5",
    },
    {
      id: 3,
      title: "Ler 30 minutos",
      time: "",
      category: "Diário",
      categoryColor: "#7b9ed9",
      completed: false,
      dotColor: "#82c9a0",
    },
    {
      id: 4,
      title: "Pagar conta de luz",
      time: "",
      category: "Mensal",
      categoryColor: "#7b9ed9",
      completed: true,
      dotColor: "#c4a8d9",
    },
    {
      id: 5,
      title: "Review de código",
      time: "14:00",
      category: "",
      categoryColor: "",
      completed: true,
      dotColor: "#7b9ed9",
    },
    {
      id: 6,
      title: "Meditação",
      time: "06:30",
      category: "Diário",
      categoryColor: "#7b9ed9",
      completed: false,
      dotColor: "#f4a8b5",
    },
  ]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const completionPercentage = Math.round(
    (completedCount / tasks.length) * 100,
  );

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow bg-[#f5f5f3] px-5 py-6`}
      keyboardShouldPersistTaps="never"
    >
      {/* Header */}
      <View style={tw`mb-6`}>
        <Text
          style={tw`text-xs font-medium text-gray-400 tracking-wide uppercase`}
        >
          quinta-feira
        </Text>
        <Text style={tw`text-3xl font-bold text-[#2d2a27] mt-2`}>Hoje</Text>
      </View>

      {/* Progress Card */}
      <View
        style={tw`bg-white rounded-3xl p-5 mb-6 flex-row items-center border border-[#ede7df] shadow-sm`}
      >
        <View style={tw`mr-4`}>
          <ProgressRing completed={completedCount} total={tasks.length} />
        </View>

        {/* Progress Info */}
        <View style={tw`flex-1`}>
          <Text style={tw`text-base font-semibold text-[#2d2a27]`}>
            {tasks.length - completedCount} pendentes
          </Text>
          <Text style={tw`text-sm text-[#9b9590] mt-1`}>
            {completionPercentage}% completo hoje
          </Text>
        </View>
      </View>

      {/* Tasks List */}
      <View>
        {tasks.map((task) => (
          <Pressable
            key={task.id}
            onPress={() => toggleTask(task.id)}
            style={tw`bg-white rounded-3xl p-5 mb-3 border border-[#ede7df] shadow-sm`}
          >
            <View style={tw`flex-row items-start gap-3`}>
              {/* Left Border Indicator */}
              <View
                style={tw.style(`rounded-full`, {
                  width: 4,
                  height: 46,
                  backgroundColor: task.dotColor,
                  opacity: task.completed ? 0.35 : 1,
                })}
              />

              {/* Icon */}
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
                {task.completed ? (
                  <CheckCircle size={18} color={task.dotColor} />
                ) : (
                  <Circle size={18} color={task.dotColor} />
                )}
              </View>

              {/* Content */}
              <View style={tw`flex-1`}>
                <Text
                  style={tw.style(
                    `text-base font-semibold`,
                    task.completed
                      ? `line-through text-gray-400`
                      : `text-[#2d2a27]`,
                  )}
                >
                  {task.title}
                </Text>

                {/* Meta Info */}
                <View style={tw`flex-row gap-2 mt-1 items-center flex-wrap`}>
                  {task.time && (
                    <View style={tw`flex-row items-center gap-1`}>
                      <Clock size={11} color="#9b9590" />
                      <Text style={tw`text-xs text-gray-400`}>{task.time}</Text>
                    </View>
                  )}
                  {task.category && (
                    <View style={tw`flex-row items-center gap-1`}>
                      <Tag size={11} color={task.categoryColor} />
                      <Text
                        style={tw.style(`text-xs font-medium`, {
                          color: task.categoryColor,
                        })}
                      >
                        {task.category}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Right Dot Indicator */}
              <View
                style={tw.style(`rounded-full mt-1`, {
                  width: 10,
                  height: 10,
                  backgroundColor: task.dotColor,
                })}
              />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
