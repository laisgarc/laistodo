import { ScrollView, View, Text } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import React, { useState } from "react";
import { TaskItem, ProgressRing } from "../../components";
import {
  initialTasks,
  getCompletedCount,
  getCompletionPercentage,
  toggleTaskCompleted,
} from "./helper";

const HomeScreen = () => {
  useDeviceContext(tw);

  const [tasks, setTasks] = useState(initialTasks);

  const completedCount = getCompletedCount(tasks);
  const completionPercentage = getCompletionPercentage(tasks);

  const toggleTask = (id: number) => {
    setTasks(toggleTaskCompleted(tasks, id));
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
          <TaskItem key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
