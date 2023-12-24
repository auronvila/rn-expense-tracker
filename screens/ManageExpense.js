import {StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useContext, useLayoutEffect} from 'react';
import IconButton from '../components/ui/IconButton';
import {GlobalStyles} from '../constans/styles';
import Button from '../components/ui/Button';
import {ExpensesContext} from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

export default function ManageExpense() {
  const location = useRoute()
  const navigation = useNavigation()
  const {deleteExpense, addExpense, updateExpense, expenses} = useContext(ExpensesContext)

  const editedExpenseId = location.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find((expense) => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);


  function deleteExpenseHandler() {
    deleteExpense(editedExpenseId)
    navigation.goBack()
  }


  return (
    <View style={styles.container}>
      <ExpenseForm
      defaultValues={selectedExpense}
      />

      {isEditing &&
        <View style={styles.deleteContainer}>
          <IconButton onPress={deleteExpenseHandler} iconName={'trash'} size={36} color={GlobalStyles.colors.error500}/>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },

})