import React from "react";
import { Color } from "./GlobalStyles";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";



import store from "./store";
import AuthNavigator from "./navigation/AuthNavigator";


const App = () => {
  
  const [fontsLoaded, error] = useFonts({
    "Acme-Regular": require("./assets/fonts/Acme-Regular.ttf"),
    "Almarai-Bold": require("./assets/fonts/Almarai-Bold.ttf"),
    "Almarai-ExtraBold": require("./assets/fonts/Almarai-ExtraBold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "BalooThambi2-Regular": require("./assets/fonts/BalooThambi2-Regular.ttf"),
    "BalooThambi2-Medium": require("./assets/fonts/BalooThambi2-Medium.ttf"),
    "BalooThambi2-ExtraBold": require("./assets/fonts/BalooThambi2-ExtraBold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

 
  return (
    <Provider store={store}>
      <AuthNavigator />
    </Provider>
  );
};

export default App;