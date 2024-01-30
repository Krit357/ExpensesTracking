import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesForm from "../components/ManageExpenses/ExpensesForm";

export default function ManageExpense({ route, navigation }) {
  const expensesContext = useContext(ExpensesContext);
  const editExpenseId = route.params?.expenseId;
  const isEditing = !!editExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  function deleteExpensesHandeler() {
    console.log("Delete button clicked");
    expensesContext.deleteExpenses(editExpenseId);
    navigation.goBack();
  }

  function cancelHandeler() {
    navigation.goBack();
  }

  function confirmHandeler(expensesData) {
    {
      isEditing
        ? expensesContext.updateExpenses(editExpenseId, expensesData)
        : expensesContext.addExpenses(expensesData);
    }

    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ExpensesForm
        submitButtonLabel={isEditing ? "Update item" : "Add item"}
        isEditing={isEditing}
        onSubmit={confirmHandeler}
        onCancel={cancelHandeler}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color="white"
            size={24}
            onPress={deleteExpensesHandeler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    margin: 16,
    paddingTop: 8,
    borderTop: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginBottom: 8,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
