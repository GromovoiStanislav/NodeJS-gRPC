// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var currency_pb = require('./currency_pb.js');

function serialize_currency_ConvertRequest(arg) {
  if (!(arg instanceof currency_pb.ConvertRequest)) {
    throw new Error('Expected argument of type currency.ConvertRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_currency_ConvertRequest(buffer_arg) {
  return currency_pb.ConvertRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_currency_ConvertResponse(arg) {
  if (!(arg instanceof currency_pb.ConvertResponse)) {
    throw new Error('Expected argument of type currency.ConvertResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_currency_ConvertResponse(buffer_arg) {
  return currency_pb.ConvertResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CurrencyConverterService = exports.CurrencyConverterService = {
  convert: {
    path: '/currency.CurrencyConverter/Convert',
    requestStream: false,
    responseStream: false,
    requestType: currency_pb.ConvertRequest,
    responseType: currency_pb.ConvertResponse,
    requestSerialize: serialize_currency_ConvertRequest,
    requestDeserialize: deserialize_currency_ConvertRequest,
    responseSerialize: serialize_currency_ConvertResponse,
    responseDeserialize: deserialize_currency_ConvertResponse,
  },
};

exports.CurrencyConverterClient = grpc.makeGenericClientConstructor(CurrencyConverterService);
