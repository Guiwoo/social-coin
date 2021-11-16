import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import InNav from "./navigator/InNav";
import OutNav from "./navigator/OutNav";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {isLoggedIn ? <InNav /> : <OutNav />}
      </NavigationContainer>
    </QueryClientProvider>
  );
}
