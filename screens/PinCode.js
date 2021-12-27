import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux';
import { setToken } from '../store/actions';
import CustomButton from '../Components/CustomButton'
import CustomInput from '../Components/CustomInput'

const PinCode = ({navigation,route}) => {

    const [pinCode, setPinCode] = useState('')
    const {username} = route.params
    
    const dispatch = useDispatch()

    const handlePinCode = () => {
        AsyncStorage.getItem('user', (err, result) => { 
            const userArray = JSON.parse(result)
            if (result !== null) {
                let userFound= false;
                userArray.forEach(element =>{
                    if((element.pinCode == pinCode.toString())&&(element.userName == username)){
                         userFound = true;
                         dispatch(setToken(element.userToken))         
                    }       
                })

                if(userFound)
                  navigation.navigate('Home',{
                      username : username
                  })
                else 
                Alert.alert('The pin code is wrong')                
            }
            else {
                navigation.navigate('signUp')
            }
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Enter Your Pin Code</Text>
            <CustomInput
                placeholder="Pin Code"
                placeholder="Set pin code"
                keyboardType='numeric'
                value={pinCode}
                setValue={setPinCode}
            />
            <CustomButton
                onPress={handlePinCode}
                type='primary'
                text="Send"
            />
            <CustomButton
                onPress={()=> navigation.navigate('signUp')}
                type='secondary'
                text="Back To Sign Up"
            />
        </View>
    )
}

export default PinCode

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
})
