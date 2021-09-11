import React, { Component } from 'react'
import './contactList.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat'; 
import MoreVertIcon from '@material-ui/icons/MoreVert'; 
import {SearchOutlined} from '@material-ui/icons';

export default class ContactList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: this.props.users
        }
    }

    setSelectedUser(selectedUser) {
        this.props.selectedUser(selectedUser)
    }

    // Method to Update Last Message
    getLastMessage(userid) {
        for (let chat of Object.values(this.props.chats)) {
            if (chat.members.includes(userid)) {
                return chat.messages[chat.messages.length - 1]
            }
        }
    }

    getLastMessageDetails(user) {
        let lastMessage = this.getLastMessage(user._id)
        const lastMessageDetails = (
            <>
                <div className="grid w-full">
                    <div className="contact-menu  px-2">{user.name}</div>
                    {lastMessage ? <div className="last-message px-2 text-sm">{lastMessage.message}</div> : null}
                </div>
                {lastMessage ? <div className="last-message-time">{lastMessage.date}</div> : null}
            </>
        )
        return lastMessageDetails
    }

    getContacts() {

        const contactDetails = this.state.users.map(user =>
            <div className="contactlist-body" key={`${user._id}-contact`}>
            <div className="user flex mt-2 p-2 border-b" id={user._id} onClick={() => this.setSelectedUser(user)}>
                <div className="w-1/4 rounded-full relative h-12 text-center">
                    <img className="profile-picture absolute h-full object-cover self-center" src={"/images/" + user.img} alt="dp" />
                </div>
                {this.getLastMessageDetails(user)}
            </div>
            </div>
        )
        return (contactDetails)
    }

    render() {
        return (
            <div className="contactList_body">
                <div className="contactList_header">
                    <div className="contactList_header_right">
                        <DonutLargeIcon/>
                        <ChatIcon/>
                        <MoreVertIcon/>
                    </div>
                </div>

                <div className="search_bar">
                    <div className="search_bar_container">
                        <SearchOutlined/>
                        <input placeholder="Search or start new chat" type="text"/>
                    </div>
                </div>

                <div className="contracts clearfix overflow-auto">
                    {this.getContacts()}
                </div>
            </div>
        )
    }
}
