import * as grpc from '@grpc/grpc-js';
import { CityQuery, WeatherClient } from './types/weather.js';
const host = '0.0.0.0';
const port = 9090;
const connectionString = `${host}:${port}`;
const client = new WeatherClient(connectionString, grpc.credentials.createInsecure());
const cities = await client.cities(new CityQuery());
cities.cities.forEach((el) => {
    console.log(el.code);
    console.log(el.name);
    console.log();
});
