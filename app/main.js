require('./theme/stylesheets/main.sass');
import React from 'react';
import ReactDOM from 'react-dom';
import WeatherApp from './javascript/components/WeatherApp';

ReactDOM.render(<WeatherApp />, document.getElementById('app'));