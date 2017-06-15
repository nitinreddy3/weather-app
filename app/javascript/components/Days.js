var Days = React.createClass({
  render: function() {
    var currentDate = new Date(this.props.weatherData.dt * 1000);
    
    return (
      <div className="day-infos">
        <div className="day-info day-info-name">{ 
          currentDate.toLocaleDateString( 
            'en-US', 
            { day: '2-digit', month: 'short', hour: 'numeric'}) }</div>
        <div className="day-info">
          <img src={ "http://openweathermap.org/img/w/" + this.props.weatherData.weather[0].icon + ".png"} alt="weather_icon" className="day-info-img" />
        </div>
        <div className="day-info day-info-temperature">{ Math.round(this.props.weatherData.main.temp) } °C</div>
      </div>
    );
  } 
});

export default Days;