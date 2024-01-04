// package: weather
// file: weather.proto

import * as jspb from 'google-protobuf';

export class City extends jspb.Message {
  getCode(): string;
  setCode(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): City.AsObject;
  static toObject(includeInstance: boolean, msg: City): City.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: City, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): City;
  static deserializeBinaryFromReader(message: City, reader: jspb.BinaryReader): City;
}

export namespace City {
  export type AsObject = {
    code: string,
    name: string,
  }
}

export class Temperature extends jspb.Message {
  getCode(): string;
  setCode(value: string): void;

  getCurrent(): number;
  setCurrent(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Temperature.AsObject;
  static toObject(includeInstance: boolean, msg: Temperature): Temperature.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Temperature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Temperature;
  static deserializeBinaryFromReader(message: Temperature, reader: jspb.BinaryReader): Temperature;
}

export namespace Temperature {
  export type AsObject = {
    code: string,
    current: number,
  }
}

export class CityQuery extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CityQuery.AsObject;
  static toObject(includeInstance: boolean, msg: CityQuery): CityQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CityQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CityQuery;
  static deserializeBinaryFromReader(message: CityQuery, reader: jspb.BinaryReader): CityQuery;
}

export namespace CityQuery {
  export type AsObject = {
  }

  export class Result extends jspb.Message {
    clearCitiesList(): void;
    getCitiesList(): Array<City>;
    setCitiesList(value: Array<City>): void;
    addCities(value?: City, index?: number): City;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Result.AsObject;
    static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Result, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Result;
    static deserializeBinaryFromReader(message: Result, reader: jspb.BinaryReader): Result;
  }

  export namespace Result {
    export type AsObject = {
      citiesList: Array<City.AsObject>,
    }
  }
}

export class GetTemperature extends jspb.Message {
  getCode(): string;
  setCode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTemperature.AsObject;
  static toObject(includeInstance: boolean, msg: GetTemperature): GetTemperature.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTemperature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTemperature;
  static deserializeBinaryFromReader(message: GetTemperature, reader: jspb.BinaryReader): GetTemperature;
}

export namespace GetTemperature {
  export type AsObject = {
    code: string,
  }
}

export class Ping extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ping.AsObject;
  static toObject(includeInstance: boolean, msg: Ping): Ping.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Ping, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ping;
  static deserializeBinaryFromReader(message: Ping, reader: jspb.BinaryReader): Ping;
}

export namespace Ping {
  export type AsObject = {
  }

  export class Ack extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Ack.AsObject;
    static toObject(includeInstance: boolean, msg: Ack): Ack.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Ack, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Ack;
    static deserializeBinaryFromReader(message: Ack, reader: jspb.BinaryReader): Ack;
  }

  export namespace Ack {
    export type AsObject = {
    }
  }
}

export class Forecast extends jspb.Message {
  getCode(): string;
  setCode(value: string): void;

  getDate(): string;
  setDate(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Forecast.AsObject;
  static toObject(includeInstance: boolean, msg: Forecast): Forecast.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Forecast, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Forecast;
  static deserializeBinaryFromReader(message: Forecast, reader: jspb.BinaryReader): Forecast;
}

export namespace Forecast {
  export type AsObject = {
    code: string,
    date: string,
  }

  export class Result extends jspb.Message {
    hasTemperature(): boolean;
    clearTemperature(): void;
    getTemperature(): Temperature | undefined;
    setTemperature(value?: Temperature): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Result.AsObject;
    static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Result, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Result;
    static deserializeBinaryFromReader(message: Result, reader: jspb.BinaryReader): Result;
  }

  export namespace Result {
    export type AsObject = {
      temperature?: Temperature.AsObject,
    }
  }
}

