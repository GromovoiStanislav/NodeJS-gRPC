import * as grpc from '@grpc/grpc-js';

import { WeatherClient } from './proto/weather_grpc_pb';
import {
  City,
  CityQuery,
  GetTemperature,
  Temperature,
} from './proto/weather_pb';

const client = new WeatherClient(
  'localhost:9090',
  grpc.credentials.createInsecure()
);

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

      client.get(getTemperature).on('data', (data: Temperature) => {
        console.log(
          `get: code: ${data.getCode()}, current: ${data.getCurrent()}`
        );
      });
    });
    resolve(null);
  });
};

const main = async () => {
  const cities = await getCities();
  await get(cities);
};

main();
