import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button, TouchableOpacity, FlatList } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useDispatch, useSelector } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { add } from '../store/actions';

const ScanObject = ({navigation,route}) => {
  console.log(route.params)
  const data = useSelector(state => state)
  // const { items } = data
  const dispatch = useDispatch()

  const [subItems, setSubItems] = useState([{}])

  const [root, setRoot] = useState('')



  const onReadObject = e => {
    if (root === '') {
      setRoot(e.data)

    }
    else {
      setSubItems([...subItems, { id: e.data.length, value: e.data }])
      //dispatch(add(e.data))
    }
  }


  const ScanObject = () => {
    return (
      <QRCodeScanner
        onRead={onReadObject}
        reactivate={true}
        reactivateTimeout={2000}
      />

    )

  }
  const renderItem = ({ item }) => {

    return (
      <View style={styles.items}>
        <TextInput
          style={styles.item}
          value={item.value}
          multiline

        />
      </View>

    );
  };

  return (
    <SafeAreaView>
      <MaterialIcons 
        name="arrow-back" size={30} 
        style={{ color: '#051C60', marginLeft:10 }} 
        onPress ={()=> navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.inputContainr}>
          <TextInput
            style={styles.input}
            placeholder="Root Element"
            value={root}
            editable={false}
          />

        </View>

        {
          <>
            <Text style={styles.title}>Items</Text>

            <FlatList

              data={subItems}
              renderItem={renderItem}
              key={(item) => item.id}

            />

            <View style={styles.barcode}>
              {ScanObject()}
            </View>
          </>
        }
      </View>

    </SafeAreaView>

  )
}



export default ScanObject

const styles = StyleSheet.create({

  container: {
    height: '95%',
    alignItems: 'center'
  },
  inputContainr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 50,
    marginTop: 20
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    backgroundColor: '#9FE2BF'
  },

  items: {
  },

  title: {
    fontSize: 30,
  },
  barcode: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    marginTop: 20

  },
  flatList: {
    borderWidth: 1,
    paddingHorizontal: 50,
    backgroundColor: '#9FE2BF'
  }

})
