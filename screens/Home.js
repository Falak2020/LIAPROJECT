import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, useWindowDimensions, Pressable, Platform } from 'react-native'

import Icons from 'react-native-vector-icons/Entypo'

import CustomButton from '../Components/CustomButton'

import SignUp from '../screens/SignUp'
import { setToken, setUser } from '../store/actions';

const Home = ({ navigation, route }) => {
   
    const { username, password, userToken, serverAddress } = route.params
    const { width, height } = useWindowDimensions();
    const { token } = useSelector(state => state)
    const dispatch = useDispatch()

    const LogOut = () => {
        dispatch(setToken(''))
        navigation.navigate('signUp', { screenName: 'Home' })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>O3LIMS</Text>
            <CustomButton
                text="Scan"
                type="primary"
                onPress={() => navigation.navigate('ScanObject',{
                    username: username,
                    password: password,
                    userToken: userToken,
                    serverAddress: serverAddress
                })}
            />

            <View style={[styles.usernamecontainer,{ top: Platform.OS === 'ios' ? width - 2 : 300 }]}>
                <View style={styles.username}>
                    <Icons
                        size={30}
                        name="user"
                        color="green"
                    />
                    <Text style={styles.usernameText}>{username}</Text>
                </View>
                <Pressable
                    style={[styles.logoutContainer]}
                    onPress={() => LogOut()}
                >
                    <Icons
                        size={30}
                        name="log-out"
                        color="red"
                    />
                    <Text style={styles.logoutText}>
                        Log Out
                    </Text>
                </Pressable>
            </View>

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,

    },
    username: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    usernameText: {
        marginLeft: 6,
        color: 'green',
        fontWeight: '500',
        fontSize: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 50,
        color: '#051C60'
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // top : Platform.OS === 'ios'? width - 2: 100

    },
    logoutText: {
        marginLeft: 6,
        color: 'red',
        fontWeight: '500'
    },
    usernamecontainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around'
        
    }
})
