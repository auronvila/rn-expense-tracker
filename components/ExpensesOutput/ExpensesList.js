import {FlatList, Text} from 'react-native';
import ExpenseItem from './ExpenseItem';

export default function ExpensesList({expenses}) {

  function renderExpenseItem(itemData) {
    return (
      <ExpenseItem {...itemData.item} />
    )
  }

  return (
    <FlatList keyExtractor={(item) => item.id} data={expenses} renderItem={renderExpenseItem}/>
  )
}