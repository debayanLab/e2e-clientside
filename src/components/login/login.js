import React, { Component } from 'react'
import API from '../../services/api'
import './login.css';
import {Button} from '@material-ui/core'
import Input from '@material-ui/core/Input';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        }
    }

    onLoginComplete = (loggedInUserObj) => {
        this.props.loginProp(loggedInUserObj)
    }

    login = async () => {
        // Call Login API to get user ID if the user exists in DB
        try {
            let loginResult = await API.logIn(this.state.username)
            this.onLoginComplete(loginResult.data)
        } catch (error) {
            let element = document.querySelector(".incorrect-user")
            element.innerText = "Invalid Username"
        }
    }

    handleUser = e => {
        this.setState({ username: e.target.value })
    }

    render() {
        return (
            <div className="body">
                <div className="login_container">
                    <h1>
                        Whatsapp
                    </h1>
                    <img className="image" src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"/>
                        
                        <div className="input_text">
                            <div className="incorrect-user">
                                <label className="incorrect-user"></label>
                            </div>
                                <Input value={this.state.username} onChange={(e) => this.handleUser(e)} placeholder="Username"/>
                        </div>
                        
                        <Button id="login" onClick={() => this.login()}
                            type="button">
                        Login</Button>
                        
                    
                </div>
            </div>
        )
    }
}
