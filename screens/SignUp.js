import React, { useEffect, useState } from 'react'
import { Dimensions, View, Text, StyleSheet, useWindowDimensions, ScrollView, Alert, TouchableOpacity, FlatList, Platform, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Feather from 'react-native-vector-icons/Feather'

import { setToken } from '../store/actions';
import CustomButton from '../Components/CustomButton'
import CustomInput from '../Components/CustomInput'
import CustomUser from '../Components/CustomUser'
import axios from 'axios'
import { SHA1 } from 'crypto-js';

const SignUp = ({ navigation, route }) => {

    const { height, width } = useWindowDimensions()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ServerAddress, setServerAddress] = useState('')
    const [userToken, setUserToken] = useState('')
    const [pinCode, setPinCode] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [editUser, setEditUser] = useState(false)
    const [ok, setOk] = useState(false)
    const [registerWithoutPinCode, setRegisterWithoutPinCode] = useState(false)
    const [error, setError] = useState('')
    //Api
    const url = '/perl/o3api.cgi'
    const encrypt = (text: string) => `*${SHA1(SHA1(text))}`.toUpperCase();
    const encryptedPassword = encrypt(`${encrypt(password)}${userToken}`)
    var formData = new FormData();
    formData.append('action', 'auth');
    formData.append('username', username);
    formData.append('password', encryptedPassword);
    //const data = useSelector(state => state)
    // const { newServerAddress } = data
    const [pinCodeArray, setPinCodeArray] = useState([])

    const dispatch = useDispatch()
    
    useEffect(() => {
        //AsyncStorage.removeItem('user')
        const unsubscribe = navigation.addListener('focus', () => {
            getPinCode()
            if (typeof route.params != 'undefined') {

                if (route.params.screenName === 'Home') {
                    NewUser()
                }
                if (route.params.screenName === 'PinCode') {

                    ForgetPassword(route.params.userName, route.params.token, route.params.serverAddress)
                }

            }
            console.log('Refreshed!');
        });

        return unsubscribe;
    }, [navigation, route])

    const getPinCode = () => {
        setPinCodeArray([])
        AsyncStorage.getItem('user', (err, result) => {
            if (result != null) {
                const userArray = JSON.parse(result)
                console.log(userArray)
                userArray.forEach(element => {
                    if (element.pinCode !== "") {
                        // dispatch(setUser({ username: element.userName, pinCode: element.pinCode }))
                        setPinCodeArray(prev => [...prev,
                        {
                            username: element.userName,
                            password: element.password,
                            userToken: element.userToken,
                            serverAddress: element.ServerAddress,
                            pinCode: element.pinCode
                        }])
                    }
                })
            }
        })
        return pinCodeArray
    }

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    function validURL(str) {
        var pattern = new RegExp(
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }


    function isIP(address) {
        var r = new RegExp('^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])');
        return r.test(address)
    }

    function isDomain(address) {
        var r = new RegExp('^(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}');
        return r.test(address)
    }

    const changeServerAddress = (address) => {
        if (ServerAddress.startsWith('https://') || ServerAddress.startsWith('http://')) {
            setServerAddress(address)
            return true
        }
        else {
            if (isIP(address)) {
                setServerAddress('http://' + address)
                return true
            }

            else {
                if (isDomain(address)) {
                    setServerAddress('https://' + address)
                    return true
                }

                else {
                    setServerAddress('')
                    return false
                }
            }
        }
        if ((!isIP(address) && !isDomain(address))) {
            setServerAddress('')
            return false

        }
    }


    const onRegister = async () => {

        if ((username.trim() !== '') && (password.trim() !== '') && (ServerAddress.trim() !== '') && (userToken.trim() !== '')) {

            if (changeServerAddress(ServerAddress)) {
                const res = await axios.post(url, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    baseURL: ServerAddress,
                });

                const data = res.data;
                const myArray = data.split("{");// return "ERROR":"","STATUS":"0"}

                if (myArray[1].includes("0")) {
                    AsyncStorage.getItem('user', (err, result) => {
                        if (result != null) {
                            let Array = JSON.parse(result);
                            let userFound = false;
                            Array.forEach(element => {
                                if (element.userName == username)
                                    userFound = true;
                            })

                            if (!userFound || editUser) {
                                Alert.alert(
                                    'Pin Code',
                                    'set you pin code',
                                    [
                                        { text: "Ok", style: 'destructive', onPress: () => setOk(true) },
                                        { text: "Cansle", style: 'destructive', onPress: () => { setRegisterWithoutPinCode(true) } }
                                    ]
                                )
                            }
                            else {
                                Alert.alert(
                                    'A user with the same name already exists',
                                    'A user with the same name already exists, have you forgotten your password ',
                                    [
                                        { text: "Forget password", style: 'destructive', onPress: () => ForgetPassword(username, userToken, ServerAddress) },
                                        { text: "New user", style: 'destructive', onPress: () => { NewUser() } }
                                    ]
                                )
                            }
                        }
                        else {
                            Alert.alert(
                                'Pin Code',
                                'set you pin code',
                                [
                                    { text: "Ok", style: 'destructive', onPress: () => setOk(true) },
                                    { text: "Cansle", style: 'destructive', onPress: () => { setRegisterWithoutPinCode(true) } }
                                ]
                            )
                        }
                    })
                }
                else {
                    Alert.alert('Inccorect username or password')
                }

            }
            else {
                Alert.alert('Please enter a valid server address')
            }
        }

        else
            Alert.alert('Please enter a valid information')
    }

    const ForgetPassword = (username, token, serverAddress) => {
        console.log('forget')
        setUsername(username)
        setUserToken(token)
        setServerAddress(serverAddress)
        setPassword('')
        setError(`The user name or password you entered isn't correct. Try entering it again.`)
        setEditUser(true)
    }

    const NewUser = () => {
        setUsername('')
        setPassword('')
        setServerAddress('')
        setUserToken('')
        setPinCode('')
        setError('')
    }

    const onRegisterUser = () => {
        if (ok)
            setOk(false)
        if (registerWithoutPinCode)
            setRegisterWithoutPinCode(false)


        let user = {
            id: username.length,
            userName: username,
            password: password,
            ServerAddress: ServerAddress,
            userToken: userToken,
            pinCode: pinCode
        }

        AsyncStorage.getItem('user', (err, result) => {
            if (result != null) {
                let Array = JSON.parse(result);
                if (editUser) {
                    const index = Array.findIndex(element => element.userName == username);
                    Array.splice(index, 1, user)
                    AsyncStorage.setItem('user', JSON.stringify(Array))
                    setEditUser(false)
                }
                else {
                    const newArray = [...Array, user]
                    AsyncStorage.setItem('user', JSON.stringify(newArray))
                }

                dispatch(setToken(userToken))
                navigation.navigate('Home', {
                    username: user.userName
                })
            }

            else {
                let Array = [user]
                AsyncStorage.setItem('user', JSON.stringify(Array))
                dispatch(setToken(userToken))
                navigation.navigate('Home', {
                    username: user.userName
                })
            }
        })

    }
    //PinCode 
    const renderItem = ({ item }) => {

        return (
            <CustomUser
                username={item.username}
                onPress={() => navigation.navigate('PinCode', {
                    username: item.username,
                    password: item.password,
                    userToken: item.userToken,
                    serverAddress: item.serverAddress
                })}
            />
        )

    }

    return (
        <ScrollView>

            <View style={styles.container}>
                {error ?
                    <Text style={styles.error}>{error}</Text> :
                    <Text style={styles.title}> Create a new account</Text>
                }
                <CustomInput
                    placeholder="User Name"
                    value={username}
                    setValue={setUsername} />
                <View style={styles.password}>
                    <CustomInput
                        placeholder="Password"
                        value={password} setValue={setPassword}
                        secureTextEntry={secureTextEntry}
                    />
                    <Pressable
                        onPress={() => toggleSecureTextEntry()}
                    >
                        {secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                                style={{ right: 30 }}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                                style={{ right: 30 }}
                            />
                        }
                    </Pressable>
                </View>
                <CustomInput
                    placeholder="Server Address"
                    value={ServerAddress}
                    setValue={setServerAddress}
                    onServerAddress={ServerAddress}
                />

                <CustomInput
                    placeholder="Token"
                    value={userToken}
                    setValue={setUserToken}
                />
                <CustomButton
                    text="Register"
                    onPress={onRegister}
                    type='primary' />

                {
                    error ?
                        <CustomButton
                            text="Back To Sign Up"
                            type='secondary'
                            onPress={NewUser}
                        /> :
                        undefined
                }
                {ok ?
                    <>
                        <CustomInput
                            placeholder="Pin Code"
                            placeholder="Set pin code"
                            keyboardType='numeric'
                            value={pinCode}
                            setValue={setPinCode}
                        />
                        <CustomButton
                            text="Save"
                            onPress={onRegisterUser}
                            type='secondary'
                        />
                    </>
                    : null
                }
                {
                    registerWithoutPinCode ?
                        <>
                            <CustomButton
                                text="Save Without PinCode"
                                onPress={onRegisterUser}
                                type='secondary'
                            />
                        </>
                        : null
                }

                <View style={[styles.pinCodeContainer, { top: Platform.OS === 'ios' ? width - 200 : 0 }]} >
                    <FlatList
                        horizontal={true}
                        data={pinCodeArray}
                        renderItem={renderItem}
                        key={(item, index) => index}
                        showsHorizontalScrollIndicator={false}

                    />
                </View>
            </View>
        </ScrollView>
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
        padding: 10,
        marginTop: 10
    },
    text: {
        color: 'gray',
        marginVertical: 10
    },
    textlink: {
        color: '#FDB075'
    },
    password: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    pinCodeContainer: {
        paddingVertical: 20,
        width: '100%',
    },
    pinCode: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    error: {
        color: 'red',
        marginBottom:5,
        fontWeight: '300',
        fontSize: 20
    }
})
export default SignUp