import {StyleSheet, Text, View} from 'react-native';
import Input from './Input';
import {useContext, useState} from 'react';
import Button from '../ui/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ExpensesContext} from '../../store/expenses-context';

export default function ExpenseForm({defaultValues}) {
  const [inputValue, setInputValue] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : '',
    date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
    description: defaultValues ? defaultValues.description : ''
  })
  const navigation = useNavigation()
  const location = useRoute()
  const editedExpenseId = location.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const {deleteExpense, addExpense, updateExpense, expenses} = useContext(ExpensesContext)

  function amountChangeHandler(inputIdentifier, enteredValue) {
    setInputValue((currentInputValue) => {
      return {
        ...currentInputValue,
        [inputIdentifier]: enteredValue
      }
    })
  }


  function cancelHandler() {
    navigation.goBack()
  }


  function confirmHandler() {
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description
    }
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      alert('Invalid input please check your input values and try again')
      return
    }


    if (isEditing) {
      updateExpense(editedExpenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input style={styles.rowInput} label={'Amount'} textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: amountChangeHandler.bind(this, 'amount'),
          value: inputValue.amount
        }}/>
        <Input
          style={styles.rowInput}
          label={'Date'}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: amountChangeHandler.bind(this, 'date'),
            value: inputValue.date
          }}
        />
      </View>
      <Input
        label={'Description'}
        textInputConfig={{
          multiline: true,
          onChangeText: amountChangeHandler.bind(this, 'description'),
          value: inputValue.description
        }}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.buttonStyle} mode={'flat'} onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.buttonStyle} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  form: {
    marginTop: 30
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  title: {
    marginVertical: 24,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8
  }
})