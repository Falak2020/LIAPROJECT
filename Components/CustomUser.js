import React from 'react'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'

const CustomUser = ({onPress,username}) => {
    return (
       <Pressable 
         
          style = {styles.container}
          onPress = {onPress}
       >
          <Text style = {styles.username}>{username}</Text>
       </Pressable>
        
           
        
    )
}

export default CustomUser

const styles = StyleSheet.create({
    container: {
        width : 70,
        height : 50,
        backgroundColor : '#2874A6',
        borderRadius : 10,
        borderWidth:2,
        borderColor:'#1B4F72',
        alignItems:'center',
        justifyContent:'center',
        marginRight :20,
        shadowOffset: {width: -3, height:4},
        shadowRadius:3,
        shadowOpacity: 0.5,
        
    },
    username:{
        color:'white',
        fontWeight :'700'

    }
    

})
