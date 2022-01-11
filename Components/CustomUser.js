import React from 'react'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import color from '../Constants/color'

const CustomUser = ({ onPress, username }) => {
    return (
        <Pressable

            style={styles.container}
            onPress={onPress}
        >
            <Text style={styles.username}>
                {/**<AutoSizeText
                    numberOfLines={3}
                    minFontSize={18}
                    mode={ResizeTextMode.min_font_size}>
                    ggggggg{username}
                </AutoSizeText>**/}
                {username.length<=5? username : username.slice(0,5)+'...'}
            </Text>
        </Pressable>
    )
}

export default CustomUser

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 50,
        backgroundColor: color.userIcon,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#1B4F72',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        shadowOffset: { width: -3, height: 4 },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    username: {
        color:color.svart,
        fontWeight: '700'

    }


})
