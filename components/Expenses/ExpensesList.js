import { FlatList, Text, View } from "react-native";
import ExpensesItem from "./ExpensesItem";

export default function ExpensesList({ expenses }) {
  function renderExpensesItem(itemData) {
    return <ExpensesItem {...itemData.item} />;
  }

  return (
    <FlatList
      data={expenses}
      renderItem={renderExpensesItem}
      keyExtractor={(item) => item.id}
    />
  );
}
