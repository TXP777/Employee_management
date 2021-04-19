export const reqLogin = (username,password) =>{
 return fetch('/api/users/login',{
     headers:{
         'Content-Type': 'application/json'
     },
     method:'post',
     body:JSON.stringify({username:username,password:password})
 }).then(res => res.json())
}
export const reqAddEmployee = (employee_id) =>{
    return fetch('api/employees/addEmployee',{
        headers:{
            'Content-Type': 'application/json'
        },
        method:'post',
        body:JSON.stringify({employee_id:employee_id})
    }).then(res => res.json())
   }
   
