import React, { Component } from 'react'
import moment from 'moment'
import './messageBox.css';
import MoreVertIcon from '@material-ui/icons/MoreVert'; 
import {IconButton} from '@material-ui/core';
import ForwardIcon from '@material-ui/icons/Forward';

import Modal from '../modal/modal.js'

export default class MessageBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            msgText: "",
            showContacts:false,
            show:false,
        }
        this.sendMessageToServer = this.sendMessageToServer.bind(this)

        this.showContacts = this.showContacts.bind(this);
        
        this.showModal = this.showModal.bind(this);
         this.hideModal = this.hideModal.bind(this);

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

    sendMessageToServer() {
        if (this.state.msgText) { //to not send empty message
            let msgObj = {
                message: this.state.msgText,
                date: moment().format('LT'),
                message_type: "new-message"
            }
            this.props.setNewMsgObj(msgObj)
        }
        this.setState({ msgText: "" })
    }

    forward (message, recipient) {
        console.log ("[", message.senderid, "->", recipient, "] : ", message.message)

        let msgObj = {
            message: message.message,
            date: moment().format('LT'),
            message_type: "forwarded", 
            originator: message.senderid,
            recipient: recipient,
        }
        this.props.setNewMsgObj(msgObj)

    }

    addForward (message) {
        return (
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <br></br>
                    <ul>
                        <br></br>
                        {this.props.users.map((user) => (
                            <li><button onClick={() => (this.forward(message, user._id))}>
                                {user.name}
                            </button></li>
                        ))}
                    </ul>
                    <br></br>
                </Modal>
                <IconButton>
                    <ForwardIcon onClick={this.showModal}/>
                </IconButton>
            </div>
            
        )
    }

    // Method to Display Messages
    addMessagesToChat() {
        if (this.props.messages) {
            const msgContent = this.props.messages.map(function (message) {
                //  Display message you sent
                if (message.receiverid === this.props.selectedUser._id) {
                    return (
                        <div key={message.messageId} className={`w-3/4  flex my-2 ${message.receiverid === this.props.selectedUser._id ? "justify-end float-right":""}` }>
    
                            <div className="forwardButton">
                                {this.addForward(message)}
                            </div>
    
                            <div className={`w-max text-black shadow-lg clear-both p-2 rounded-md ${message.receiverid === this.props.selectedUser._id ? "bg-green-200" : "bg-white"}` }>
                                {`${message.message_type==="forwarded"? "Forwarded:":""}`} {message.message}
                            </div>
                            
                        </div>
                    );
                }
                else {
                    return (
                        <div key={message.messageId} className={`w-3/4  flex my-2 ${message.receiverid === this.props.selectedUser._id ? "justify-end float-right":""}` }>
   
                            <div className={`w-max text-black shadow-lg clear-both p-2 rounded-md ${message.receiverid === this.props.selectedUser._id ? "bg-green-200" : "bg-white"}` }>
                                {`${message.message_type==="forwarded"? "Forwarded:":""}`} {message.message}
                            </div>
                            
                            <div className="forwardButton">
                                {this.addForward(message)}
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
            // <div className="chat">
            //     <div className="chat_header">
            //             <div className="w-12 rounded-full relative h-12 text-center mx-2">
            //                  <img className="profile-picture absolute h-full object-cover self-center p-1" src={"/images/" + this.props.selectedUser.img} alt="dp" />
            //             </div>
            //         <div className="chat_header_info"> 
            //             <h2>{this.props.selectedUser.name}</h2>
            //         </div>

            //         <div className="chat_header_right">
            //             <SearchOutlined/>
            //             <MoreVertIcon/>
            //         </div>
            //     </div>
            //          <div className="message-area clearfix overflow-auto">
            //              {this.addMessagesToChat()}
            //          </div>
            // </div>

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
