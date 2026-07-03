import React, { useState } from "react";
import { View } from "react-native";
import tw from "../lib/tailwind";
import { useDeviceContext } from "twrnc";
import { HomeScreen } from "../screens/home";
import { CalendarScreen } from "../screens/calendar";
import { TabNavigator } from "../components/tabNavigator";

type ActiveTab = "today" | "calendar" | "routine" | "all";

const AppNavigator = () => {
  useDeviceContext(tw);
  const [activeTab, setActiveTab] = useState<ActiveTab>("today");

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  const handleAddPress = () => {
    // TODO: Implementar lógica para adicionar nova tarefa
    console.log("Add button pressed");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "today":
        return <HomeScreen />;
      case "calendar":
        return <CalendarScreen />;
      case "routine":
        // TODO: Implementar tela de rotina
        return <View style={tw`flex-1 bg-white items-center justify-center`} />;
      case "all":
        // TODO: Implementar tela de todas as tarefas
        return <View style={tw`flex-1 bg-white items-center justify-center`} />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>{renderContent()}</View>
      <TabNavigator
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onAddPress={handleAddPress}
      />
    </View>
  );
};

export default AppNavigator;
