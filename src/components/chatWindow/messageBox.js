import React, { Component } from 'react'
import moment from 'moment'
import './messageBox.css';
// import MoreVertIcon from '@material-ui/icons/MoreVert'; 
// import {IconButton} from '@material-ui/core';
// import ForwardIcon from '@material-ui/icons/Forward';

import Modal from '../modal/modal.js'

var BigInt = require ("big-integer")

var pubkey = BigInt(parseInt("9421112991301452251024396501427833345357503562882475334149227587340432218994046097951284726924839960019716389097331412755506762551147529272849294512389587"))
var modulus = BigInt(parseInt("1109355049844803514286306656707"))

console.log ("public key: ", pubkey, "\npublic modulus: ", modulus)

export default class MessageBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            msgText: "",
            forwardMessageID:"",
            showContacts:false,
            show:false,
        }
        this.sendMessageToServer = this.sendMessageToServer.bind(this)

        this.showContacts = this.showContacts.bind(this);
        
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.renderModal = this.renderModal.bind(this);
        }
        showContacts(event) {
            event.preventDefault();
        
            this.setState({
                showContacts: true,
            });
        }
    
    showModal = () => {
        this.setState({ show: true });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };
    

    handleMessageText(e) {
        this.setState({ msgText: e.target.value })
    }

    modexp (m, e, n) {
        var res = BigInt (1)
        while (e > 0) {
            // If exponent is odd
            if ((e & 1) == 1) 
                res = (res * m) % n
    
            // Our exponent must be even now 
            e = e / 2  
            m = (m * m) % n 
        }
        return BigInt(res)
    }

    RSA_encrpyt (m) {
        var ciphertext = this.modexp (m, pubkey, modulus)
        return ciphertext.toString()
    }

    sendMessageToServer() {
        if (this.state.msgText) { //to not send empty message
            var encryptedID = this.RSA_encrpyt((BigInt(parseInt(this.props.loggedInUserObj._id))))
            console.log ("encrypted ID: ", encryptedID)
            let msgObj = {
                message: this.state.msgText,
                date: moment().format('LT'),
                message_type: "new-message",
                // encrypt originator ID with WhatsApp pubkey
                originator: encryptedID,
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
        console.log("Message Object (While being sent): ", message)
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
            originator: message.originator,
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
    }

    // Method to Display Messages
    addMessagesToChat() {
        if (this.props.messages) {
            const msgContent = this.props.messages.map(function (message) {
                //  Display message you sent
                if (message.receiverid === this.props.selectedUser._id) {
                    return (
                        <div key={`${message.messageId}-chat-element`} id={message.messageId} className={"w-3/4  flex my-2 justify-end float-right"}>
                            {/* Display forwardbutton and then the message */}
                            <div className={"forwardButton"} id={message.messageId} onClick={e => {this.setState({forwardMessageID:this.getParentID(e.target)}); this.showModal()}}>
                                <div id={message.messageId}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25" ><path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M14.248 6.973a.688.688 0 0 1 1.174-.488l5.131 5.136a.687.687 0 0 1 0 .973l-5.131 5.136a.688.688 0 0 1-1.174-.488v-2.319c-4.326 0-7.495 1.235-9.85 3.914-.209.237-.596.036-.511-.268 1.215-4.391 4.181-8.492 10.361-9.376v-2.22z" ></path></svg>
                                </div>
                            </div>
    
                            <div className={"w-max text-black shadow-lg clear-both p-2 rounded-md bg-green-200"}>
                                {`${message.message_type==="forwarded"? "Forwarded:":""}`} {message.message}
                            </div>
                            
                        </div>
                    );
                }
                else {
                    return (
                        <div key={`${message.messageId}-chat-element`} id={message.messageId} className={`w-3/4  flex my-2`}>
   
                            <div className={`w-max text-black shadow-lg clear-both p-2 rounded-md bg-white` }>
                                {`${message.message_type==="forwarded"? "Forwarded:":""}`} {message.message}
                            </div>
                            
                            <div className={"forwardButton"} id={message.messageId} onClick={e => {this.setState({forwardMessageID:this.getParentID(e.target)}); this.showModal()}}>
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

    render() {
        return (
            <div className="message-box w-3/5">
                <div className=" w-full relative h-full grid grid-flow-rows">
                    {/* Contact Options Bar */}
                    <div className="user-bar text-white flex w-full py-3 absolute inset-x-0">
                        <div className="w-12 rounded-full relative h-12 text-center mx-2">
                            <img className="profile-picture absolute h-full object-cover self-center p-2" src={"/images/" + this.props.selectedUser.img} alt="dp" />
                        </div>
                        <div className="contact-name text-white font-bold w-3/4 float-left py-2">{this.props.selectedUser.name}</div>
                        <div className="icons w-1/4 text-right mr-4">
                            <i className="fas fa-video p-2 text-l"></i>
                            <i className="fa fa-phone p-2 text-l"></i>
                            <i className="fa fa-ellipsis-v p-2 text-l"></i>
                        </div>
                    </div>
                    {/* Messages Area */}
                    <div className="message-area clearfix overflow-auto my-20 p-2">
                        {this.addMessagesToChat()}
                        {this.renderModal()}
                    </div>
                    {/* Input Box and other Options */}
                    <div className="input-box flex p-2 bottom-0 absolute inset-x-0 bg-white shadow-inner">
                        <input className="msg-input p-2 w-4/5 float-left text-sm focus:outline-none focus:ring" placeholder="Write Message.."
                            value={this.state.msgText} onChange={(e) => this.handleMessageText(e)}>
                        </input>
                        <div className="icons py-2 w-1/5 text-center flex">
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
