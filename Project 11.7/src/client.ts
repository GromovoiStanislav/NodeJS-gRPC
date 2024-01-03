import * as grpc from '@grpc/grpc-js';
import {
  City,
  CityQuery,
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

const cities_r: CityQuery.Result = await client.cities(new CityQuery());

cities_r.cities.forEach((el: City) => {
  console.log(el.code);
  console.log(el.name);
  console.log();
});

client
  .get(
    GetTemperature.fromObject({
      code: cities_r.cities![0].code,
    })
  )
  .on('data', (data: Temperature) => {
    console.log(`code: ${data.code}, current: ${data.current}`);
  });

client
  .get(
    GetTemperature.fromObject({
      code: cities_r.cities![1].code,
    })
  )
  .on('data', (data: Temperature) => {
    console.log(`code: ${data.code}, current: ${data.current}`);
  });
