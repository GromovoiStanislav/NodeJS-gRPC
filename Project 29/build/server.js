'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const grpc = require('@grpc/grpc-js');
const weather_grpc_pb_1 = require('./proto/weather_grpc_pb');
const weather_pb_1 = require('./proto/weather_pb');
const cities = (call, callback) => {
  const cities = [];
  {
    const city = new weather_pb_1.City();
    city.setCode('TR_ANTALYA');
    city.setName('Antalya');
    cities.push(city);
  }
  {
    const city = new weather_pb_1.City();
    city.setCode('CA_VANCOUVER');
    city.setName('Vancouver');
    cities.push(city);
  }
  const result = new weather_pb_1.CityQuery.Result();
  result.setCitiesList(cities);
  callback(null, result);
};
const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
};
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const get = async (call) => {
  const code = call.request.getCode();
  let temp = 70;
  for (let i = 0; i < getRandomInt(10, 30); i++) {
    temp = temp - getRandomInt(0, 4);
    const temperature = new weather_pb_1.Temperature();
    temperature.setCode(code);
    temperature.setCurrent(temp);
    call.write(temperature);
    await delay(getRandomInt(200, 800));
  }
  call.end();
};
const server = new grpc.Server();
server.addService(weather_grpc_pb_1.WeatherService, {
  cities,
  get,
});
server.bindAsync(
  '127.0.0.1:9090',
  grpc.ServerCredentials.createInsecure(),
  (e, port) => {
    if (e) throw e;
    console.log(`Server started, listening: 127.0.0.1:${port}`);
    server.start();
  }
);
