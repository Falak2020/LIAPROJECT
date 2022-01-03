import {ADDITION,SETTOKEN,SETSIGNUP,SETUSER ,SETSERVERADDRESS} from './actionTypes'

const intialState ={
    items:[{}],
    root:'',
    token:'',
    isSignUp:false,
    userPinCode:[],
    newServerAddress:''
}

export const mainReducer = (state= intialState,action)=>{
    switch(action.type){
        case ADDITION :
          return{...state,items:[...state.items,{ id: action.payload.length, value: action.payload}] } 
        
        case SETTOKEN : 
          return{token :action.payload } 

        case SETSIGNUP :
          return {isSignUp :action.payload}

        case SETUSER : 
        return{ userPinCode:state.userPinCode?[...state.userPinCode,action.payload]:[action.payload] } 
        
        case SETSERVERADDRESS:
          return {newServerAddress :"https://" + action.payload}
        default:
          return state;
    }
}