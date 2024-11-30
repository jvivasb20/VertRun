import { Loading } from "@/components/Loading";
import { authorizeStrava } from "@/config/oauth";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/stores/useAuthStore";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { authorize } from "react-native-app-auth";

export default function SignInScreen() {
  const { loginWithStrava, loading } = useAuthStore();

  const onLoginWithStrava = async () => {
    try {
      await loginWithStrava();
      router.replace("/(app)/(tabs)");
    } catch (error) {
      console.log("error", error);
    }
  };

  const isLoading = loading;

  return (
    <View className="flex-1 justify-center p-8" style={{ gap: 18 }}>
      <Text className="text-start text-3xl font-bold">Login</Text>

      <View className="flex flex-row items-center p-2" style={{ gap: 9 }}>
        <MaterialIcons name="alternate-email" size={24} color={Colors.light} />
        <View className="flex grow flex-row items-center justify-between rounded-md border-b border-gray-400 px-1">
          <TextInput placeholder="Email" />
        </View>
      </View>

      <View className="flex flex-row items-center p-2" style={{ gap: 9 }}>
        <MaterialIcons name="lock-outline" size={24} color={Colors.light} />
        <View className="flex grow flex-row items-center justify-between rounded-md border-b border-gray-400 px-1">
          <TextInput placeholder="Password" secureTextEntry />
          <MaterialIcons name="visibility" size={24} color={Colors.light} />
        </View>
      </View>

      <Pressable
        onPress={() => {
          console.log("Sign In");
        }}
        className="mt-4 rounded-md border-gray-300 bg-primary p-2"
      >
        <Text className="text-center text-xl font-bold text-black">Login</Text>
      </Pressable>

      <View className="my-2 flex-row items-center">
        <View className="grow border-b border-gray-300" />
        <Text className="mx-4 text-gray-500">OR</Text>
        <View className="grow border-b border-gray-300" />
      </View>

      <View className="flex-col" style={{ gap: 12 }}>
        {/* STRAVA LOGIN */}
        <TouchableOpacity
          onPress={onLoginWithStrava}
          className="flex h-12 flex-row items-center justify-center rounded-md p-2"
          style={{ gap: 10, backgroundColor: Colors.strava }}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <FontAwesome6 name="strava" size={24} color="white" />
              <Text className="text-lg font-semibold text-white">
                Login with Strava
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          disabled
          className="flex h-12 flex-row items-center justify-center rounded-md border border-gray-200 bg-gray-200 p-2"
          style={{ gap: 10 }}
        >
          <MaterialCommunityIcons
            name="google"
            size={24}
            color={Colors.light}
          />
          <Text className="text-lg font-semibold text-gray-400">
            Login with Google
          </Text>
        </TouchableOpacity>

        {/* Login with apple */}
        <TouchableOpacity
          disabled
          className="flex h-12 flex-row items-center justify-center rounded-md border border-gray-200 bg-gray-200 p-2"
          style={{ gap: 10 }}
        >
          <MaterialCommunityIcons name="apple" size={24} color={Colors.light} />
          <Text className="text-lg font-semibold text-gray-400">
            Login with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
