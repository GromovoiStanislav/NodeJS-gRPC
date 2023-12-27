// package: 
// file: wallet.proto

import * as grpc from '@grpc/grpc-js';
import * as wallet_pb from './wallet_pb';

interface IWalletService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  createAddress: IWalletService_IcreateAddress;
  transaction: IWalletService_Itransaction;
  balance: IWalletService_Ibalance;
  walletInfo: IWalletService_IwalletInfo;
}

interface IWalletService_IcreateAddress extends grpc.MethodDefinition<wallet_pb.CreateAddressRequest, wallet_pb.CreateAddressResponse> {
  path: '/.Wallet/createAddress'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<wallet_pb.CreateAddressRequest>;
  requestDeserialize: grpc.deserialize<wallet_pb.CreateAddressRequest>;
  responseSerialize: grpc.serialize<wallet_pb.CreateAddressResponse>;
  responseDeserialize: grpc.deserialize<wallet_pb.CreateAddressResponse>;
}

interface IWalletService_Itransaction extends grpc.MethodDefinition<wallet_pb.TransactionRequest, wallet_pb.TransactionResponse> {
  path: '/.Wallet/transaction'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<wallet_pb.TransactionRequest>;
  requestDeserialize: grpc.deserialize<wallet_pb.TransactionRequest>;
  responseSerialize: grpc.serialize<wallet_pb.TransactionResponse>;
  responseDeserialize: grpc.deserialize<wallet_pb.TransactionResponse>;
}

interface IWalletService_Ibalance extends grpc.MethodDefinition<wallet_pb.BalanceRequest, wallet_pb.BalanceResponse> {
  path: '/.Wallet/balance'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<wallet_pb.BalanceRequest>;
  requestDeserialize: grpc.deserialize<wallet_pb.BalanceRequest>;
  responseSerialize: grpc.serialize<wallet_pb.BalanceResponse>;
  responseDeserialize: grpc.deserialize<wallet_pb.BalanceResponse>;
}

interface IWalletService_IwalletInfo extends grpc.MethodDefinition<wallet_pb.WalletInfoRequest, wallet_pb.WalletInfoResponse> {
  path: '/.Wallet/walletInfo'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<wallet_pb.WalletInfoRequest>;
  requestDeserialize: grpc.deserialize<wallet_pb.WalletInfoRequest>;
  responseSerialize: grpc.serialize<wallet_pb.WalletInfoResponse>;
  responseDeserialize: grpc.deserialize<wallet_pb.WalletInfoResponse>;
}

export const WalletService: IWalletService;
export interface IWalletServer extends grpc.UntypedServiceImplementation {
  createAddress: grpc.handleUnaryCall<wallet_pb.CreateAddressRequest, wallet_pb.CreateAddressResponse>;
  transaction: grpc.handleUnaryCall<wallet_pb.TransactionRequest, wallet_pb.TransactionResponse>;
  balance: grpc.handleUnaryCall<wallet_pb.BalanceRequest, wallet_pb.BalanceResponse>;
  walletInfo: grpc.handleUnaryCall<wallet_pb.WalletInfoRequest, wallet_pb.WalletInfoResponse>;
}

export interface IWalletClient {
  createAddress(request: wallet_pb.CreateAddressRequest, callback: (error: grpc.ServiceError | null, response: wallet_pb.CreateAddressResponse) => void): grpc.ClientUnaryCall;
  createAddress(request: wallet_pb.CreateAddressRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wallet_pb.CreateAddressResponse) => void): grpc.ClientUnaryCall;
  createAddress(request: wallet_pb.CreateAddressRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wallet_pb.CreateAddressResponse) => void): grpc.ClientUnaryCall;
  transaction(request: wallet_pb.TransactionRequest, callback: (error: grpc.ServiceError | null, response: wallet_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
  transaction(request: wallet_pb.TransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wallet_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
  transaction(request: wallet_pb.TransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wallet_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
  balance(request: wallet_pb.BalanceRequest, callback: (error: grpc.ServiceError | null, response: wallet_pb.BalanceResponse) => void): grpc.ClientUnaryCall;
  balance(request: wallet_pb.BalanceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wallet_pb.BalanceResponse) => void): grpc.ClientUnaryCall;
  balance(request: wallet_pb.BalanceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wallet_pb.BalanceResponse) => void): grpc.ClientUnaryCall;
  walletInfo(request: wallet_pb.WalletInfoRequest, callback: (error: grpc.ServiceError | null, response: wallet_pb.WalletInfoResponse) => void): grpc.ClientUnaryCall;
  walletInfo(request: wallet_pb.WalletInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wallet_pb.WalletInfoResponse) => void): grpc.ClientUnaryCall;
  walletInfo(request: wallet_pb.WalletInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wallet_pb.WalletInfoResponse) => void): grpc.ClientUnaryCall;
}

export class WalletClient extends grpc.Client implements IWalletClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public createAddress(request: wallet_pb.CreateAddressRequest, callback: (error: grpc.ServiceError | null, response: wallet_pb.CreateAddressResponse) => void): grpc.ClientUnaryCall;
  public createAddress(request: wallet_pb.CreateAddressRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wallet_pb.CreateAddressResponse) => void): grpc.ClientUnaryCall;
  public createAddress(request: wallet_pb.CreateAddressRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wallet_pb.CreateAddressResponse) => void): grpc.ClientUnaryCall;
  public transaction(request: wallet_pb.TransactionRequest, callback: (error: grpc.ServiceError | null, response: wallet_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
  public transaction(request: wallet_pb.TransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wallet_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
  public transaction(request: wallet_pb.TransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wallet_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
  public balance(request: wallet_pb.BalanceRequest, callback: (error: grpc.ServiceError | null, response: wallet_pb.BalanceResponse) => void): grpc.ClientUnaryCall;
  public balance(request: wallet_pb.BalanceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wallet_pb.BalanceResponse) => void): grpc.ClientUnaryCall;
  public balance(request: wallet_pb.BalanceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wallet_pb.BalanceResponse) => void): grpc.ClientUnaryCall;
  public walletInfo(request: wallet_pb.WalletInfoRequest, callback: (error: grpc.ServiceError | null, response: wallet_pb.WalletInfoResponse) => void): grpc.ClientUnaryCall;
  public walletInfo(request: wallet_pb.WalletInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: wallet_pb.WalletInfoResponse) => void): grpc.ClientUnaryCall;
  public walletInfo(request: wallet_pb.WalletInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: wallet_pb.WalletInfoResponse) => void): grpc.ClientUnaryCall;
}

