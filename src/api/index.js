// A module containing all interface request functions in the application

import ajax from './ajax';

const BASE = ''

// login
// export function reqLogin(username,password){
//     return ajax('/login', {username, password}, 'POST')
// }
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

// add user
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')