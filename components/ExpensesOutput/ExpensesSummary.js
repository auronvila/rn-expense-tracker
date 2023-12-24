import {Text, View, StyleSheet} from 'react-native';
import {GlobalStyles} from '../../constans/styles';

export default function ExpensesSummary({periodName, expenses}) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0)

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.summary}>${expensesSum.toFixed(2)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  summary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500
  }
})