import request from './api'

const searchPostCode = (postcode:any) => {
    return request({
      url: `http://api.postcodes.io/postcodes/${postcode}`,
      method: 'GET',
    }).catch((err:any) => {
      return err.data ? err.data : { error: 'Sorry, we got error from server, try again.', err: err};
    });
  
  }

const PostCodeAPI = {
    searchPostCode
}

export default PostCodeAPI;