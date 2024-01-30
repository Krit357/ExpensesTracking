import { createContext, useReducer } from "react";

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

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ description, amount, date }) => {},
  deleteExpenses: (id) => {},
  updateExpenses: ({ id, description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "Add":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "Update":
      const updateAbleIndex = state.findIndex(
        (expenses) => expenses.id === action.payload.id
      );

      const updateableExpenses = state[updateAbleIndex];
      const updateItem = {
        ...updateableExpenses,
        ...action.payload.data,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updateAbleIndex] = updateItem;
      return updatedExpenses;
    case "Delete":
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpenses(expensesData) {
    dispatch({ type: "Add", payload: expensesData });
  }

  function deleteExpenses(id) {
    dispatch({ type: "Delete", payload: { id } });
  }

  function updateExpenses(id, expensesData) {
    dispatch({ type: "Update", payload: { id: id, data: expensesData } });
  }

  const value = {
    expenses: expensesState,
    addExpenses: addExpenses,
    deleteExpenses: deleteExpenses,
    updateExpenses: updateExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
