import React, { Component } from 'react'
import moment from 'moment'
import './messageBox.css';
import InfoIcon from '@material-ui/icons/Info';


// import MoreVertIcon from '@material-ui/icons/MoreVert'; 
// import {IconButton} from '@material-ui/core';
// import ForwardIcon from '@material-ui/icons/Forward';

import Modal from '../modal/modal.js'
import { Abhinav_pub, Aryan_pub, Akhil_pub, Arup_pub,Debayan_pub,Dewang_pub,Himanshu_pub,Manish_pub,Adhiraj_pub  } from '../../all_private_keys';
import { Button, IconButton } from '@material-ui/core';
import PopUp from './PopUp';
import { sign } from 'crypto';

var NodeRSA = require ("node-rsa");

var Abhinav = new NodeRSA();
var Aryan = new NodeRSA();
var Akhil = new NodeRSA();
var Arup = new NodeRSA();
var Debayan = new NodeRSA();
var Dewang = new NodeRSA();
var Himanshu = new NodeRSA();
var Manish = new NodeRSA();
var Adhiraj = new NodeRSA();


//import private keys -- pub=private :(sorry)
Abhinav.importKey(Abhinav_pub);
Aryan.importKey(Aryan_pub);
Akhil.importKey(Akhil_pub);
Arup.importKey(Arup_pub);
Debayan.importKey(Debayan_pub);
Dewang.importKey(Dewang_pub);
Himanshu.importKey(Himanshu_pub);
Manish.importKey(Manish_pub);
Adhiraj.importKey(Adhiraj_pub);


