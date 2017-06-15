import http from '../mixins/restutils';

const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/forecast';

const weatherModal = {
    getWeatherInfo: (params) => {
        return http.requestData(WEATHER_API_URL, params, http.requestType.get);
    }
};

export default weatherModal;
