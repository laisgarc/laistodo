import React from "react";
import { ScrollView, View, Text } from "react-native";
import tw from "../../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { Clock, RotateCcw, CheckCircle } from "lucide-react-native";
import { SectionBadge, TaskCard } from "../../components";
import { sections } from "./helper";

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
          <SectionBadge
            title={section.title}
            count={section.items.length}
            color={section.color}
            titleStyle={tw`uppercase tracking-[0.2px] text-[#9b9590]`}
            countStyle={tw`text-xs text-[#9b9590]`}
          />

          {section.items.map((item) => (
            <TaskCard
              key={item.id}
              task={item}
              renderMeta={
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
                      <CheckCircle size={12} color={item.dotColor} />
                    ) : (
                      <RotateCcw size={12} color="#7b9ed9" />
                    )}
                    <Text style={tw`text-xs font-semibold text-[#7b9ed9]`}>
                      {item.category}
                    </Text>
                  </View>
                </View>
              }
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default AllScreen;
