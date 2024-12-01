import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LineGraph, GraphPoint } from "react-native-graph";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";
import { fetchActivities } from "@/api/activities";
import { LoadingContainer } from "@/components/Loading";
import {
  formatDistance,
  formatElevation,
  formatTime,
} from "@/utils/converters";
import { Activities } from "@/types/Activities";
import { KCOLORS } from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";

enum FilterRange {
  ONE_WEEK = "1W",
  ONE_MONTH = "1M",
  THREE_MONTHS = "3M",
  ONE_YEAR = "1Y",
  ALL = "ALL",
}

export default function MonthlyStatsScreen() {
  const { accessToken } = useAuthStore();
  const [selectedPoint, setSelectedPoint] = useState<GraphPoint | null>(null);
  const [filterRange, setFilterRange] = useState<FilterRange>(
    FilterRange.THREE_MONTHS,
  );

  const getDateThreshold = (range: FilterRange) => {
    const now = new Date();
    switch (range) {
      case FilterRange.ONE_WEEK:
        return now.getTime() - 7 * 24 * 60 * 60 * 1000;
      case FilterRange.ONE_MONTH:
        return now.getTime() - 30 * 24 * 60 * 60 * 1000;
      case FilterRange.THREE_MONTHS:
        return now.getTime() - 90 * 24 * 60 * 60 * 1000;
      case FilterRange.ONE_YEAR:
        return now.getTime() - 365 * 24 * 60 * 60 * 1000;
      default:
        return 0;
    }
  };

  const allActivitiesQuery = useQuery<Activities[]>({
    queryKey: ["activities"],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      return fetchActivities(accessToken, {});
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const filteredData = allActivitiesQuery.data?.filter((activity) => {
    if (filterRange === FilterRange.ALL) return true;
    const activityDate = new Date(activity.start_date_local).getTime();
    return activityDate >= getDateThreshold(filterRange);
  });

  const stats = filteredData?.reduce(
    (
      acc: { totalDistance: number; totalTime: number; totalElevation: number },
      activity: Activities,
    ) => {
      acc.totalDistance += activity.distance || 0;
      acc.totalTime += activity.elapsed_time || 0;
      acc.totalElevation += activity.total_elevation_gain || 0;
      return acc;
    },
    { totalDistance: 0, totalTime: 0, totalElevation: 0 },
  ) || { totalDistance: 0, totalTime: 0, totalElevation: 0 };

  const distanceGraphData =
    filteredData?.map((activity) => ({
      date: new Date(activity.start_date_local),
      value: activity.distance || 0,
    })) || [];

  const timeGraphData =
    filteredData?.map((activity) => ({
      date: new Date(activity.start_date_local),
      value: activity.elapsed_time || 0,
    })) || [];

  const elevationGraphData =
    filteredData?.map((activity) => ({
      date: new Date(activity.start_date_local),
      value: activity.total_elevation_gain || 0,
    })) || [];

  const navigateToActivities = () => {
    const dateThreshold = getDateThreshold(filterRange);

    router.push(`/activities?dateThreshold=${dateThreshold}`);
  };

  if (allActivitiesQuery.isLoading) return <LoadingContainer />;

  if (allActivitiesQuery.isError) {
    console.error("Error fetching activities:", allActivitiesQuery.error);
    return (
      <Text className="text-center text-red-500">
        Failed to fetch activities.
      </Text>
    );
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <ScrollView
        className="flex-1 bg-gray-100"
        contentContainerStyle={{ gap: 18, padding: 18 }}
      >
        {/* KPIs */}
        <View className="flex flex-row items-center justify-between">
          {/* Distance  */}
          <View className="flex flex-col items-center justify-center">
            <Text className="text-lg text-gray-600">Distance</Text>
            <Text className="text-xl font-bold text-black">
              {formatDistance(stats.totalDistance)}
            </Text>
          </View>

          {/* Time */}
          <View className="flex flex-col items-center justify-center">
            <Text className="text-lg text-gray-600">Time</Text>
            <Text className="text-xl font-bold text-black">
              {formatTime(stats.totalTime)}
            </Text>
          </View>

          {/* Elevation */}
          <View className="flex flex-col items-center justify-center">
            <Text className="text-lg text-gray-600">Elevation Gain</Text>
            <Text className="text-xl font-bold text-black">
              {formatElevation(stats.totalElevation)}
            </Text>
          </View>
        </View>

        {/* Graphs */}
        <View className="flex flex-row items-center justify-between">
          {/* Elevation Graph */}
          <View className="flex h-[25vh] w-[45vw] rounded-lg bg-white p-4 shadow">
            <Text className="mb-4 text-lg font-bold">Elevation Gain (ft)</Text>
            <LineGraph
              style={{ flex: 1 }}
              points={elevationGraphData}
              animated={true}
              color={KCOLORS.secondary}
              enablePanGesture={true}
              enableIndicator={true}
              selectionDotShadowColor={KCOLORS.secondary}
              gradientFillColors={[KCOLORS.primary, "white"]}
              lineThickness={5}
            />
          </View>
          {/* Time Graph */}
          <View className="flex h-[25vh] w-[45vw] rounded-lg bg-white p-4 shadow">
            <Text className="mb-4 text-lg font-bold">Time (minutes)</Text>
            <LineGraph
              style={{ flex: 1 }}
              points={timeGraphData.map((d) => ({
                ...d,
                value: d.value / 60,
              }))}
              animated={true}
              color={KCOLORS.secondary}
              enablePanGesture={true}
              enableIndicator={true}
              selectionDotShadowColor={KCOLORS.secondary}
              gradientFillColors={[KCOLORS.primary, "white"]}
              lineThickness={5}
            />
          </View>
        </View>

        {/* Distance Graph */}
        <View className="flex h-[25vh] rounded-lg bg-white p-4 shadow">
          <Text className="mb-4 text-lg font-bold">Distance (mi)</Text>
          <LineGraph
            style={{ flex: 1 }}
            points={distanceGraphData}
            animated={true}
            color={KCOLORS.secondary}
            enablePanGesture={true}
            enableIndicator={true}
            selectionDotShadowColor={KCOLORS.secondary}
            gradientFillColors={[KCOLORS.primary, "white"]}
            lineThickness={5}
          />
        </View>

        {/* Date Filters */}

        <View className="flex grow flex-row items-center justify-evenly rounded-lg bg-white p-4 shadow">
          {Object.values(FilterRange).map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setFilterRange(range)}
              className={`flex flex-row items-center justify-center rounded-md px-4 py-2 ${
                filterRange === range ? "bg-gray-200" : ""
              }`}
            >
              <Text className="text-sm font-bold text-gray-600">{range}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nav to Activities */}
        <Text
          className="text-right font-bold text-secondary"
          onPress={navigateToActivities}
        >
          See Activities
        </Text>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
