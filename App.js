import {StatusBar} from 'expo-status-bar';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import AllExpenses from './screens/AllExpenses';
import {GlobalStyles} from './constans/styles';
import {Ionicons} from '@expo/vector-icons'
import IconButton from './components/ui/IconButton';
import ExpensesContextProvider from './store/expenses-context';

export default function App() {
  const Stack = createNativeStackNavigator()
  const BottomTabs = createBottomTabNavigator()

  function ExpensesOverview() {
    const navigation = useNavigation()

    return (
      <BottomTabs.Navigator
        screenOptions={{
          headerTintColor: 'white',
          tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({tintColor}) => <IconButton iconName={'add'} size={24}
                                                    onPress={() => navigation.navigate('ManageExpense')}
                                                    color={tintColor}/>
        }}
      >
        <BottomTabs.Screen
          options={{
            tabBarLabel: 'Recent Expenses',
            title: 'Recent Expenses',
            tabBarIcon: ({color, size}) => <Ionicons name={'hourglass'} size={size} color={color}/>

          }}
          name={'RecentExpenses'}
          component={RecentExpense}
        />
        <BottomTabs.Screen
          options={{
            tabBarLabel: 'All Expenses',
            title: 'All Expenses',
            tabBarIcon: ({color, size}) => <Ionicons name={'calendar'} size={size} color={color}/>

          }}
          name={'AllExpenses'}
          component={AllExpenses}/>
      </BottomTabs.Navigator>
    )
  }

  return (
    <>
      <StatusBar style="auto"/>
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: 'white',
              tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              tabBarActiveTintColor: GlobalStyles.colors.accent500,
            }}
          >
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name={'ExpensesOverview'}
              component={ExpensesOverview}
            />
            <Stack.Screen
              name={'ManageExpense'}
              component={ManageExpense}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
