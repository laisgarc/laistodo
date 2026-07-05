import React from "react";
import { Pressable, View, Text } from "react-native";
import { Clock, Tag, CheckCircle, Circle } from "lucide-react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import type { Task } from "./types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}

const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  useDeviceContext(tw);

  return (
    <Pressable
      onPress={() => onToggle(task.id)}
      style={tw`bg-white rounded-3xl p-5 mb-3 border border-[#ede7df] shadow-sm`}
    >
      <View style={tw`flex-row items-start gap-3`}>
        <View
          style={tw.style(`rounded-full`, {
            width: 4,
            height: 46,
            backgroundColor: task.dotColor,
            opacity: task.completed ? 0.35 : 1,
          })}
        />

        <View
          style={tw.style(`rounded-full border border-[#f1ece8] p-2 bg-white`, {
            shadowColor: "#000",
            shadowOpacity: 0.02,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 1 },
            elevation: 1,
          })}
        >
          {task.completed ? (
            <CheckCircle size={18} color={task.dotColor} />
          ) : (
            <Circle size={18} color={task.dotColor} />
          )}
        </View>

        <View style={tw`flex-1`}>
          <Text
            style={tw.style(
              `text-base font-semibold`,
              task.completed ? `line-through text-gray-400` : `text-[#2d2a27]`,
            )}
          >
            {task.title}
          </Text>

          <View style={tw`flex-row gap-2 mt-1 items-center flex-wrap`}>
            {task.time ? (
              <View style={tw`flex-row items-center gap-1`}>
                <Clock size={11} color="#9b9590" />
                <Text style={tw`text-xs text-gray-400`}>{task.time}</Text>
              </View>
            ) : null}
            {task.category ? (
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
            ) : null}
          </View>
        </View>

        <View
          style={tw.style(`rounded-full mt-1`, {
            width: 10,
            height: 10,
            backgroundColor: task.dotColor,
          })}
        />
      </View>
    </Pressable>
  );
};

export default TaskItem;
