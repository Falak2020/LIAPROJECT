import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, Alert, Pressable } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useDispatch, useSelector } from 'react-redux'
import Icons from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import uuid from 'react-native-uuid';
import CustomButton from '../Components/CustomButton';
import CustomInput from '../Components/CustomInput';
const RNFS = require('react-native-fs');
const ScanObject = ({ navigation }) => {
  
  //const data = useSelector(state => state)
  // const { items } = data
  //const dispatch = useDispatch()
  const [subItems, setSubItems] = useState([])
  const [items, setItems] = useState([])
  
  const [root, setRoot] = useState('')
  const [jsonArray, setJsonArray] = useState([{}])
  const [item, setItem] = useState('')
  const [manually, setManually] = useState(false)
  const onReadObject = e => {
    let itemFound = false
    if (root === '') {
      setRoot(e.data)
      //setData([ { parentObject: e.data }])
    }
    else {
      if(e.data === root)
       itemFound = true;
      subItems.forEach(item => {
        if ((item.value == e.data)||(e.data == root)) {
          itemFound = true;
        }
      })
      if (itemFound)
        Alert.alert('The Item is already found');

      else {
        setSubItems([...subItems, { id: uuid.v4(), value: e.data }])
        setItems([...items,e.data])
      }

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
      <View style={styles.item}>
        <TextInput
          value={item.value}
          editable={true}
        />
        <Pressable
          onPress={() => deleteItem(item.id)}
        >
          <MaterialIcons
            name="delete"
            size={30}
            color='red'
          />
        </Pressable>
      </View>

    );
  };
  const toggleManually = () => {
    setManually(!manually)
  }
  const handleSetManually = (value)=>{
    let itemFound;
    setManually(false)
    subItems.forEach(item => {
      if ((item.value == value)) {
        itemFound = true;
      }
    })
    if (itemFound)
      Alert.alert('The Item is already found');

    else {
      setSubItems([...subItems, { id: uuid.v4(), value: value }])
      setItems([...items,value])
     // setData([...data, { id: uuid.v4(), value: value }])
      setItem('')
    }
  }
  const deleteRoot = () => {

   // setData(data.filter(item => item.value !== root))
    setRoot('')
  }

  const deleteItem = (id) => {
    let exists=subItems.find(item=>item.id===id)
    let index = items.indexOf(exists.value)
    setSubItems(subItems.filter(item => item.id !== id))
    setItems(items.splice(index,1))
  }
 
 function  handleSend(){
    console.log(items)
    let Array=[]
    Array=[{parentObject:root},{child:items}]
    console.log(Array)
    //var filePath = RNFS.DocumentDirectoryPath +'/data.json';
    
    //console.log(filePath)
   // RNFS.writeFile(filePath,'jjj')
    
  }
  return (
    <SafeAreaView>
      {/** <Icons
        name="menu" size={30}
        style={{ color: '#051C60', marginLeft: 10 }}
        onPress={() => navigation.goBack()}
      />*/}
      <View style={styles.container}>
        <View style={styles.inputContainr}>
          <TextInput
            style={styles.input}
            placeholder="Root Element"
            value={root}
            editable={false}
          />
          {
            root ?
              <Pressable
                onPress={() => deleteRoot()}
              >
                <MaterialIcons
                  name="delete"
                  size={30}
                  color='red'
                />
              </Pressable> : null
          }

        </View>
        <>

          <View style={styles.items}>
            <FlatList
              data={subItems}
              renderItem={renderItem}
              key={(item) => item.id}
            />

          </View>
          <View style={styles.enterManually}>
            <CustomButton text="Can't scan enter manually" type="secondary" onPress={toggleManually} />
            {
              manually ?
                <View style = {styles.itemContainer}>
                  <CustomInput
                    placeholder="Set Your code"
                    value={item}
                    setValue={setItem}
                  />
                  {item ?
                    <MaterialIcons
                      name="check-circle"
                      size={45}
                      color='green'
                      onPress = {()=>handleSetManually(item)}
                    /> : undefined
                  }
                </View>
                :
                undefined
            }
          </View>

          <View style= {styles.sendContainer}>
            <CustomButton text="Send" type="primary" onPress = {handleSend} />
          </View>

          <View style={styles.barcode}>
            {ScanObject()}
          </View>
        </>
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
    width: '85%',
  },

  items: {
    borderWidth: 1,
    width: '75%',
    height: '30%',

  },
  item: {
    borderWidth: 1,
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    fontSize: 30,
  },
  barcode: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    marginTop: 20,
  },
  flatList: {
    borderWidth: 1,
    paddingHorizontal: 50,
    backgroundColor: '#9FE2BF'
  },
  enterManually: {
    width: '75%'
  },
  itemContainer :{ 
    flexDirection:'row',
    alignItems:'center'    
  },
  sendContainer:{
    width:'75%',
    marginTop:5
  }
})
