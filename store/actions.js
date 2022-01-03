import {ADDITION,SETTOKEN,SETSIGNUP,SETUSER ,SETSERVERADDRESS} from './actionTypes'

export const add = (payload) =>({
    type :ADDITION,
    payload
})

export const setToken = (payload) =>({
    type :SETTOKEN,
    payload
})

export const setSignUp = (payload) =>({
    type :SETSIGNUP,
    payload
   
})
export const setUser = (payload) =>({
    type :SETUSER,
    payload
   
})

export const setServerAddressUrl = (payload) =>({
    type :SETSERVERADDRESS,
    payload
   
})
