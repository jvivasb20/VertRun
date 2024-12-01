// app/activities/[id].tsx
import React from "react";

import { View, Text, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useQuery } from "@tanstack/react-query";
import { fetchActivity } from "@/api/activities";
import { IconActivity } from "@/components/Icons";
import {
  formatDistance,
  formatElevation,
  formatTime,
} from "@/utils/converters";
import { LoadingContainer } from "@/components/Loading";
import { Activities } from "@/types/Activities";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLocalSearchParams } from "expo-router/build/hooks";

export default function ActivityDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { accessToken } = useAuthStore();

  const { data: activity, isLoading } = useQuery<Activities>({
    queryKey: ["activity", id],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }

      return await fetchActivity(accessToken, parseInt(id as string));
    },
  });

  if (isLoading) return <LoadingContainer />;

  if (!activity) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-center text-gray-500">Activity not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="mb-6 flex items-center">
        <IconActivity type={activity.type} />
        <Text className="mt-4 text-2xl font-bold">{activity.name}</Text>
        <Text className="text-sm text-gray-500">
          {new Date(activity.start_date_local).toLocaleDateString()}
        </Text>
      </View>

      {/* Metrics */}
      <View className="mb-6">
        <DetailMetric
          label="Distance"
          value={formatDistance(activity.distance)}
          icon="map-marker-distance"
        />
        <DetailMetric
          label="Time"
          value={formatTime(activity.elapsed_time)}
          icon="timer-outline"
        />
        <DetailMetric
          label="Elevation Gain"
          value={formatElevation(activity.total_elevation_gain)}
          icon="elevation-rise"
        />
      </View>

      {/* Additional Information */}
      <View className="rounded-lg bg-white p-4 shadow">
        <Text className="mb-2 text-lg font-bold">Additional Info</Text>
        <Text className="text-sm text-gray-700">
          <Text className="font-bold">Sport Type: </Text>
          {activity.sport_type}
        </Text>
        <Text className="text-sm text-gray-700">
          <Text className="font-bold">Achievements: </Text>
          {activity.achievement_count}
        </Text>
      </View>
    </ScrollView>
  );
}

const DetailMetric = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) => (
  <View className="mb-4 flex flex-row items-center justify-between">
    <Text className="text-sm text-gray-700">{label}</Text>
    <View className="flex flex-row items-center">
      <Text className="mr-2 text-base font-bold text-black">{value}</Text>
      <MaterialCommunityIcons name={icon as any} size={20} color="black" />
    </View>
  </View>
);
