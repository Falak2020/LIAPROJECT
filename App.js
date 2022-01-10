

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ScanObject from './screens/ScanObject';
import { store } from './store/store'
import { Provider } from 'react-redux'
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import PinCode from './screens/PinCode';
import TestApi from './screens/TestApi';

const Stack = createStackNavigator()

const App = () => {
  return (  
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="signUp"
          screenOptions={{
            headerTitleAlign: 'center',
            headerBackTitle: 'Back',
           // headerLeft:null,
            headerTintColor:'#fff',
            headerStyle: {
              backgroundColor: '#0080ff',
            }
          }}
        >

          <Stack.Screen
            options={{
              //headerBackImage: () => (
              // <MaterialIcons name="arrow-back" size={30} style={{ color: 'white',marginLeft:10}} />
              //),
              headerTitle: () => null,
            }}
            name="Home"
            component={Home} 

          />

          <Stack.Screen
            options={{
              headerTitle: () => null
            }}
            name="signUp"
            component={SignUp} 
          />

          <Stack.Screen
            options={{
              headerTitle: () => null
            }}
            name="ScanObject" component={ScanObject} 
          />

          <Stack.Screen
            options={{
              headerTitle: () => null
            }}
            name="PinCode"
            component={PinCode} 
          />
          <Stack.Screen
           
            name="Test"
            component={TestApi} 

          />
        </Stack.Navigator>
      </NavigationContainer> 
    </Provider>  
  )
}


export default App

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center'

  },

})
