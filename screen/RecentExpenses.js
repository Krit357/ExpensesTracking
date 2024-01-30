import { Text, View } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

export default function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);

  const recentExpenses = expensesContext.expenses.filter((expenese) => {
    const today = new Date();
    const tillLastWeek = getDateMinusDays(today, 7);

    return expenese.date >= tillLastWeek && expenese.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No item for last 7 days"
    />
  );
}
