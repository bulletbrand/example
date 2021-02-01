import axios from 'axios';
import antNotificationComponent from '../utils/notification-ant-utils'

/**
 * Setting up the axios object
 */
const API = axios.create({
    baseURL: 'http://localhost:3000/',
    responseType: 'json',
    headers: {'cache': 'no-store'}
});


/**
 * Callback that is executed in case of a successful request
 */
const onFullfiled = (response) => {
    return response.data;
};


/**
 * Callback that is executed in case of an error
 */
const onRejected = (error) => {
    if (error.response && error.response.status === 401) {
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.clear() //clear all data if the cookie expired
        window.location.reload()
    } else if (error.response && error.response.status === 500) {
        antNotificationComponent({
            type: 'error',
            description: error.response.statusText || ' Internal server error'
        });
    } else if (error.response && error.response.data.message) {
        antNotificationComponent({
            type: 'error',
            description: error.response.data.message
        });
    } else {
        antNotificationComponent({
            type: 'error',
            description: 'Oops something went wrong'
        });
    }

    return Promise.reject(error);
};

API.interceptors.response.use(onFullfiled, onRejected);

export default API;
