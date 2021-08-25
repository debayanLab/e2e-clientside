import axios from 'axios'
import Constants from './constants';

// Login API
const logIn = async (userName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'get',
                url: Constants.BASE_URL + 'api/users/login/' + userName
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

// GET all Users API
const getContacts = async (userid, role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'get',
                url: Constants.BASE_URL + 'api/users/' + userid + "/" + role
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const allUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: 'get',
                url: Constants.BASE_URL + 'api/users/'
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}


const API = {
    logIn,
    getContacts
};
export default API;