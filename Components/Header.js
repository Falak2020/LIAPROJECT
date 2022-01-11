import React from 'react';
import { View,Image ,StyleSheet} from 'react-native';


function Header() {
    return (
       <View style ={styles.container}>
         <Image style = {styles.logo} source ={require('../assets/O3Lims_black.png')} /> 
       </View>
    );
}

const styles = StyleSheet.create({
   container :{
    flex:1,
    width :'100%',
    justifyContent:'center',
    alignItems:'center'
   } ,
   logo :{
    width :300,
    height:80,
    resizeMode:'contain',
    marginTop:30,
    marginBottom:10
   },
  
});
export default Header;