import {ADDITION,SETTOKEN,SETSIGNUP,SETUSER} from './actionTypes'

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
