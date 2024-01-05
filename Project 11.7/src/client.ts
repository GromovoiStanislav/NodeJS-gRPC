import * as grpc from '@grpc/grpc-js';
import { weather } from './types/weather.js';
import { resolve } from 'path';
import { rejects } from 'assert';

const host = '0.0.0.0';
const port = 9090;
const connectionString = `${host}:${port}`;

const client = new weather.WeatherClient(
  connectionString,
  grpc.credentials.createInsecure()
);

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
};

const getCities = async (): Promise<weather.City[]> => {
  console.log('----- Cities ------');

  const cities = await client.cities(new weather.CityQuery());
  cities.cities.forEach((city: weather.City) => {
    console.log(`Cities: code: ${city.code}, name: ${city.name}`);
  });

  return cities.cities;
};

const get = (cities: weather.City[]): Promise<void> => {
  console.log('----- Get ------');

  return new Promise((resolve, reject) => {
    cities.forEach((city: weather.City) => {
      client
        .get(
          weather.GetTemperature.fromObject({
            code: city.code,
          })
        )
        .on('data', (data: weather.Temperature) => {
          console.log(`get: code: ${data.code}, current: ${data.current}`);
        })
        .on('end', () => resolve(null));
    });
  });
};

const forecast = (cities: weather.City[]): Promise<void> => {
  console.log('----- Forecast ------');

  return new Promise((resolve, reject) => {
    const stream = client
      .forecast()
      .on('data', (data: weather.Forecast.Result) => {
        console.log(
          `forecast: code: ${data.temperature.code}, current: ${data.temperature.current}`
        );
      })
      .on('end', () => resolve(null));

    cities.forEach((city: weather.City) => {
      stream.write(
        new weather.Forecast({ code: city.code, date: Date.now().toString() })
      );
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
