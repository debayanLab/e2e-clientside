import './DynamicLinks.css';
import React from 'react'
import { useParams , Redirect} from 'react-router-dom';
import notFound from '../notFound/notFound';
import { getDefaultNormalizer } from '@testing-library/react';

const DynamicLinks = (props) => {
    const {id} = useParams();
    // const [role, setRole] = React.useState('');
    // const [name, setName] = React.useState('');
    // const [role, setrole] = React.useState('');
    const [xid, setXid] = React.useState('');
    const [public_key, setPublic_key] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [exist, setExist] = React.useState(true);

    React.useEffect(()=>{
        if (Object.keys(props).length > 0) {
            if (props.team.length > 0) {
                
                let found= props.team.some((entry) => entry._id === id )
                if (found){
                    let current = props.team.filter((entry) => entry._id === id )
                    setXid(current[0]._id)
                    setPublic_key(current[0].public_key)
                    
                    setLoading(false);
                }
                else {
                    setExist(false);
                }
            }
        }
    },[props])

    return (
        <div className="body">
        <div className="login_container">
            {!exist && (<Redirect to="/notFound" />)}
            {loading ? (<h2>Loading ...</h2>) :(<React.Fragment>
                <h1>User Id and Public key</h1>
                    <div classname="import">
                        <h1><b>User ID :</b> {xid}</h1>
                        <br></br>
                        <h1><b>Public Key:</b> {public_key}</h1>
                    </div>
            </React.Fragment>)}

            </div>
        </div>
    )
}



export default DynamicLinks;
