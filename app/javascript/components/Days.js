import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

var Days = React.createClass({
    render() {
        var data = this.props.weatherData;
        var currentDate = new Date(data.dt * 1000);
        var weatherData = data.main;
        return (
            <MuiThemeProvider><Paper style={style} zDepth={2}>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="main-info-city-name">{currentDate.toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'short',
                            hour: 'numeric'
                        })}</div>
                </div>
                <div className="panel-body">
                    <img
                        src={"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"}
                        alt="weather_icon"
                        className="day-info-img"/>
                    <div className="day-info-temperature weatherStatus">
                        {data.weather[0].description}
                    </div>
                    <div className="day-info-temperature">
                        <label> Temperature :
                        </label> 
                        {Math.round(weatherData.temp)}
                        °C</div>
                    <div className="day-info-temperature">
                        <label>Humidity :
                        </label>
                        {Math.round(weatherData.humidity)}
                        %
                    </div>
                    <div className="day-info-temperature">
                        <label>Pressure :
                        </label>
                        {Math.round(weatherData.pressure)}
                        Pa
                    </div>
                </div>
            </div></Paper></MuiThemeProvider>
        );
    }
});

export default Days;