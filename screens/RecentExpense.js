import {Text, View} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {useContext} from 'react';
import {ExpensesContext} from '../store/expenses-context';
import dayjs from 'dayjs';

export default function RecentExpense() {
  const {expenses} = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((expense) => {
    const sevenDaysAgo = dayjs().subtract(7, 'days');
    const expenseDate = dayjs(expense.date).toDate()

    return (expenseDate >= sevenDaysAgo) && (expense.date < dayjs())
  })

  return (
    <ExpensesOutput
      fallbackText={'No expensed were registered for the last 7 days'}
      expenses={recentExpenses}
      expensesPeriod={'Last 7 days'}/>
  )
}