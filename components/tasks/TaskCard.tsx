import React from "react";
import { Pressable, View, Text } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import type { Task } from "./types";

interface TaskCardProps {
  task: Task;
  onToggle?: (id: number) => void;
  renderMeta?: React.ReactNode;
}

const TaskCard = ({ task, onToggle, renderMeta }: TaskCardProps) => {
  useDeviceContext(tw);

  return (
    <Pressable
      onPress={onToggle ? () => onToggle(task.id) : undefined}
      style={tw`bg-white rounded-3xl p-4 mb-3 border border-[#ede7df] shadow-sm`}
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

        <View style={tw`flex-1`}>
          <Text
            style={tw.style(
              `text-base font-semibold`,
              task.completed ? `text-gray-400 line-through` : `text-[#2d2a27]`,
            )}
          >
            {task.title}
          </Text>
          {renderMeta}
        </View>

        <View style={tw`mt-1 items-center justify-center`}>
          <View
            style={tw.style(`rounded-full border border-[#f1ece8]`, {
              width: 10,
              height: 10,
              backgroundColor: task.dotColor,
              opacity: task.completed ? 0.55 : 1,
            })}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default TaskCard;
