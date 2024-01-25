import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "LENOVO REGION GO",
    amount: 25000,
    date: new Date("2024-01-25"),
  },
  {
    id: "e2",
    description: "Bord Game",
    amount: 5000,
    date: new Date("2024-01-26"),
  },
  {
    id: "e3",
    description: "Critical Care",
    amount: 1700,
    date: new Date("2024-02-13"),
  },
  {
    id: "e4",
    description: "Grocery",
    amount: 1250,
    date: new Date("2024-02-20"),
  },
  {
    id: "e5",
    description: "Fuel",
    amount: 700,
    date: new Date("2024-03-09"),
  },
];

export default function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
