import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { fetchActivities } from "@/api/activities";
import { IconActivity } from "@/components/Icons";
import { LoadingContainer } from "@/components/Loading";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  formatDistance,
  formatElevation,
  formatTime,
} from "@/utils/converters";
import { Activities } from "@/types/Activities";
import { Metric } from "@/components/Activities";
import { Placeholder128 } from "@/constants/Placeholders";
import { router } from "expo-router";
import { Image } from "expo-image";

export default function ActivitiesScreen() {
  const { user, accessToken } = useAuthStore();

  const activitiesQuery = useQuery<Activities[]>({
    queryKey: ["activities"],
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const activities = await fetchActivities(accessToken, {});
      return activities || [];
    },
    staleTime: 5 * 60 * 1000, // Cache activities for 5 minutes
    refetchOnWindowFocus: false,
  });

  const renderActivityItem = ({ item }: { item: Activities }) => (
    <TouchableOpacity
      className="mb-3 flex flex-row justify-between rounded-lg bg-white p-4 shadow"
      onPress={() => router.push(`/activities/${item.id}`)}
    >
      {/* Activity Type Icon */}
      <View className="flex items-center justify-center">
        <IconActivity type={item.type} />
      </View>

      {/* Activity Info */}
      <View className="mx-4 flex-1">
        <Text className="text-xs text-gray-500">
          {new Date(item.start_date_local).toLocaleDateString()}
        </Text>
        <Text className="text-lg font-bold">{item.name}</Text>
      </View>

      {/* Activity Metrics (Distance, Time, Elevation) */}
      <View className="flex items-end justify-between">
        <Metric value={formatDistance(item.distance)} />
        <Metric
          value={formatTime(item.elapsed_time)}
          iconName="timer-outline"
        />
        <Metric
          value={formatElevation(item.total_elevation_gain)}
          iconName="elevation-rise"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      {/* User Info */}
      <View className="flex flex-row items-center p-4">
        <Image
          source={user?.profile}
          placeholder={Placeholder128}
          className="h-24 w-24 rounded-full"
          contentFit="cover"
          transition={500}
        />
        <Text className="ml-4 text-lg font-bold">
          {user?.firstname} {user?.lastname}
        </Text>
      </View>

      {/* Activities List */}
      {activitiesQuery.isLoading ? (
        <LoadingContainer />
      ) : (
        <FlatList
          data={activitiesQuery.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderActivityItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <Text className="text-center text-gray-500">
              No activities found!
            </Text>
          }
        />
      )}
    </View>
  );
}
