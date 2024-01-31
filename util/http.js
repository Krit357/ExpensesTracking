import axios from "axios";

const URL =
  "https://reactnativecourse-b8cab-default-rtdb.asia-southeast1.firebasedatabase.app/";

export async function storeExpense(expenseData) {
  const response = await axios.post(`${URL}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpense() {
  const res = await axios.get(`${URL}/expenses.json`);

  const expenses = [];
  // console.log(res.data);
  for (const key in res.data) {
    const expenseObject = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    };
    expenses.push(expenseObject);
  }
  return expenses;
}

export function updateExpenses(id, expenseData) {
  return axios.put(URL + `/expenses/${id}.json`, expenseData);
}
export function deleteExpenses(id) {
  return axios.delete(URL + `/expenses/${id}.json`);
}
