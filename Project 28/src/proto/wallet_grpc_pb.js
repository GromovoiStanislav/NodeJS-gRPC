// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var wallet_pb = require('./wallet_pb.js');

function serialize_BalanceRequest(arg) {
  if (!(arg instanceof wallet_pb.BalanceRequest)) {
    throw new Error('Expected argument of type BalanceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BalanceRequest(buffer_arg) {
  return wallet_pb.BalanceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_BalanceResponse(arg) {
  if (!(arg instanceof wallet_pb.BalanceResponse)) {
    throw new Error('Expected argument of type BalanceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BalanceResponse(buffer_arg) {
  return wallet_pb.BalanceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateAddressRequest(arg) {
  if (!(arg instanceof wallet_pb.CreateAddressRequest)) {
    throw new Error('Expected argument of type CreateAddressRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateAddressRequest(buffer_arg) {
  return wallet_pb.CreateAddressRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateAddressResponse(arg) {
  if (!(arg instanceof wallet_pb.CreateAddressResponse)) {
    throw new Error('Expected argument of type CreateAddressResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateAddressResponse(buffer_arg) {
  return wallet_pb.CreateAddressResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TransactionRequest(arg) {
  if (!(arg instanceof wallet_pb.TransactionRequest)) {
    throw new Error('Expected argument of type TransactionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TransactionRequest(buffer_arg) {
  return wallet_pb.TransactionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TransactionResponse(arg) {
  if (!(arg instanceof wallet_pb.TransactionResponse)) {
    throw new Error('Expected argument of type TransactionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TransactionResponse(buffer_arg) {
  return wallet_pb.TransactionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_WalletInfoRequest(arg) {
  if (!(arg instanceof wallet_pb.WalletInfoRequest)) {
    throw new Error('Expected argument of type WalletInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_WalletInfoRequest(buffer_arg) {
  return wallet_pb.WalletInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_WalletInfoResponse(arg) {
  if (!(arg instanceof wallet_pb.WalletInfoResponse)) {
    throw new Error('Expected argument of type WalletInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_WalletInfoResponse(buffer_arg) {
  return wallet_pb.WalletInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var WalletService = exports.WalletService = {
  createAddress: {
    path: '/Wallet/createAddress',
    requestStream: false,
    responseStream: false,
    requestType: wallet_pb.CreateAddressRequest,
    responseType: wallet_pb.CreateAddressResponse,
    requestSerialize: serialize_CreateAddressRequest,
    requestDeserialize: deserialize_CreateAddressRequest,
    responseSerialize: serialize_CreateAddressResponse,
    responseDeserialize: deserialize_CreateAddressResponse,
  },
  transaction: {
    path: '/Wallet/transaction',
    requestStream: false,
    responseStream: false,
    requestType: wallet_pb.TransactionRequest,
    responseType: wallet_pb.TransactionResponse,
    requestSerialize: serialize_TransactionRequest,
    requestDeserialize: deserialize_TransactionRequest,
    responseSerialize: serialize_TransactionResponse,
    responseDeserialize: deserialize_TransactionResponse,
  },
  balance: {
    path: '/Wallet/balance',
    requestStream: false,
    responseStream: false,
    requestType: wallet_pb.BalanceRequest,
    responseType: wallet_pb.BalanceResponse,
    requestSerialize: serialize_BalanceRequest,
    requestDeserialize: deserialize_BalanceRequest,
    responseSerialize: serialize_BalanceResponse,
    responseDeserialize: deserialize_BalanceResponse,
  },
  walletInfo: {
    path: '/Wallet/walletInfo',
    requestStream: false,
    responseStream: false,
    requestType: wallet_pb.WalletInfoRequest,
    responseType: wallet_pb.WalletInfoResponse,
    requestSerialize: serialize_WalletInfoRequest,
    requestDeserialize: deserialize_WalletInfoRequest,
    responseSerialize: serialize_WalletInfoResponse,
    responseDeserialize: deserialize_WalletInfoResponse,
  },
};

exports.WalletClient = grpc.makeGenericClientConstructor(WalletService);
