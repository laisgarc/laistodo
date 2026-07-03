import React, { useState } from "react";
import { View } from "react-native";
import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { HomeScreen } from "../screens/home";
import { CalendarScreen } from "../screens/calendar";
import { RoutineScreen } from "../screens/routine";
import { AllScreen } from "../screens/all";
import { TabNavigator } from "../components/tabNavigator";
import AddTaskModal from "../components/addTaskModal/addTaskModal";

type ActiveTab = "today" | "calendar" | "routine" | "all";

const AppNavigator = () => {
  useDeviceContext(tw);
  const [activeTab, setActiveTab] = useState<ActiveTab>("today");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  const handleAddPress = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "today":
        return <HomeScreen />;
      case "calendar":
        return <CalendarScreen />;
      case "routine":
        return <RoutineScreen />;
      case "all":
        return <AllScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>{renderContent()}</View>
      <AddTaskModal visible={isAddModalVisible} onClose={closeAddModal} />

      <TabNavigator
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onAddPress={handleAddPress}
      />
    </View>
  );
};

export default AppNavigator;
