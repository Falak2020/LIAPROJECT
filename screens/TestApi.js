import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import { SHA1 } from 'crypto-js';
const TestApi = () => {
    const url = 'https://testo3vp.o3x.se/perl/o3api.cgi'
    const encrypt = (text: string) => `*${SHA1(SHA1(text))}`.toUpperCase();
    const password = '7Muu3N-b625'
    const token = 'e2f5ef2'
    const username = 'O3TEST2'
    const encryptedPassword = encrypt(`${encrypt(password)}${token}`)

    var formData = new FormData();
    formData.append('action', 'auth');
    formData.append('username', username);
    formData.append('password', encryptedPassword);
    console.log(formData);
    console.log(encryptedPassword)

    const Login = async () => {
        const res = await axios.post('/perl/o3api.cgi', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            baseURL: 'https://testo3vp.o3x.se',
        });
        //const res = await axios.get(`${url}?username=${username}&password=${encryptedPassword}`)
        console.log(res.data)
    }
    useEffect(() => {
        Login()
    }


        , [])
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default TestApi

const styles = StyleSheet.create({})
