import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({ description, amount, date }) => {},
  setExpenses: (expenese) => {},
  deleteExpenses: (id) => {},
  updateExpenses: ({ id, description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "Add":
      return [action.payload, ...state];
    case "Set":
      const inverted = action.payload.reverse();
      return inverted;
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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpenses(expensesData) {
    dispatch({ type: "Add", payload: expensesData });
  }

  function setExpenses(expenese) {
    dispatch({ type: "Set", payload: expenese });
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
    setExpenses: setExpenses,
    deleteExpenses: deleteExpenses,
    updateExpenses: updateExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
