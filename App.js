import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import StartPage from "./quizComponents/StartPage";
import Questions from "./quizComponents/Questions";
import Finish from "./quizComponents/Finish";

const App = createStackNavigator({
  StartPage: { screen: StartPage },
  Questions: { screen: Questions },
  Finish: { screen: Finish }
});

export default App;