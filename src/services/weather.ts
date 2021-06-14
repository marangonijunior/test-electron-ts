import request from './api'

const searchWeather = (latlng:any) => {
    return request({
      url: `http://api.openweathermap.org/data/2.5/weather?lat=${latlng.lat}&lon=${latlng.lng}&units=metric&appid=8578f16aca0be6b25305308a5b505c6f`,
      method: 'GET',
    }).catch((err:any) => {
      return err.data ? err.data : { error: 'Sorry, we got error from server, try again.', err: err};
    });
  
  }

const WeatherAPI = {
    searchWeather
}

export default WeatherAPI;