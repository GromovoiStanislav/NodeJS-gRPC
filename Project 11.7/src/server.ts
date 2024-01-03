import * as crypto from 'crypto';
import * as grpc from '@grpc/grpc-js';
import {
  City,
  CityQuery,
  GetTemperature,
  Temperature,
  UnimplementedWeatherService,
} from './types/weather.js';

const server = new grpc.Server();
const port = 9090;
const host = '0.0.0.0';

const main = async () => {
  const rand = (min: number, max: number): number => {
    const range = max - min + 1;
    const randomBytes = crypto.randomBytes(4);
    const randomNumber = randomBytes.readUInt32LE(0);
    const scaledNumber = Math.floor((randomNumber / 0xffffffff) * range);

    return scaledNumber + min;
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const serviceImpl = {
    cities: (
      call: grpc.ServerUnaryCall<CityQuery, CityQuery.Result>,
      callback: grpc.sendUnaryData<CityQuery.Result>
    ) => {
      const cities = [];

      {
        const city = new City();
        city.code = 'TR_ANTALYA';
        city.name = 'Antalya';
        cities.push(city);
      }
      {
        const city = new City();
        city.code = 'CA_VANCOUVER';
        city.name = 'Vancouver';
        cities.push(city);
      }

      const result = new CityQuery.Result();
      result.cities = cities;

      callback(null, result);
    },

    get: (call: grpc.ServerWritableStream<GetTemperature, Temperature>) => {
      const { code } = call.request;

      let temp = 70;
      for (let i = 0; i < getRandomInt(10, 30); i++) {
        temp = temp - getRandomInt(0, 4);

        call.write(
          Temperature.fromObject({
            code: code,
            current: temp,
          })
        );
      }

      call.end();
    },
  };

  server.addService(UnimplementedWeatherService.definition, serviceImpl);
  server.bindAsync(
    `${host}:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      server.start();
      console.log('server running on port', port);
    }
  );
};

main();
