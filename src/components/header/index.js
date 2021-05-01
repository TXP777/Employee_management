import React, {Component} from 'react';
import './index.less';

export default class Header extends Component{
    render(){
        return(
            <div className="header">
                <div className="header-top">
                    <span>Welcome,admin!</span>
                    <a href= "/login">Log Out</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">Home Page</div>
                    <div className="header-bottom-right">
                        <span>2020-2-3</span>
                        <img src=" " alt=" " />
                        <span>sunny</span>
                    </div>
                </div>
            </div>
         
        )
    }
}