import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ContactsScreen } from "./screens/ContactsScreen.js";
import { ViewDetailsScreen } from "./screens/ViewDetailsScreen.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ContactsScreen"
          component={ContactsScreen}
          options={{ title: "All Contacts" }}
        />
        <Stack.Screen
          name="ViewDetailsScreen"
          component={ViewDetailsScreen}
          options={{ title: "Contact Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    fontSize: 20,
  },
  listItem: {
    flexDirection: "row",
    width: 250,
    justifyContent: "space-between",
    padding: 2,
    backgroundColor: "#ccc",
    borderColor: "lavender",
    borderWidth: 1,
    marginVertical: 2,
    fontSize: 20,
  },
});