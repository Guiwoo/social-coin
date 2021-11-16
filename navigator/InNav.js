import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { BLACK_COLOR } from "../colors";

const Nav = createNativeStackNavigator();

const InNav = () => (
  <Nav.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: `${BLACK_COLOR}`,
      },
      headerTintColor: "white",
    }}
  >
    <Nav.Screen name="Home" component={Home} />
  </Nav.Navigator>
);

export default InNav;
