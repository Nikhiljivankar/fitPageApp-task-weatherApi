const WeatherResponse = (data) => ({
	location: data.location,
	temp_celsius: data.current.temp_c,
	temp_fahrenheit: data.current.temp_f,
    condition : data.current.condition?.text ?? data.current.condition,
    humidity: data.current.humidity,
	wind_speed_kph: data.current.wind_kph,
	wind_speed_mph: data.current.wind_mph	
});

module.exports = WeatherResponse;