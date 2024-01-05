import * as crypto from 'crypto';
import * as grpc from '@grpc/grpc-js';
import { weather } from './types/weather.js';
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
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const delay = (ms) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, ms);
        });
    };
    const serviceImpl = {
        cities: (call, callback) => {
            const cities = [];
            {
                const city = new weather.City();
                city.code = 'TR_ANTALYA';
                city.name = 'Antalya';
                cities.push(city);
            }
            {
                const city = new weather.City();
                city.code = 'CA_VANCOUVER';
                city.name = 'Vancouver';
                cities.push(city);
            }
            const result = new weather.CityQuery.Result();
            result.cities = cities;
            callback(null, result);
        },
        get: async (call) => {
            const { code } = call.request;
            let temp = 70;
            for (let i = 0; i < getRandomInt(10, 30); i++) {
                temp = temp - getRandomInt(0, 4);
                call.write(weather.Temperature.fromObject({
                    code: code,
                    current: temp,
                }));
                await delay(getRandomInt(200, 800));
            }
            call.end();
        },
        forecast(call) {
            call.on('data', async (forecast) => {
                const code = forecast.code;
                const date = forecast.date;
                for (let i = 0; i < 5; i++) {
                    const temperature = new weather.Temperature({
                        code,
                        current: getRandomInt(10, 30),
                    });
                    call.write(new weather.Forecast.Result({ temperature }));
                    await delay(getRandomInt(200, 800));
                }
            });
            // Client closed the stream
            call.on('end', () => {
                setTimeout(() => call.end(), 10 * 1000);
            });
        },
    };
    server.addService(weather.UnimplementedWeatherService.definition, serviceImpl);
    server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        server.start();
        console.log('server running on port', port);
    });
};
main();
