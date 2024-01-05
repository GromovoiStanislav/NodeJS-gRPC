import * as grpc from '@grpc/grpc-js';

import { WeatherClient } from './proto/weather_grpc_pb';
import {
  City,
  CityQuery,
  Forecast,
  GetTemperature,
  Temperature,
} from './proto/weather_pb';

const client = new WeatherClient(
  'localhost:9090',
  grpc.credentials.createInsecure()
);

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
};

const getCities = (): Promise<City[]> => {
  console.log('-----Cities-----');

  return new Promise((resolve, reject) => {
    let cities: City[];
    client.cities(new CityQuery(), (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      cities = data.getCitiesList();

      cities.forEach((city: City) => {
        console.log(city.getCode());
        console.log(city.getName());
        console.log();
      });

      resolve(cities);
    });
  });
};

const get = (cities: City[]) => {
  console.log('-----Get-----');

  return new Promise((resolve, reject) => {
    cities.forEach((city: City) => {
      const getTemperature = new GetTemperature();
      getTemperature.setCode(city.getCode());

      client
        .get(getTemperature)
        .on('data', (data: Temperature) => {
          console.log(
            `get: code: ${data.getCode()}, current: ${data.getCurrent()}`
          );
        })
        .on('end', () => resolve(null));
    });
  });
};

const forecast = (cities: City[]) => {
  console.log('-----Forecast-----');

  return new Promise((resolve, reject) => {
    const stream = client
      .forecast()
      .on('data', (data: Forecast.Result) => {
        console.log(
          `forecast: code: ${data.getTemperature().getCode()}, current: ${data
            .getTemperature()
            .getCurrent()}`
        );
      })
      .on('end', () => resolve(null));

    cities.forEach((city: City) => {
      const req = new Forecast();
      req.setCode(city.getCode());
      req.setDate(Date.now().toString());

      stream.write(req);
    });
    stream.end();
  });
};

const main = async () => {
  const cities = await getCities();
  await delay(1000);
  await get(cities);
  await delay(2000);
  await forecast(cities);
};

main();
