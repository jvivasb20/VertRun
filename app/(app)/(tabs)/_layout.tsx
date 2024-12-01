import { Redirect, Tabs } from "expo-router";
import React, { useMemo } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useAuthStore } from "@/stores/useAuthStore";
import { MaterialIcons } from "@expo/vector-icons";
import { KCOLORS } from "@/constants/Colors";

export default function TabLayout() {
  const { user } = useAuthStore();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  const tabs = useMemo(
    () => [
      { name: "index", title: "Activities", icon: "directions-run" },
      { name: "montlyStats", title: "Stats", icon: "query-stats" },
    ],
    [],
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarActiveTintColor: KCOLORS.secondary,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={28} name={tab.icon as any} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
