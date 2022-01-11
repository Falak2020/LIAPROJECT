import React from 'react'
import { View, Text, Button, StyleSheet, Pressable } from 'react-native'

import color from '../Constants/color'

const CustomButton = ({ onPress, text, type, bgColor }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container,
            styles[`container_${type}`],
            bgColor ? { backgroundColor: bgColor } : {}
            ]}>
            <Text style={[styles.text_primary ]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5
    },
    container_primary: {
        backgroundColor: color.primary,
    },
    container_secondary: {
        backgroundColor: color.secondary,
    },
    
    text_primary: {
        color:color.svart,
        fontWeight: 'bold'

    },
    

})
export default CustomButton