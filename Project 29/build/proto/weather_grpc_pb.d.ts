// package: weather
// file: weather.proto

import * as grpc from '@grpc/grpc-js';
import * as weather_pb from './weather_pb';

interface IWeatherService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  cities: IWeatherService_Icities;
  get: IWeatherService_Iget;
  forecast: IWeatherService_Iforecast;
  ping: IWeatherService_Iping;
}

interface IWeatherService_Icities extends grpc.MethodDefinition<weather_pb.CityQuery, weather_pb.CityQuery.Result> {
  path: '/weather.Weather/cities'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<weather_pb.CityQuery>;
  requestDeserialize: grpc.deserialize<weather_pb.CityQuery>;
  responseSerialize: grpc.serialize<weather_pb.CityQuery.Result>;
  responseDeserialize: grpc.deserialize<weather_pb.CityQuery.Result>;
}

interface IWeatherService_Iget extends grpc.MethodDefinition<weather_pb.GetTemperature, weather_pb.Temperature> {
  path: '/weather.Weather/get'
  requestStream: false
  responseStream: true
  requestSerialize: grpc.serialize<weather_pb.GetTemperature>;
  requestDeserialize: grpc.deserialize<weather_pb.GetTemperature>;
  responseSerialize: grpc.serialize<weather_pb.Temperature>;
  responseDeserialize: grpc.deserialize<weather_pb.Temperature>;
}

interface IWeatherService_Iforecast extends grpc.MethodDefinition<weather_pb.Forecast, weather_pb.Forecast.Result> {
  path: '/weather.Weather/forecast'
  requestStream: true
  responseStream: true
  requestSerialize: grpc.serialize<weather_pb.Forecast>;
  requestDeserialize: grpc.deserialize<weather_pb.Forecast>;
  responseSerialize: grpc.serialize<weather_pb.Forecast.Result>;
  responseDeserialize: grpc.deserialize<weather_pb.Forecast.Result>;
}

interface IWeatherService_Iping extends grpc.MethodDefinition<weather_pb.Ping, weather_pb.Ping.Ack> {
  path: '/weather.Weather/ping'
  requestStream: true
  responseStream: false
  requestSerialize: grpc.serialize<weather_pb.Ping>;
  requestDeserialize: grpc.deserialize<weather_pb.Ping>;
  responseSerialize: grpc.serialize<weather_pb.Ping.Ack>;
  responseDeserialize: grpc.deserialize<weather_pb.Ping.Ack>;
}

export const WeatherService: IWeatherService;
export interface IWeatherServer extends grpc.UntypedServiceImplementation {
  cities: grpc.handleUnaryCall<weather_pb.CityQuery, weather_pb.CityQuery.Result>;
  get: grpc.handleServerStreamingCall<weather_pb.GetTemperature, weather_pb.Temperature>;
  forecast: grpc.handleBidiStreamingCall<weather_pb.Forecast, weather_pb.Forecast.Result>;
  ping: grpc.handleClientStreamingCall<weather_pb.Ping, weather_pb.Ping.Ack>;
}

export interface IWeatherClient {
  cities(request: weather_pb.CityQuery, callback: (error: grpc.ServiceError | null, response: weather_pb.CityQuery.Result) => void): grpc.ClientUnaryCall;
  cities(request: weather_pb.CityQuery, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: weather_pb.CityQuery.Result) => void): grpc.ClientUnaryCall;
  cities(request: weather_pb.CityQuery, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: weather_pb.CityQuery.Result) => void): grpc.ClientUnaryCall;
  get(request: weather_pb.GetTemperature, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<weather_pb.Temperature>;
  get(request: weather_pb.GetTemperature, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<weather_pb.Temperature>;
  forecast(): grpc.ClientDuplexStream<weather_pb.Forecast, weather_pb.Forecast.Result>;
  forecast(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<weather_pb.Forecast, weather_pb.Forecast.Result>;
  forecast(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<weather_pb.Forecast, weather_pb.Forecast.Result>;
  ping(callback: (error: grpc.ServiceError | null, response: weather_pb.Ping.Ack) => void): grpc.ClientWritableStream<weather_pb.Ping>;
  ping(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: weather_pb.Ping.Ack) => void): grpc.ClientWritableStream<weather_pb.Ping>;
  ping(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: weather_pb.Ping.Ack) => void): grpc.ClientWritableStream<weather_pb.Ping>;
  ping(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: weather_pb.Ping.Ack) => void): grpc.ClientWritableStream<weather_pb.Ping>;
}

export class WeatherClient extends grpc.Client implements IWeatherClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public cities(request: weather_pb.CityQuery, callback: (error: grpc.ServiceError | null, response: weather_pb.CityQuery.Result) => void): grpc.ClientUnaryCall;
  public cities(request: weather_pb.CityQuery, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: weather_pb.CityQuery.Result) => void): grpc.ClientUnaryCall;
  public cities(request: weather_pb.CityQuery, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: weather_pb.CityQuery.Result) => void): grpc.ClientUnaryCall;
  public get(request: weather_pb.GetTemperature, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<weather_pb.Temperature>;
  public get(request: weather_pb.GetTemperature, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<weather_pb.Temperature>;
  public forecast(): grpc.ClientDuplexStream<weather_pb.Forecast, weather_pb.Forecast.Result>;
  public forecast(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<weather_pb.Forecast, weather_pb.Forecast.Result>;
  public forecast(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<weather_pb.Forecast, weather_pb.Forecast.Result>;
  public ping(callback: (error: grpc.ServiceError | null, response: weather_pb.Ping.Ack) => void): grpc.ClientWritableStream<weather_pb.Ping>;
  public ping(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: weather_pb.Ping.Ack) => void): grpc.ClientWritableStream<weather_pb.Ping>;
  public ping(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: weather_pb.Ping.Ack) => void): grpc.ClientWritableStream<weather_pb.Ping>;
  public ping(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: weather_pb.Ping.Ack) => void): grpc.ClientWritableStream<weather_pb.Ping>;
}

