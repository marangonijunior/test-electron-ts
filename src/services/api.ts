/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Hednei Carlos Marangoni Junior
 *
 */

 import axios from 'axios'

 /**
  * Create an Axios Client with defaults
  */
 
 const client = axios.create();
 
 /**
  * Request Wrapper with default success/error actions
  */
 const request = (options:any) => {
   const onSuccess = (response:any) => {
     // console.debug('Request Successful!', response);
     return Promise.resolve(response.data);
   }
 
   const onError = (error:any) => {
     console.error('Request Failed:', error.config);
 
     if (error.response) {
       // Request was made but server responded with something
       console.error('Status:',  error.response.status);
       console.error('Data:',    error.response.data);
       console.error('Headers:', error.response.headers);
 
     } else {
       // Something else happened while setting up the request
       console.error('Error Message:', error.message);
     }
 
     return Promise.reject(error.response || error.message);
   }
 
   return client(options)
             .then(onSuccess)
             .catch(onError);
 }
 
 export default request;