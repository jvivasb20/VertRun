import { KCOLORS } from "@/constants/Colors";
import { ActivityType } from "@/types/Activities";
import { FontAwesome6 } from "@expo/vector-icons";
import { View } from "react-native";

const activityIcons = {
  [ActivityType.Hike]: "person-hiking",
  [ActivityType.Run]: "person-running",
  [ActivityType.Walk]: "person-walking",
};

type IconActivityProps = {
  type: ActivityType;
};

export const IconActivity: React.FC<IconActivityProps> = ({ type }) => {
  const iconName = activityIcons[type] ?? "person-walking";

  return (
    <View
      style={{
        backgroundColor: KCOLORS.accent,
        padding: 12,
        borderRadius: 9999,
        borderColor: KCOLORS.primary,
        borderWidth: 1,
      }}
    >
      <FontAwesome6 name={iconName} size={24} color={KCOLORS.primary} />
    </View>
  );
};
