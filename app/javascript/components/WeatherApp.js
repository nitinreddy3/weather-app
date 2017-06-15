import React, {Component} from 'react';
import Days from './Days';
import InfoPanel from './InfoPanel';
import WeatherModal from '../modal/weatherModal';

var WeatherApp = React.createClass({
    getInitialState() {
        return {weatherData: null, loaded: false, searchCrit: 'pune ', daysData: []}
    },

    setSearchCrit(newSearchCrit) {
        this.setState({searchCrit: newSearchCrit});
        this.getWeatherData();
    },

    componentWillMount() {
        this.getWeatherData();
    },

    getWeatherData() {
        var params = {
            units: 'metric',
            q: this.state.searchCrit,
            mode: 'json',
            appid: 'efcd313fa7a139f2fb20de306648eb8d'
        };
        WeatherModal
            .getWeatherInfo(params)
            .then((res) => {
                this.setState({weatherData: res, loaded: true});
            })
            .catch((err) => {
                console.log(err);
            })
    },

    render() {
        if (this.state.loaded) {
            this.state.daysData = [];
            let today = new Date();
            today.setHours(23, 59, 59, 999);
            today = today.getTime();
            this
                .state
                .weatherData
                .list
                .forEach((day) => {
                    var currentDate = new Date(day.dt * 1000);
                    if ((day.dt * 1000) > today && currentDate.getHours() === 11) {
                        this
                            .state
                            .daysData
                            .push(<Days key={day.dt} weatherData={day}/>);
                    }
                });
            let weatherData = this.state.weatherData.list[0];
            var todaysDate = new Date(this.state.weatherData.list[0].dt * 1000);
            return (
                <div className="container-fluid" ref="app">
                    <h2 className="text-center">Weather Info App</h2>
                    <div className="mainWrapper">
                        <InfoPanel
                            city={this.state.weatherData.city}
                            today={this.state.weatherData.list[0]}
                            changeHandler={this.setSearchCrit}
                            ref="mainInfo"/>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <div className="main-info-city-name">{todaysDate.toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: 'short',
                                        hour: 'numeric'
                                    })}</div>
                            </div>
                            <div className="panel-body">
                                <img
                                    src={"http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png"}
                                    alt="weather_icon"
                                    className="day-info-img"/>
                                <div className="day-info-temperature">
                                    <label>Temperature :
                                    </label>
                                    {Math.round(weatherData.main.temp)}
                                    °C</div>
                                <div className="day-info-temperature">
                                    <label>Humidity :
                                    </label>
                                    {Math.round(weatherData.main.humidity)}
                                    %</div>
                                <div className="day-info-temperature">
                                    <label>Pressure :
                                    </label>
                                    {Math.round(weatherData.main.pressure)}
                                    Pa</div>
                            </div>
                        </div>
                        {this.state.daysData}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ajax-loader-container">
                    <div className="ajax-loader"></div>
                </div>
            );
        }
    }
});

export default WeatherApp;