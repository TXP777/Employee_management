// Function module that can send asynchronous ajax requests
// Package axios library
// The return value of the function is a promise object

import axios from "axios";

export default function ajax(url,data={},type ='GET'){
    if(type==='GET'){ // Send get request
        return axios.get(url,{
            params:data
        })
    }else { // Send post request
        return axios.post(url,data)
    }
}

//ajax('/login', {username:'Tom', password:'12345'},'POST').then();
//ajax('/manage/user/add', {username:'Tom', password:'12345', phone:'12321334123'},'POST').then();