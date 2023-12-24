import {createContext, useReducer} from 'react';

const dummyExpenses = [
  {
    id: '1',
    description: 'pair of shoes',
    amount: 12,
    date: new Date('2021-12-19')
  },
  {
    id: '2',
    description: 't-shirt',
    amount: 11.32,
    date: new Date()
  },
  {
    id: '3',
    description: 'shorts',
    amount: 12,
    date: new Date('2022-12-19')
  }
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {
  },
  deleteExpense: (id) => {
  },
  updateExpense: (id, {description, amount, date}) => {
  }
});

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{...action.payload, id: id}, ...state]
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex((expense) => {
        return expense.id === action.payload.id;
      });
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state
  }
}

function ExpensesContextProvider({children}) {
  const [expenses, dispatch] = useReducer(reducer, dummyExpenses);

  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }

  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id})
  }

  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}})

  }

  const value = {
    expenses: expenses,
    addExpense,
    deleteExpense,
    updateExpense
  }

  return (<ExpensesContext.Provider value={value}>
    {children}
  </ExpensesContext.Provider>)
}

export default ExpensesContextProvider;