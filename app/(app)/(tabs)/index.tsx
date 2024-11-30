import { useAuthStore } from "@/stores/useAuthStore";
import { View, Text } from "react-native";

export default function HomeScreen() {
  const { user } = useAuthStore();
  return (
    <View className="flex-1 justify-center p-8" style={{ gap: 18 }}>
      <Text className="text-start text-3xl font-bold">Home</Text>
      <Text className="text-start text-xl">
        Bienvenido! {user?.firstname} {user?.lastname}
      </Text>
    </View>
  );
}
