import { KCOLORS } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export const Metric = ({
  value,
  iconName,
}: {
  value: string;
  iconName?: string;
}) => (
  <View className="flex flex-row items-center justify-end" style={{ gap: 9 }}>
    <Text
      className={`font-bold ${iconName ? "text-sm text-gray-400" : "text-xl text-black"}`}
    >
      {value}
    </Text>

    {iconName && (
      <MaterialCommunityIcons
        name={iconName as any}
        size={18}
        color={KCOLORS.primary}
      />
    )}
  </View>
);
