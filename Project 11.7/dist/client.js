import * as grpc from '@grpc/grpc-js';
import { weather } from './types/weather.js';
const host = '0.0.0.0';
const port = 9090;
const connectionString = `${host}:${port}`;
const client = new weather.WeatherClient(connectionString, grpc.credentials.createInsecure());
////// cities
const cities = await client.cities(new weather.CityQuery());
cities.cities.forEach((city) => {
    console.log(city.code);
    console.log(city.name);
    console.log();
});
////// get
client
    .get(weather.GetTemperature.fromObject({
    code: cities.cities[0].code,
}))
    .on('data', (data) => {
    console.log(`get: code: ${data.code}, current: ${data.current}`);
});
client
    .get(weather.GetTemperature.fromObject({
    code: cities.cities[1].code,
}))
    .on('data', (data) => {
    console.log(`get: code: ${data.code}, current: ${data.current}`);
});
////// forecast
const stream = client.forecast().on('data', (data) => {
    console.log(`forecast: code: ${data.temperature.code}, current: ${data.temperature.current}`);
});
cities.cities.forEach((city) => {
    stream.write(new weather.Forecast({ code: city.code, date: Date.now().toString() }));
});
stream.end();
