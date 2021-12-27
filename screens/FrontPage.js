import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SignIn from './SignIn'
import {useSelector} from 'react-redux'
import ScanObject from '../screens/ScanObject'
import SignUp from './SignUp'
const FrontPage = () => {
    const {token , isSignUp} = useSelector(state => state)
      let content = <SignIn />

      if(token) 
       content = <ScanObject />
       
      else {
          if(isSignUp)
          content = <SignUp />
      }

    return (
        <View>
           {content}
        </View>
    )
}

export default FrontPage

const styles = StyleSheet.create({})
