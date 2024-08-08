import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useContext } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthContext, AuthProvider } from "@/context/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

function Layout() { //app/_layout
  const { userInfo, splahLoading } = useContext(AuthContext);

  return (
    <Stack>
      {splahLoading ? (
        <Stack.Screen name="splashScreen" options={{ headerShown: false }} />
      ) : userInfo?.token ? (
        <Stack.Screen name="[orgId]/index" options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        </>
      )}

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