export default class MessageBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            msgText: "",
            forwardMessageID:"",
            showContacts:false,
            show:false,
            buttonPopup:false,

        }
        this.sendMessageToServer = this.sendMessageToServer.bind(this)

        this.showContacts = this.showContacts.bind(this);
        
        this.showPopup = this.showPopup.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.renderModal = this.renderModal.bind(this);
        
        }
        showContacts(event) {
            event.preventDefault();
        
            this.setState({
                showContacts: true,
            });
        }
    
    showPopup = () => {
        this.setState({ buttonPopup: true });
    };

    hidePopup= () => {
        this.setState({ buttonPopup: false });
    };

    showModal = () => {
        this.setState({ show: true });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };
    

    handleMessageText(e) {
        this.setState({ msgText: e.target.value })
    }

    async sendMessageToServer() {
        if (this.state.msgText) { //to not send empty message
            // console.log (this.props.loggedInUserObj._id)
            console.log(this.props.loggedInUserObj.name)
            //setting up corresponding key:
            //should be done efficiently 
            var sign_name='';
            switch (this.props.loggedInUserObj.name) {
                case 'Abhinav':
                  sign_name=Abhinav
                  break;
                case 'Aryan':
                  sign_name=Aryan
                  break;
                case 'Adhiraj': 
                  sign_name=Adhiraj
                  break; 
                case 'Arup':
                  sign_name=Arup
                  break;
                case 'Debayan':
                    sign_name=Debayan
                    break;
                case 'Devang':
                    sign_name=Dewang
                    break;
                case 'Himanshu': 
                    sign_name=Himanshu
                    break; 
                case 'Manish':
                    sign_name=Manish
                    break;
                case 'Akhil':
                    sign_name=Akhil
                    break;
            }
            
            let msgObj = {
                message: this.state.msgText,
                date: moment().format('LT'),
                message_type: "new-message",
                signature: sign_name.encryptPrivate(this.state.msgText, "base64"),
                link: ('https://blinded-client.herokuapp.com/public_keys/' + this.props.loggedInUserObj._id),
                // encrypt a (not so) random user ID with WhatsApp pubkey
                //originator: publicKey.encrypt (this.props.users[0]._id, "base64"),
                senderid:this.props.loggedInUserObj._id,
                recipient: this.props.selectedUser._id
            }
            
            this.props.setNewMsgObj(msgObj)
            // console.log("Send message to: ", this.props.selectedUser._id, " Name = ", this.findUserByID(this.props.selectedUser._id))
            this.messageInfo(msgObj, this.props.selectedUser)
        }
        this.setState({ msgText: "" })
    }

    // Renders the modal and handles click
    renderModal(){
        return (
        <div>
            <Modal show={this.state.show} handleClose={this.hideModal}>
                <ul className={"modalContacts"}>
                    {this.props.users.map((user) => (
                        <li className={"modalContact"} key={`${user._id}-modal`}>
                            <button onClick={() => (this.forward(user))}>
                                {user.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <br></br>
            </Modal>
            <msg_info/>
        </div>
    )}

    // Find message using its ID and return object
    findMessage(messageID){
        let messageList = this.props.messages.slice()
        var message = messageList.find(m => m.messageId === messageID)
        return message
    }

    findUserByID(userID){
        let userList = this.props.users.slice()
        
        // To add current user in array
        userList.push(this.props.loggedInUserObj)
                
        let user = userList.find((user) => user._id === userID)
        return user.name
    }

    // Message Object, Receiver Object
    messageInfo(message, receiver){
        // console.log("Message Object (While being sent): ", message)
        // console.log("Receiver Object: ", receiver)
        let senderName = this.findUserByID(message.senderid)
        let originName = message.originator
        let receiverName = this.findUserByID(message.recipient)
        
        console.log(`Message: ${message.message}\nSent by: ${senderName} (${message.senderid})\nOriginated by: (${message.originator})\nReceived by: ${receiverName} (${message.recipient})\nForwarding to: ${receiver.name} (${receiver._id})`)
    }

    forward(recipientObject){
        let message = this.findMessage(this.state.forwardMessageID)
        // console.log(message)
        this.messageInfo(message, recipientObject)

        let msgObj = {
            message: message.message,
            date: moment().format('LT'),
            message_type: "forwarded", 
            signature:message.signature,
            link: message.link,
            //originator: message.originator,
            recipient: recipientObject._id,
            senderid: this.props.loggedInUserObj._id
        }
        this.props.setNewMsgObj(msgObj)
        this.hideModal();
    }

    // Goes a node up in DOM until it finds ID of a node (The message ID)
    getParentID(e){
        while(true){
            let ID = e.id
            if(!ID){
                e = e.parentNode
            }
            else{
                return ID
            }
        }
    };

    

    // Method to Display Messages
    addMessagesToChat() {
        
        if (this.props.messages) {
            const msgContent = this.props.messages.map(function (message) {
                //  Display message you sent
                
                if (message.receiverid === this.props.selectedUser._id) {
                    return (
                        <div key={`${message.messageId}-chat-element`} id={message.messageId} className={"w-3/4 flex my-2 justify-end float-right"}>
                                {/* Display forwardbutton and then the message */}
                            <div className={"length"}>
                                
        
                                <div className={"w-min text-black shadow-lg clear-both p-2 rounded-md bg-green-200"}>
                                    {/* <InfoIcon id ={message.messageID} onClick={()=> this.showPopup()}/> &nbsp; */}
                                    
                                    <details className={"detail_info"}>
                                                <summary>{message.message}</summary>
                                                    <h3>Message Information</h3>
                                                    <h1>Public Key Link: </h1> <h2><a href = {message.link} target="_blank">{message.link}</a></h2>
                                                   
                                                
                                                    <h1>RSA Signature of Message: </h1><h2>{message.signature}</h2>
                                                
                                    </details>
                                    
                                </div>
                                    {/* <PopUp trigger={this.state.buttonPopup} setTrigger={this.hidePopup} 
                                        msg={message.message} id= {message.messageId}link={message.link} sign={message.signature}>
                                    </PopUp> */}
                            </div>
                            <div className={"forwardButton my-1"} id={message.messageId} onClick={e => {this.setState({forwardMessageID:this.getParentID(e.target)}); this.showModal()}}>
                                    <div id={message.messageId}>
                    
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25" ><path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M14.248 6.973a.688.688 0 0 1 1.174-.488l5.131 5.136a.687.687 0 0 1 0 .973l-5.131 5.136a.688.688 0 0 1-1.174-.488v-2.319c-4.326 0-7.495 1.235-9.85 3.914-.209.237-.596.036-.511-.268 1.215-4.391 4.181-8.492 10.361-9.376v-2.22z" ></path></svg>
                                    </div>
                                </div>
                        </div>
                        
                    );
                }
                else {
                    
                    return (
                        
                        <div key={`${message.messageId}-chat-element`} id={message.messageId} className={`w-3/4  flex my-2`}>
   
                            <div className={`w-max text-black shadow-lg my-2 clear-both p-2 rounded-md bg-white` }>
                                <div className="length">
                                        {message.message_type==="forwarded" &&
                                        <small className={"forwarded-tag"}><em>Forwarded</em> </small>}
                                        
                                        <div>
                                        
                                        {/* <InfoIcon onClick={()=> this.showPopup()}/>&nbsp; */}
                                        <details className={"detail_info"}>
                                                <summary>{message.message}</summary>
                                                    <h3>Message Information</h3>
                                                    <h1>Public Key Link: </h1> <h2><a href = {message.link} target="_blank">{message.link}</a></h2>
                                                    <h1>RSA Signature of Message: </h1><h2>{message.signature}</h2>
                                                
                                            </details>
                                            
                                        
                                            {/* <br></br>
                                            {message.signature}  */}
                                                {/* <PopUp trigger={this.state.buttonPopup} setTrigger={this.hidePopup} 
                                                msg={message.message}
                                                link={message.link} id ={message.messageId} sign={message.signature}>
                                                </PopUp> */}
                                    </div>
                            </div>
                            
                        </div>
                            
                            <div className={"forwardButton my-3"} id={message.messageId} onClick={e => {this.setState({forwardMessageID:this.getParentID(e.target)}); this.showModal()}}>
                                <div id={message.messageId}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25"><path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M14.248 6.973a.688.688 0 0 1 1.174-.488l5.131 5.136a.687.687 0 0 1 0 .973l-5.131 5.136a.688.688 0 0 1-1.174-.488v-2.319c-4.326 0-7.495 1.235-9.85 3.914-.209.237-.596.036-.511-.268 1.215-4.391 4.181-8.492 10.361-9.376v-2.22z" ></path></svg>
                                </div>
                            </div>

                        </div>
                    );
                }
                
            }.bind(this))
            return (msgContent)
        }
        
    }
q   
    render() {
        return (
            <div className="message-box w-3/5">
                <div className=" w-full relative h-full grid grid-flow-rows">
                    {/* Contact Options Bar */}
                    <div className="user-bar text-white flex w-full py-2 absolute inset-x-0">
                        <div className="w-12 rounded-full relative h-12 text-center mx-2">
                            <img className="profile-picture absolute h-full object-cover self-center p-2" src={"/images/" + this.props.selectedUser.img} alt="dp" />
                        </div>
                        <h4 className="contact-name text-white font-bold w-3/4 float-left py-3">{this.props.selectedUser.name}</h4>
                        <div className="icons w-1/4 text-right mr-4 py-1">
                            <i className="fas fa-video p-3 text-l"></i>
                            <i className="fa fa-phone p-3 text-l"></i>
                            <i className="fa fa-ellipsis-v p-3 text-l"></i>
                        </div>
                    </div>
                    
                
                    {/* Messages Area */}
                    <div className="message-area clearfix overflow-auto p-2 mt-16">
                        {this.addMessagesToChat()}
                        {this.renderModal()}
                        
                            
                    </div>
                    {/* Input Box and other Options */}
                    <div className="input-box flex bottom-0 absolute inset-x-0 shadow-inner">
                        <input className="msg-input p-1 m-3 w-4/5 text-sm focus:outline-none focus:ring" placeholder="Type a message"
                            value={this.state.msgText} onChange={(e) => this.handleMessageText(e)}>
                        </input>
                        <div className="icons py-3 w-1/5 text-center flex">
                            <i className="las la-grin p-2 text-xl"></i>
                            <i className="las la-paperclip p-2 text-xl"></i>
                            <i className="las la-image p-2 text-xl"></i>
                        </div>
                        <div className="bar text-gray-300 text-4xl px-4">|</div>
                        <button className="rounded-full focus:outline-none place-self-center transform hover:scale-110 motion-reduce:transform-none" onClick={() => this.sendMessageToServer()}>
                            <i className="lar la-paper-plane m-4 text-xl mx-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}