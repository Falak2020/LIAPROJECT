

import React, { useState, useEffect } from 'react'
import { StyleSheet, View ,Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ScanObject from './screens/ScanObject';
import { store } from './store/store'
import { Provider } from 'react-redux'
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import FrontPage from './screens/FrontPage';
import LogIn from './screens/LogIn';
import Home from './screens/Home';
import PinCode from './screens/PinCode';


const Stack = createStackNavigator()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator

          initialRouteName = "signUp"
          screenOptions = {{    
            headerTitleAlign : 'center',
            headerStyle : {
              backgroundColor : '#0080ff'
            }
          }}
          >
          <Stack.Screen 
            options = {{
              //headerBackImage: () => (
             // <MaterialIcons name="arrow-back" size={30} style={{ color: 'white',marginLeft:10}} />
            //),
              headerTitle: () =>null
            }}
            name="Home" 
            component={Home} />
          <Stack.Screen 
            options = {{
              headerTitle: () =>null
            }}
            name = "signUp" 
            component = {SignUp} />
          <Stack.Screen 
           options={{
            
            headerTitle: () => null      
          }}
            name="ScanObject" component={ScanObject} />
          <Stack.Screen 
            options = {{
              headerTitle: () =>null
            }}
            name="PinCode" 
            component={PinCode} />
          
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>


    /**
     <Stack.Screen name="login" component={LogIn} />
         
     
    < View style={styles.container}>
         <Provider store={store}>
           <FrontPage /> 
         </Provider>
       </View>
   
    */



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
