
import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView ,Alert, SafeAreaView} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setToken,setSignUp } from '../store/actions';
import {auth} from '../firebase'


import users from '../Modal/Users'
import CustomButton from '.././Components/CustomButton'
import CustomInput from '.././Components/CustomInput'
import SignUp from './SignUp'
const LogIn= () => {


    const data = useSelector(state => state)
    const { token } = data
    const {isSignUp} = data
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   // const [token, setToken] = useState('')

 
    const onSignInPressed = (username,password) => {
        auth
         .signInWithEmailAndPassword(email,password)
         .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);  
          })
          .catch(error=> alert(error.message))



          dispatch(setToken(password))
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
       console.log('sign up');
       console.log(isSignUp);
    }
    return (
        <SafeAreaView>
           
            <View style={styles.container}>
              <Text style = {styles.title}> Sign IN</Text>
                <CustomInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail} />

                <CustomInput
                    placeholder="Password"
                    value={password} setValue={setPassword}
                    secureTextEntry />

                <CustomButton
                    text="Sign In"
                    onPress={() =>onSignInPressed(email,password)}
                    type='primary' />
               
                <Text style = {styles.text}>Do not have an account, make a new one </Text>
                <CustomButton
                    text="Sign up"
                    onPress={onSignUpPressed}
                    type='secondary'
                     />
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
    }
})
export default LogIn