import { KCOLORS } from "@/constants/Colors";
import { ActivityIndicator, View } from "react-native";

export const Loading = () => {
  return <ActivityIndicator size="small" color="white" />;
};

export const LoadingContainer = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" className="text-gray-400" />
    </View>
  );
};
