// import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/RootNavigator/RootNavigator";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import store from "./src/Redux";
import { PaperProvider } from 'react-native-paper';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  const statusBarHeight = StatusBar.currentHeight;
  const [fontsLoaded] = useFonts({
    "Anton-Regular": require("./assets/fonts/Anton-Regular.ttf"),
    "BlackOpsOne-Regular": require("./assets/fonts/BlackOpsOne-Regular.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
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
    <Provider store={store}>
      <PaperProvider>
        <StripeProvider publishableKey="pk_test_51NmtsdJeDgOnT3c8r5hUl16XyJ953fFZguctCQq8BJUmzav84zPBNO5iDIeWuafwCBz7OsKYC5WSpVaQBeAZ4nps00ObVrSCWv">
          <NavigationContainer onLayout={onLayoutRootView}>
            <SafeAreaView style={[styles.container, { marginTop: statusBarHeight }]}>
              <RootNavigator />
            </SafeAreaView>
          </NavigationContainer>
        </StripeProvider>
      </PaperProvider>
    </Provider>
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
