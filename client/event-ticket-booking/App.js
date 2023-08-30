// import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/RootNavigator/RootNavigator";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const statusBarHeight = StatusBar.currentHeight;
  const [fontsLoaded] = useFonts({
    "Anton-Regular": require("./assets/fonts/Anton-Regular.ttf"),
    "BlackOpsOne-Regular": require("./assets/fonts/BlackOpsOne-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>this is loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <SafeAreaView style={[styles.container, { marginTop: statusBarHeight }]}>
        <RootNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#000",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
