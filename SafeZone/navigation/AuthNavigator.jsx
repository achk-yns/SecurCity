import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";
import Loading from '../src/screens/Loading';
import Login from '../src/screens/Login';
import Start from '../src/screens/Start';
import Register from '../src/screens/Register';
import TypesOfDanger from '../src/screens/TypesOfDanger';
import Dashboard from '../src/screens/Dashboard';
import NavigationFrame from '../src/screens/NavigationFrame';
import Profile from '../src/screens/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Color } from "../GlobalStyles";
import { loadUser } from '../auth/authSlice';
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadUser());
  },[])
  const AuthStackScreen = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Loading" component={Loading} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Start" component={Start} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="Danger" component={TypesOfDanger} />
    </AuthStack.Navigator>
  );

  const MainTabScreen = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "NavigationFrame") {
            iconName = focused ? "location" : "location-outline";
          } else if (route.name === "Dashboard") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Color.colorMediumaquamarine,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontFamily: "BalooThambi2-Regular",
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ tabBarLabel: "Dashboard" }}
      />
      <Tab.Screen
        name="NavigationFrame"
        component={NavigationFrame}
        options={{ tabBarLabel: "Location" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );


  return (
    <NavigationContainer>
      {user?
      
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          <MainStack.Screen name="Main" component={MainTabScreen} />
        </MainStack.Navigator>
          :
          <MainStack.Navigator screenOptions={{ headerShown: false }}>
          <MainStack.Screen name="Auth" component={AuthStackScreen} />
        </MainStack.Navigator>
          
          }
    </NavigationContainer>
  );
};

export default AuthNavigator;
