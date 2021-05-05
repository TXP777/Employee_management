export const reqLogin = (username,password) =>{
 return fetch(`users/login`,{
     headers:{
         'Content-Type': 'application/json'
     },
     method:'post',
     body:JSON.stringify({username:username,password:password})
 }).then(res => res.json())
}
export const reqGetEmployees = () =>{
    return fetch(`employee`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'get',
    }).then(res => res.json())
}
export const reqGetUsers = () =>{
    return fetch(`users`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'get',
    }).then(res => res.json())
}
export const reqGetAttendance = () =>{
    return fetch(`attendance`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'get',
    }).then(res => res.json())
}
export const reqDeleteEmployee = (employee_id) =>{
    return fetch(`employee/${employee_id}/delete`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'delete',
        body:JSON.stringify({employee_id:employee_id})
    }).then(res => res.json())
}
export const reqDeleteUser = (user_id) =>{
    return fetch(`users/${user_id}/delete`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'delete',
        body:JSON.stringify({user_id:user_id})
    }).then(res => res.json())
}
export const reqDeleteAttendance = (attendance_id) =>{
    return fetch(`attendance/${attendance_id}/delete`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'delete',
        body:JSON.stringify({attendance_id:attendance_id})
    }).then(res => res.json())
}


export const reqAddOrUpdateEmployee = (employee_id,employee_name,employee_gender,employee_qualification,employee_phone,employee_address) =>{
    return fetch(`employee/addEmployee`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'post',
        body:JSON.stringify({employee_id:employee_id,employee_name:employee_name,
            employee_gender:employee_gender,employee_qualification:employee_qualification,employee_phone:employee_phone,employee_address:employee_address})
    }).then(res => res.json())
}
export const reqAddOrUpdateUser = (user_id,employee_id,username,password
    ) =>{
    return fetch(`users/register`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'post',
        body:JSON.stringify({user_id:user_id,employee_id:employee_id,username:username,password:password})
    }).then(res => res.json())
}


// export const reqUpdateUser = (user_id) =>{
//     return fetch(`users/${user_id}/update`,{
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         method:'put',
//         body:JSON.stringify({user_id:user_id})
//     }).then(res => res.json())
// }


export const reqAddAttendance = (attendance_id,employee_id,employee_name,department_id,
    workingtime,offworktime,numberoflateandleaveearly
    ) =>{
    return fetch(`attendance/addAttendance`,{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'post',
        body:JSON.stringify({attendance_id:attendance_id,employee_id:employee_id,employee_name:employee_name,
            department_id:department_id,workingtime:workingtime,offworktime:offworktime,numberoflateandleaveearly:numberoflateandleaveearly
        })
    }).then(res => res.json())
}

   
