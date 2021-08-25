import './DynamicLinks.css';
import React from 'react'
import { useParams } from 'react-router-dom';

function DynamicLinks(props) {
    const {id} =useParams();
    console.log(props.name)
    
    return (
        <div className="body">
            <h2>Public keys of users</h2>
            <h2>{id}</h2>
            {props.name.map((user) => (
                    
                <h1> {user._id}  </h1>                 
                ))}
        </div>
    )
}


export default DynamicLinks;
