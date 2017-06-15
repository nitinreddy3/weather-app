var Days = React.createClass({
    render() {
        var data = this.props.weatherData;
        var currentDate = new Date(data.dt * 1000);
        var weatherData = data.main;
        return (<div><div className="panel panel-default">
            <div className="panel-heading">{currentDate.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    hour: 'numeric'
                })}</div>
            <div className="panel-body">
                <img
                    src={"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"}
                    alt="weather_icon"
                    className="day-info-img"/>
                <div className="day-info-temperature"><label>Temperature : </label> {Math.round(weatherData.temp)}
                °C</div>
                <div className="day-info-temperature"><label>Humidity : </label> {Math.round(weatherData.humidity)} %
                </div>
                <div className="day-info-temperature"><label>Pressure : </label> {Math.round(weatherData.pressure)} Pa
                </div>
            </div>
        </div></div>);
    }
});

export default Days;