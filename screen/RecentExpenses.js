import { Text, View } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";

export default function RecentExpenses() {
  return <ExpensesOutput expensesPeriod="Last 7 days" />;
}
