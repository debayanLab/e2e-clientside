import React, { Component } from 'react'
import Login from './components/login/login'
import ChatWindow from "./components/chatWindow/chatWindow";
import { createSignalProtocolManager, SignalServerStore } from "./signal/SignalGateway"

import './App.css';
export default class ChatApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUsers:{},
      isLoggedIn: false,
      loggedInUserObj: {},
      dummySignalServer: new SignalServerStore(),
      signalProtocolManagerUser: undefined
    }
    this.setLoggedinUser = this.setLoggedinUser.bind(this)
  }

  setLoggedinUser(loggedInUserObj) {
    this.setState({ isLoggedIn: true, loggedInUserObj: { ...loggedInUserObj } }, () => {
      // Initializing signal server here
      createSignalProtocolManager(loggedInUserObj._id, loggedInUserObj.name, this.state.dummySignalServer)
        .then(signalProtocolManagerUser => {
          this.setState({ signalProtocolManagerUser: signalProtocolManagerUser })
        })
    })

  }

  async componentDidMount(allUsers){
    const url="https://kamakoti-server.herokuapp.com/api/users";
    const response = await fetch(url);
    const users = await response.json();
    this.setState({allUsers: users.data});
    console.log(users.data[0]._id);
  }

  render() {
    return (
      <div className="App">
        { !this.state.isLoggedIn && <Login loginProp={this.setLoggedinUser} />}
        { this.state.isLoggedIn && <ChatWindow
          loggedInUserObj={this.state.loggedInUserObj}
          signalProtocolManagerUser={this.state.signalProtocolManagerUser}
        />}
      </div>
    )
  }
}
