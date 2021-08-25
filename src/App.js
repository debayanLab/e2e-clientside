import React, { Component } from 'react'
import Login from './components/login/login'
import ChatWindow from "./components/chatWindow/chatWindow";
import { createSignalProtocolManager, SignalServerStore } from "./signal/SignalGateway"


import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import DynamicLinks from './components/DynamicLinks/DynamicLinks';
import notFound from './components/notFound/notFound';

export default class ChatApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      all_users:[],
      isLoggedIn: false,
      loggedInUserObj: {},
      dummySignalServer: new SignalServerStore(),
      signalProtocolManagerUser: undefined
    }

    this.setLoggedinUser = this.setLoggedinUser.bind(this)
  }

  async componentDidMount(){
    const url="https://kamakoti-server.herokuapp.com/api/users";
    const response = await fetch(url);
    const users = await response.json();
    this.setState({all_users: users.data});

    //delete the comment and line 28 later:
    //console.log(this.state.all_users);

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


  
  render() {
    return (
      <BrowserRouter>
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="App">
              { !this.state.isLoggedIn && <Login loginProp={this.setLoggedinUser} />}
              { this.state.isLoggedIn && <ChatWindow
                loggedInUserObj={this.state.loggedInUserObj}
                signalProtocolManagerUser={this.state.signalProtocolManagerUser}
              />}
            </div>
          </Route>


          <Route exact path={"/public_keys/:id" }>
                
                {<DynamicLinks team={this.state.all_users}/>}
                {/* <h1>Public Key Repo</h1>
                
                {
                  this.state.all_users.map( (users) =>
                    <div>
                      {users._id}
                    </div>
                  )
                } */}
               
          </Route>
          
          <Route component={notFound}>

          </Route>
          
         

        </Switch>
      </Router>
      </BrowserRouter>

    )
  }
}
