import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { SHA1 } from 'crypto-js';
import { setToken } from '../store/actions';
import CustomButton from '../Components/CustomButton'
import CustomInput from '../Components/CustomInput'


const PinCode = ({ navigation, route }) => {

    const [pinCode, setPinCode] = useState('')
    const { username, password, userToken, serverAddress } = route.params

    //Api
    const url ='/perl/o3api.cgi'
    const encrypt = (text: string) => `*${SHA1(SHA1(text))}`.toUpperCase();
    const encryptedPassword = encrypt(`${encrypt(password)}${userToken}`)
    var formData = new FormData();
    formData.append('action', 'auth');
    formData.append('username', username);
    formData.append('password', encryptedPassword);

    const dispatch = useDispatch()
    
    const handlePinCode = async () => {
        AsyncStorage.getItem('user', (err, result) => {
            const userArray = JSON.parse(result)
            if (result !== null) {
                let userFound = false;
                userArray.forEach(element => {
                    if ((element.pinCode == pinCode.toString()) && (element.userName == username)) {
                        userFound = true;
                        dispatch(setToken(element.userToken))
                    }
                })

                if (userFound) {
                    axios.post(url, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        baseURL: serverAddress,
                    }).then((res) => {
                        const data = res.data;
                        console.log(data)
                        const myArray = data.split("{");
                        if (myArray[1].includes("0")) {
                            navigation.navigate('Home', {
                                username: username
                            })
                        }
                        else {
                            console.log('error')
                            navigation.navigate('signUp', {
                                screenName: 'PinCode',
                                userName: username,
                                token: userToken,
                                serverAddress: serverAddress
                            })
                        }
                    });
                }

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
            <Text style={styles.title}>{username}</Text>
            <CustomInput
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
                onPress={() => navigation.navigate('signUp')}
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
