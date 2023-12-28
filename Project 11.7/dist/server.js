import * as crypto from 'crypto';
import * as grpc from '@grpc/grpc-js';
import { City, CityQuery, Temperature, UnimplementedWeatherService, } from './types/weather.js';
const server = new grpc.Server();
const port = 9090;
const host = '0.0.0.0';
const main = async () => {
    const rand = (min, max) => {
        const range = max - min + 1;
        const randomBytes = crypto.randomBytes(4);
        const randomNumber = randomBytes.readUInt32LE(0);
        const scaledNumber = Math.floor((randomNumber / 0xffffffff) * range);
        return scaledNumber + min;
    };
    const serviceImpl = {
        cities: (call, callback) => {
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
        get: (call) => {
            // const a = call.request?.a;
            // const b = call.request?.b;
            for (let i = 1; i <= 10; i++) {
                call.write(Temperature.fromObject({
                    code: call.request.code,
                    current: i,
                }));
            }
            call.end();
        },
    };
    server.addService(UnimplementedWeatherService.definition, serviceImpl);
    server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        server.start();
        console.log('server running on port', port);
    });
};
main();