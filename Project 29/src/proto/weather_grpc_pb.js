// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var weather_pb = require('./weather_pb.js');

function serialize_weather_CityQuery(arg) {
  if (!(arg instanceof weather_pb.CityQuery)) {
    throw new Error('Expected argument of type weather.CityQuery');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_weather_CityQuery(buffer_arg) {
  return weather_pb.CityQuery.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_weather_CityQuery_Result(arg) {
  if (!(arg instanceof weather_pb.CityQuery.Result)) {
    throw new Error('Expected argument of type weather.CityQuery.Result');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_weather_CityQuery_Result(buffer_arg) {
  return weather_pb.CityQuery.Result.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_weather_Forecast(arg) {
  if (!(arg instanceof weather_pb.Forecast)) {
    throw new Error('Expected argument of type weather.Forecast');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_weather_Forecast(buffer_arg) {
  return weather_pb.Forecast.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_weather_Forecast_Result(arg) {
  if (!(arg instanceof weather_pb.Forecast.Result)) {
    throw new Error('Expected argument of type weather.Forecast.Result');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_weather_Forecast_Result(buffer_arg) {
  return weather_pb.Forecast.Result.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_weather_GetTemperature(arg) {
  if (!(arg instanceof weather_pb.GetTemperature)) {
    throw new Error('Expected argument of type weather.GetTemperature');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_weather_GetTemperature(buffer_arg) {
  return weather_pb.GetTemperature.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_weather_Ping(arg) {
  if (!(arg instanceof weather_pb.Ping)) {
    throw new Error('Expected argument of type weather.Ping');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_weather_Ping(buffer_arg) {
  return weather_pb.Ping.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_weather_Ping_Ack(arg) {
  if (!(arg instanceof weather_pb.Ping.Ack)) {
    throw new Error('Expected argument of type weather.Ping.Ack');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_weather_Ping_Ack(buffer_arg) {
  return weather_pb.Ping.Ack.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_weather_Temperature(arg) {
  if (!(arg instanceof weather_pb.Temperature)) {
    throw new Error('Expected argument of type weather.Temperature');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_weather_Temperature(buffer_arg) {
  return weather_pb.Temperature.deserializeBinary(new Uint8Array(buffer_arg));
}


var WeatherService = exports.WeatherService = {
  cities: {
    path: '/weather.Weather/cities',
    requestStream: false,
    responseStream: false,
    requestType: weather_pb.CityQuery,
    responseType: weather_pb.CityQuery.Result,
    requestSerialize: serialize_weather_CityQuery,
    requestDeserialize: deserialize_weather_CityQuery,
    responseSerialize: serialize_weather_CityQuery_Result,
    responseDeserialize: deserialize_weather_CityQuery_Result,
  },
  get: {
    path: '/weather.Weather/get',
    requestStream: false,
    responseStream: true,
    requestType: weather_pb.GetTemperature,
    responseType: weather_pb.Temperature,
    requestSerialize: serialize_weather_GetTemperature,
    requestDeserialize: deserialize_weather_GetTemperature,
    responseSerialize: serialize_weather_Temperature,
    responseDeserialize: deserialize_weather_Temperature,
  },
  forecast: {
    path: '/weather.Weather/forecast',
    requestStream: true,
    responseStream: true,
    requestType: weather_pb.Forecast,
    responseType: weather_pb.Forecast.Result,
    requestSerialize: serialize_weather_Forecast,
    requestDeserialize: deserialize_weather_Forecast,
    responseSerialize: serialize_weather_Forecast_Result,
    responseDeserialize: deserialize_weather_Forecast_Result,
  },
  // Unsupported at the moment
ping: {
    path: '/weather.Weather/ping',
    requestStream: true,
    responseStream: false,
    requestType: weather_pb.Ping,
    responseType: weather_pb.Ping.Ack,
    requestSerialize: serialize_weather_Ping,
    requestDeserialize: deserialize_weather_Ping,
    responseSerialize: serialize_weather_Ping_Ack,
    responseDeserialize: deserialize_weather_Ping_Ack,
  },
};

exports.WeatherClient = grpc.makeGenericClientConstructor(WeatherService);
