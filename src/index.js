import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AuthContextProvider from "./context/authContext";
import Login from './pages/login/login';
import Admin from './pages/admin/admin';


const App = () => {
 
        return (
            <BrowserRouter>
            <AuthContextProvider>
              <Switch> {/**Match only one of the routes */}
                <Route path='/login' component={Login}></Route>
                <Route path='/' component={Admin}></Route>
                
              </Switch>
              </AuthContextProvider>
            </BrowserRouter>
        )
}

ReactDOM.render(<App />, document.getElementById("root"));
