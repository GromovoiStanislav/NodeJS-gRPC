"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = require("@grpc/grpc-js");
const weather_grpc_pb_1 = require("./proto/weather_grpc_pb");
const weather_pb_1 = require("./proto/weather_pb");
const client = new weather_grpc_pb_1.WeatherClient('localhost:9090', grpc.credentials.createInsecure());
const getCities = () => {
    console.log('-----Cities-----');
    return new Promise((resolve, reject) => {
        let cities;
        client.cities(new weather_pb_1.CityQuery(), (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            cities = data.getCitiesList();
            cities.forEach((city) => {
                console.log(city.getCode());
                console.log(city.getName());
                console.log();
            });
            resolve(cities);
        });
    });
};
const get = (cities) => {
    console.log('-----Get-----');
    return new Promise((resolve, reject) => {
        cities.forEach((city) => {
            const getTemperature = new weather_pb_1.GetTemperature();
            getTemperature.setCode(city.getCode());
            client.get(getTemperature).on('data', (data) => {
                console.log(`get: code: ${data.getCode()}, current: ${data.getCurrent()}`);
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
