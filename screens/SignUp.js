import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, ScrollView, Alert, TouchableOpacity, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icons from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { setToken, setUser } from '../store/actions';
import CustomButton from '../Components/CustomButton'
import CustomInput from '../Components/CustomInput'
import CustomUser from '../Components/CustomUser'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'



const SignUp = ({ navigation }) => {

    const { height, width } = useWindowDimensions();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [userToken, setUserToken] = useState('')
    const [pinCode, setPinCode] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [editUser, setEditUser] = useState(false)
    const [ok, setOk] = useState(false)
    const data = useSelector(state => state)
    const { userPinCode } = data
    const [pinCodeArray,setPinCodeArray] = useState([])
    
    const dispatch = useDispatch()

    useEffect(() => {
     // AsyncStorage.removeItem('user')
       
        const unsubscribe = navigation.addListener('focus', () => {
            getPinCode()
            NewUser()
            console.log('Refreshed!');
          });
          return unsubscribe;

    }, [navigation])
    
    const getPinCode = ()=>{
        setPinCodeArray([])
        AsyncStorage.getItem('user', (err, result) => {
            if (result != null) {
                const userArray = JSON.parse(result)
                userArray.forEach(element => {
                    if (element.pinCode !== "") {
                          // dispatch(setUser({ username: element.userName, pinCode: element.pinCode }))
                            setPinCodeArray(prev =>[...prev,{ username: element.userName, pinCode: element.pinCode }])
                    }
                })
            }
        })
        return pinCodeArray
    }
    
    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const onRegister = () => {
        if ((username !== '') && (password !== '') && (email !== '') && (userToken !== '')) {
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
                                { text: "Cansle", style: 'destructive', onPress: () => { onRegisterUser() } }
                            ]
                        )
                    }
                    else {
                        Alert.alert(
                            'A user with the same name already exists',
                            'A user with the same name already exists, have you forgotten your password ',
                            [
                                { text: "Forget password", style: 'destructive', onPress: () => ForgetPassword() },
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
                            { text: "Cansle", style: 'destructive', onPress: () => { onRegisterUser() } }
                        ]
                    )
                }
            })
        }

        else
            Alert.alert('Please enter a valid information')
    }

    const ForgetPassword = () => {
        setPassword('')
        setUserToken('')
        setEditUser(true)
    }

    const NewUser = () => {
        setUsername('')
        setPassword('')
        setEmail('')
        setUserToken('')
        setPinCode('')
    }

    

    const onRegisterUser = () => {
        setOk(false)
        let user = {
            id: username.length,
            userName: username,
            password: password,
            email: email,
            userToken: userToken,
            pinCode: pinCode
        }

        AsyncStorage.getItem('user', (err, result) => {
            if (result != null) {
                let Array = JSON.parse(result);
                if (editUser) {
                    const index = Array.findIndex(element => element.userName == username);
                    console.log(index)
                    Array.splice(index, 1, user)
                    AsyncStorage.setItem('user', JSON.stringify(Array))
                    setEditUser(false)
                }
                else {
                    const newArray = [...Array, user]
                    AsyncStorage.setItem('user', JSON.stringify(newArray))
                }

                dispatch(setToken(userToken))
                navigation.navigate('Home',{
                    username :user.userName
                })
            }

            else {
                let Array = [user]
                AsyncStorage.setItem('user', JSON.stringify(Array))
                dispatch(setToken(userToken))
                navigation.navigate('Home',{
                    username : user.userName
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
                    username: item.username
                })}
            />
        )

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}> Create a new account</Text>
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
                    <TouchableOpacity
                        onPress={toggleSecureTextEntry}
                    >
                        {secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                                style={{ zIndex: 1, right: 50 }}

                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                                style={{ zIndex: 1, right: 50 }}

                            />
                        }
                    </TouchableOpacity>
                </View>

                <CustomInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail} />

                <CustomInput
                    placeholder="Token"
                    value={userToken}
                    setValue={setUserToken} />
                <CustomButton
                    text="Register"
                    onPress={onRegister}
                    type='primary' />



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

                <View style={[styles.pinCodeContainer, { top: width - 170 }]} >
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
        margin: 10
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

    }
})
export default SignUp