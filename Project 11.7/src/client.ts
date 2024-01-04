import * as grpc from '@grpc/grpc-js';
import {
  City,
  CityQuery,
  Forecast,
  GetTemperature,
  Temperature,
  WeatherClient,
} from './types/weather.js';

const host = '0.0.0.0';
const port = 9090;
const connectionString = `${host}:${port}`;

const client = new WeatherClient(
  connectionString,
  grpc.credentials.createInsecure()
);

////// cities
const cities: CityQuery.Result = await client.cities(new CityQuery());
cities.cities.forEach((city: City) => {
  console.log(city.code);
  console.log(city.name);
  console.log();
});

////// get
client
  .get(
    GetTemperature.fromObject({
      code: cities.cities![0].code,
    })
  )
  .on('data', (data: Temperature) => {
    console.log(`get: code: ${data.code}, current: ${data.current}`);
  });

client
  .get(
    GetTemperature.fromObject({
      code: cities.cities![1].code,
    })
  )
  .on('data', (data: Temperature) => {
    console.log(`get: code: ${data.code}, current: ${data.current}`);
  });

////// forecast
const stream = client.forecast().on('data', (data: Forecast.Result) => {
  console.log(
    `forecast: code: ${data.temperature.code}, current: ${data.temperature.current}`
  );
});

cities.cities.forEach((city: City) => {
  stream.write(new Forecast({ code: city.code, date: Date.now().toString() }));
});
stream.end();
