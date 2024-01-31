import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpensesForm from "../components/ManageExpenses/ExpensesForm";
import { storeExpense, updateExpenses, deleteExpenses } from "../util/http";
import IsLoading from "../components/UI/IsLoading";

export default function ManageExpense({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState();

  const expensesContext = useContext(ExpensesContext);
  const editExpenseId = route.params?.expenseId;
  const isEditing = !!editExpenseId;

  const selectedExpenses = expensesContext.expenses.find(
    (expense) => expense.id === editExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  async function deleteExpensesHandeler() {
    setIsSubmiting(true);
    try {
      await deleteExpenses(editExpenseId);
      expensesContext.deleteExpenses(editExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Cannot delete");
    }
    setIsSubmiting(false);
  }

  function cancelHandeler() {
    navigation.goBack();
  }

  async function confirmHandeler(expensesData) {
    setIsSubmiting(true);
    try {
      if (isEditing) {
        //Update
        setIsLoading(true);
        expensesContext.updateExpenses(editExpenseId, expensesData);
        await updateExpenses(editExpenseId, expensesData);
      } else {
        //Adding
        setIsLoading(true);
        const id = await storeExpense(expensesData);
        expensesContext.addExpenses({ ...expensesData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Cannot confirm data");
      isSubmiting(false);
    }
    setIsLoading(false);
  }

  function errorHandeler() {
    setError(null);
  }

  if (error && !isSubmiting) {
    return <ErrorOverlay message={error} onConfirm={errorHandeler} />;
  }

  if (isLoading) return <IsLoading />;

  return (
    <View style={styles.container}>
      <ExpensesForm
        submitButtonLabel={isEditing ? "Update item" : "Add item"}
        isEditing={isEditing}
        onSubmit={confirmHandeler}
        onCancel={cancelHandeler}
        defaultValues={selectedExpenses}
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
