import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";

const recurrenceOptions = ["Sem recorrência", "Diário", "Semanal", "Mensal"];

const categories = [
  {
    label: "Trabalho",
    color: "#7b9ed9",
    activeBg: "rgba(123,158,217,0.13)",
    activeBorder: "rgba(123,158,217,0.27)",
    activeText: "#7b9ed9",
  },
  {
    label: "Pessoal",
    color: "#82c9a0",
    activeBg: "rgba(130,201,160,0.13)",
    activeBorder: "rgba(130,201,160,0.27)",
    activeText: "#82c9a0",
  },
  {
    label: "Saúde",
    color: "#f4a8b5",
    activeBg: "rgba(244,168,181,0.13)",
    activeBorder: "rgba(244,168,181,0.27)",
    activeText: "#f4a8b5",
  },
  {
    label: "Finanças",
    color: "#c4a8d9",
    activeBg: "rgba(196,168,217,0.13)",
    activeBorder: "rgba(196,168,217,0.27)",
    activeText: "#c4a8d9",
  },
];

const priorityStyles: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  Baixa: {
    bg: "rgba(155,149,144,0.13)",
    border: "rgba(155,149,144,0.27)",
    text: "#9b9590",
  },
  Média: {
    bg: "rgba(242,201,122,0.13)",
    border: "rgba(242,201,122,0.27)",
    text: "#f2c97a",
  },
  Alta: {
    bg: "rgba(155,149,144,0.13)",
    border: "rgba(155,149,144,0.27)",
    text: "#9b9590",
  },
};

const priorities = ["Baixa", "Média", "Alta"];

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddTaskModal = ({ visible, onClose }: AddTaskModalProps) => {
  useDeviceContext(tw);

  const [taskName, setTaskName] = useState("");
  const [selectedRecurrence, setSelectedRecurrence] = useState(
    recurrenceOptions[0],
  );
  const [selectedCategory, setSelectedCategory] = useState(categories[1].label);
  const [selectedPriority, setSelectedPriority] = useState(priorities[1]);

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

            <View style={tw`mt-5`}>
              <Text style={tw`text-xs font-semibold text-[#9b9590] mb-2`}>
                Recorrência
              </Text>
              <View style={tw`flex-row flex-wrap gap-2`}>
                {recurrenceOptions.map((option) => {
                  const active = option === selectedRecurrence;
                  return (
                    <Pressable
                      key={option}
                      onPress={() => setSelectedRecurrence(option)}
                      style={tw.style(
                        `rounded-3xl px-4 h-10 justify-center`,
                        active
                          ? `bg-[#7b9ed9]`
                          : `bg-[#f8f7f5] border border-[#ede7df]`,
                      )}
                    >
                      <Text
                        style={tw.style(
                          `text-sm font-semibold`,
                          active ? `text-white` : `text-[#2d2a27]`,
                        )}
                      >
                        {option}
                      </Text>
                    </Pressable>
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
                              backgroundColor: "#ede9e3",
                              borderColor: "rgba(45,42,39,0.08)",
                              borderWidth: 1,
                            }
                          : {
                              backgroundColor: style.bg,
                              borderColor: style.border,
                              borderWidth: 1,
                            },
                      )}
                    >
                      <Text
                        style={tw.style(
                          `text-sm font-semibold`,
                          active ? { color: "#9b9590" } : { color: style.text },
                        )}
                      >
                        {priority}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <Pressable
              onPress={onClose}
              style={tw`mt-6 bg-[#7b9ed9] rounded-3xl h-14 items-center justify-center`}
            >
              <Text style={tw`text-base font-semibold text-white`}>
                Adicionar Tarefa
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;
