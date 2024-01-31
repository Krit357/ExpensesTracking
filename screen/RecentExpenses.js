import { Text, View } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";
import IsLoading from "../components/UI/IsLoading";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  const recentExpenses = expensesContext.expenses.filter((expenese) => {
    const today = new Date();
    const tillLastWeek = getDateMinusDays(today, 7);

    return expenese.date >= tillLastWeek && expenese.date <= today;
  });

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <IsLoading />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No item for last 7 days"
    />
  );
}
