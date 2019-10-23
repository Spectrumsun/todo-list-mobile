import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = enteredGoal => {
    setCourseGoals(courseGoals => [
      ...courseGoals,
      {
        key: Math.random().toString(),
        value: enteredGoal
      }
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(courseGoals => {
      return courseGoals.filter(goal => goal.key !== goalId);
    });
  };

  const callSetIsAddMode = value => {
    setIsAddMode(value);
  };

  return (
    <View style={styles.screen}>
      <Button
        title="Add New Goal"
        onPress={callSetIsAddMode.bind(this, true)}
      />
      <GoalInput
        addGoalHandler={addGoalHandler}
        visible={isAddMode}
        callSetIsAddMode={callSetIsAddMode}
      />
      <FlatList
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            id={itemData.item.key}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 50 }
});
