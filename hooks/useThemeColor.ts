/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { KCOLORS } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof KCOLORS.light & keyof typeof KCOLORS.dark,
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return KCOLORS[theme][colorName];
  }
}
