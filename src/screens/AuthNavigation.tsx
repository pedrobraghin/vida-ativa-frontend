import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PropsNavigationStack } from "./Models";

import LoginScreen from "./auth/LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import RegisterScreens from "./auth/RegisterScreens";
import useLocalStorage from "../hooks/useLocalStorage";
import ResetPasswordScreen from "./auth/ResetPasswordScreen";
import ForgotPasswordScreen from "./auth/ForgotPasswordScreen";

const Stack = createNativeStackNavigator<PropsNavigationStack>();

export default function RootNavigation() {
  const { retrieveItem, setItem } = useLocalStorage();
  const [appIsReady, setAppIsReady] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        SplashScreen.preventAutoHideAsync();
        const firstTime = await retrieveItem("@vida-ativa:first-time");
        if (firstTime?.trim()) {
          setIsFirstTime(firstTime == "true");
        } else {
          setIsFirstTime(true);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setItem("@vida-ativa:first-time", "false");
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={isFirstTime ? "Welcome" : "Login"}
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      {isFirstTime && (
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreens}
        options={{
          headerTransparent: true,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          headerTitle: "",
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
