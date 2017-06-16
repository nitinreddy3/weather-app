import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import WeatherApp from '../javascript/components/WeatherApp';
import InfoPanel from '../javascript/components/InfoPanel';

/**
 * Test case for Weather App component rendering
 */
describe('WeatherApp', () => {
    it('renders without problems', () => {
        var root = TestUtils.renderIntoDocument(<WeatherApp/>);
        expect(root).toExist();
    });
});


/**
 * Test case for get a 5 day weather data based on search criteria - In progress
 */
describe('Search field', () => {
    it('gives a weather report of current 5 days', () => {

    });
});