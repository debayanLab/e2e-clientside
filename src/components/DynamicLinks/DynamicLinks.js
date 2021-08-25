import './DynamicLinks.css';
import React from 'react'
import { useParams } from 'react-router-dom';
import notFound from '../notFound/notFound';
import { getDefaultNormalizer } from '@testing-library/react';

const DynamicLinks = (props) => {
    const {id} = useParams();

    return (
        <div className="body">
            <h2>Public keys of users</h2>
                {props.team.map((user) => ( 
                    <div classname="import">
                        <h1>{id === user._id && "Random ID: " + id}</h1>
                    </div>
                ))}
        </div>
    )
}



export default DynamicLinks;
