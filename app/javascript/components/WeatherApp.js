import React, { Component } from 'react';
import Days from './Days';
import InfoPanel from './InfoPanel';
import WeatherModal from '../modal/weatherModal';

var WeatherApp = React.createClass({
    getInitialState() {
        return {weatherData: null, loaded: false, searchCrit: 'san francisco', daysData: [] }
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
                this.setState({ weatherData: res, loaded: true });
            })
            .catch((err) => {
                console.log(err);
            })
    },

    render() {
        if(this.state.loaded) {
            this.state.daysData = [];
            let today = new Date();
            today.setHours(23, 59, 59, 999);
            today = today.getTime();
            this.state.weatherData.list.forEach((day) => {
                var currentDate = new Date(day.dt * 1000);

                if ((day.dt * 1000) > today && currentDate.getHours() === 11) {
                    this.state.daysData.push(<Days weatherData={day}/>);
                }
            });
            return (
            <div className="container" ref="app">
                <InfoPanel
                    city={this.state.weatherData.city}
                    today={this.state.weatherData.list[0]}
                    changeHandler={this.setSearchCrit}
                    icon={this.state.weatherData.list[0].weather[0].icon}
                    description={this.state.weatherData.list[0].weather[0].description}
                    ref="mainInfo"/> 
                {this.state.daysData}
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