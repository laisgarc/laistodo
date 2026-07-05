import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import DateTimePicker from "@react-native-community/datetimepicker";
import Chip from "../ui/Chip";
import PrimaryButton from "../ui/PrimaryButton";
import {
  categories,
  priorityStyles,
  priorities,
  recurrenceOptions,
  type PriorityOption,
} from "./helper";

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddTaskModal = ({ visible, onClose }: AddTaskModalProps) => {
  useDeviceContext(tw);

  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [selectedRecurrence, setSelectedRecurrence] = useState(
    recurrenceOptions[0],
  );
  const [selectedCategory, setSelectedCategory] = useState(categories[1].label);
  const [selectedPriority, setSelectedPriority] = useState<PriorityOption>(
    priorities[1],
  );

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 justify-end bg-black/30`}>
        <View style={tw`bg-white rounded-t-3xl px-6 pt-6 pb-8`}>
          <View style={tw`flex-row items-center justify-between mb-5`}>
            <Text style={tw`text-xl font-bold text-[#2d2a27]`}>
              Nova Tarefa
            </Text>
            <Pressable
              onPress={onClose}
              style={tw`w-10 h-10 rounded-full bg-[#f3f2f0] items-center justify-center`}
            >
              <Text style={tw`text-xl font-semibold text-[#7b9ed9]`}>×</Text>
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={tw`pb-4`}
            showsVerticalScrollIndicator={false}
          >
            <TextInput
              value={taskName}
              onChangeText={setTaskName}
              placeholder="Nome da tarefa..."
              placeholderTextColor="#b8b1aa"
              style={tw`bg-[#f8f7f5] rounded-3xl h-12 px-4 border border-[#ede7df] text-base text-[#2d2a27]`}
            />
            <View style={tw`flex-row justify-start gap-3 mt-4`}>
              <View style={tw`flex-col gap-1.5 items-start`}>
                <Text style={tw`text-xs font-semibold text-[#9B9590]`}>
                  Data
                </Text>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  style={tw`ml-[-10px] text-[#2d2a27] !bg-[#f3f2f0]`}
                />
              </View>
              <View style={tw`flex-col gap-1.5 items-start`}>
                <Text style={tw`text-xs font-semibold text-[#9B9590]`}>
                  Horário
                </Text>
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  onChange={onTimeChange}
                  style={tw`ml-[-10px]`}
                />
              </View>
            </View>
            <View style={tw`mt-5`}>
              <Text style={tw`text-xs font-semibold text-[#9b9590] mb-2`}>
                Recorrência
              </Text>
              <View style={tw`flex-row flex-wrap gap-2`}>
                {recurrenceOptions.map((option) => {
                  const active = option === selectedRecurrence;
                  return (
                    <Chip
                      key={option}
                      label={option}
                      active={active}
                      onPress={() => setSelectedRecurrence(option)}
                    />
                  );
                })}
              </View>
            </View>

            <View style={tw`mt-5`}>
              <Text style={tw`text-xs font-semibold text-[#9b9590] mb-2`}>
                Categoria
              </Text>
              <View style={tw`flex-row flex-wrap gap-2`}>
                {categories.map((category) => {
                  const active = category.label === selectedCategory;
                  return (
                    <Pressable
                      key={category.label}
                      onPress={() => setSelectedCategory(category.label)}
                      style={tw.style(
                        `rounded-3xl px-4 h-10 flex-row items-center gap-2`,
                        active
                          ? {
                              backgroundColor: category.activeBg,
                              borderColor: category.activeBorder,
                              borderWidth: 1,
                            }
                          : {
                              backgroundColor: "#ede9e3",
                              borderColor: "rgba(45,42,39,0.08)",
                              borderWidth: 1,
                            },
                      )}
                    >
                      <View
                        style={tw.style(`w-2.5 h-2.5 rounded-full`, {
                          backgroundColor: category.color,
                        })}
                      />
                      <Text
                        style={tw.style(
                          `text-sm font-semibold`,
                          active
                            ? { color: category.activeText }
                            : { color: "#9b9590" },
                        )}
                      >
                        {category.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={tw`mt-5`}>
              <Text style={tw`text-xs font-semibold text-[#9b9590] mb-2`}>
                Prioridade
              </Text>
              <View style={tw`flex-row flex-wrap gap-2`}>
                {priorities.map((priority) => {
                  const active = priority === selectedPriority;
                  const style = priorityStyles[priority];
                  return (
                    <Pressable
                      key={priority}
                      onPress={() => setSelectedPriority(priority)}
                      style={tw.style(
                        `rounded-3xl px-4 h-10 justify-center`,
                        active
                          ? {
                              backgroundColor: style.bg,
                              borderColor: style.border,
                              borderWidth: 1,
                            }
                          : {
                              backgroundColor: "#ede9e3",
                              borderColor: "rgba(45,42,39,0.08)",
                              borderWidth: 1,
                            },
                      )}
                    >
                      <Text
                        style={tw.style(
                          `text-sm font-semibold`,
                          active ? { color: style.text } : { color: "#9b9590" },
                        )}
                      >
                        {priority}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <PrimaryButton
              label="Adicionar Tarefa"
              onPress={onClose}
              style={tw`mt-6`}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;
