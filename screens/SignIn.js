import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView ,Alert, SafeAreaView} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setToken,setSignUp } from '../store/actions';
import {auth} from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

import users from '../Modal/Users'
import CustomButton from '.././Components/CustomButton'
import CustomInput from '.././Components/CustomInput'
import SignUp from './SignUp'
const SignIn = ({navigation}) => {


    const data = useSelector(state => state)
    const { token } = data
    const {isSignUp} = data
    const dispatch = useDispatch()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
  
   const getData = () =>{
        AsyncStorage.getItem('user', (err, result) => {
          if(result !== null){
             if(result.username === userName && result.password === password){
                 navigation.navigate('Home')
             }
             else{
                 Alert.alert('The user name or password is wrong')
             }
          }
          else{
              navigation.navigate('signUp')
          }
              
        })   

   }
    const onSignInPressed = (userName,password) => {
        
       getData();
       dispatch(setToken(password))
       /**auth
         .signInWithEmailAndPassword(email,password)
         .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);  
          })
          .catch(error=> alert(error.message))
 */ 


          
        //if(username !== '' && password!== ''){
          //  const foundUser = users.filter(item=>{
            //    return username == item.username && password ==item.password
    
          //  } );
    
          //  console.log(String(foundUser[0].token));
           // setToken(foundUser[0].token) 
           
          //  if(foundUser.length == 0){
            //  Alert.alert('Invalid User', 'user name or password is not correct',[
           //       {text : 'ok'}
            //  ])
             // return
           // } 
            
           //dispatch(setToken(String(foundUser[0].token)))
           // console.log("token is"+token);
             
       // }
        
       
    }
   
   
    const onSignUpPressed = () => {
       dispatch(setSignUp(true))
       navigation.navigate('signUp')
    }
    return (
        <SafeAreaView> 
            <View style={styles.container}>
              <Text style = {styles.title}> Sign IN</Text>
                <CustomInput
                    placeholder="userName"
                    value={userName}
                    setValue={setUserName} />

                <CustomInput
                    placeholder="Password"
                    value={password} setValue={setPassword}
                    secureTextEntry />

                <CustomButton
                    text="Sign In"
                    onPress={() =>onSignInPressed(userName,password)}
                    type='primary' />
               
                <Text style = {styles.text}>Do not have an account, make a new one </Text>
                <CustomButton
                    text="Sign up"
                    onPress={onSignUpPressed}
                    type='secondary'/>
                <View style = {styles.pinCode}>
                    <CustomButton
                    text="Use Pin code"
                    onPress = {()=>navigation.navigate('PinCode')}
                    type='primary' />
                </View>
                
            </View>
        
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10
    },
    text:{
        marginVertical :10
    },
    pinCode : {
        width : '100%',
        marginTop : 30
    }

   
})
export default SignIn