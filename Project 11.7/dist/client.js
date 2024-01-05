import * as grpc from '@grpc/grpc-js';
import { weather } from './types/weather.js';
const host = '0.0.0.0';
const port = 9090;
const connectionString = `${host}:${port}`;
const client = new weather.WeatherClient(connectionString, grpc.credentials.createInsecure());
const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, ms);
    });
};
const getCities = async () => {
    console.log('----- Cities ------');
    const cities = await client.cities(new weather.CityQuery());
    cities.cities.forEach((city) => {
        console.log(`Cities: code: ${city.code}, name: ${city.name}`);
    });
    return cities.cities;
};
const get = (cities) => {
    console.log('----- Get ------');
    return new Promise((resolve, reject) => {
        cities.forEach((city) => {
            client
                .get(weather.GetTemperature.fromObject({
                code: city.code,
            }))
                .on('data', (data) => {
                console.log(`get: code: ${data.code}, current: ${data.current}`);
            })
                .on('end', () => resolve(null));
        });
    });
};
const forecast = (cities) => {
    console.log('----- Forecast ------');
    return new Promise((resolve, reject) => {
        const stream = client
            .forecast()
            .on('data', (data) => {
            console.log(`forecast: code: ${data.temperature.code}, current: ${data.temperature.current}`);
        })
            .on('end', () => resolve(null));
        cities.forEach((city) => {
            stream.write(new weather.Forecast({ code: city.code, date: Date.now().toString() }));
        });
        stream.end();
    });
};
(async () => {
    const cities = await getCities();
    await delay(1000);
    await get(cities);
    await delay(2000);
    await forecast(cities);
})();
