import './DynamicLinks.css';
import { withRouter } from 'react-router-dom';
import React from 'react'
import { useParams } from 'react-router-dom';

function DynamicLinks(props) {

    const {id} =useParams()

    return (
        <div className="body">
            <h2>Public keys of users</h2>
            <h2>{id}</h2>
        </div>
    )
}

export default withRouter(DynamicLinks);
