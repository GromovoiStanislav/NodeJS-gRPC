// package: 
// file: wallet.proto

import * as jspb from 'google-protobuf';

export class CreateAddressRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateAddressRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateAddressRequest): CreateAddressRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateAddressRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateAddressRequest;
  static deserializeBinaryFromReader(message: CreateAddressRequest, reader: jspb.BinaryReader): CreateAddressRequest;
}

export namespace CreateAddressRequest {
  export type AsObject = {
  }
}

export class CreateAddressResponse extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateAddressResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateAddressResponse): CreateAddressResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateAddressResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateAddressResponse;
  static deserializeBinaryFromReader(message: CreateAddressResponse, reader: jspb.BinaryReader): CreateAddressResponse;
}

export namespace CreateAddressResponse {
  export type AsObject = {
    address: string,
  }
}

export class TransactionRequest extends jspb.Message {
  getToaddress(): string;
  setToaddress(value: string): void;

  getPoints(): number;
  setPoints(value: number): void;

  getMetadata(): string;
  setMetadata(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionRequest): TransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionRequest;
  static deserializeBinaryFromReader(message: TransactionRequest, reader: jspb.BinaryReader): TransactionRequest;
}

export namespace TransactionRequest {
  export type AsObject = {
    toaddress: string,
    points: number,
    metadata: string,
  }
}

export class TransactionResponse extends jspb.Message {
  getTransactionId(): number;
  setTransactionId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionResponse): TransactionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionResponse;
  static deserializeBinaryFromReader(message: TransactionResponse, reader: jspb.BinaryReader): TransactionResponse;
}

export namespace TransactionResponse {
  export type AsObject = {
    transactionId: number,
  }
}

export class BalanceRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceRequest): BalanceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BalanceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceRequest;
  static deserializeBinaryFromReader(message: BalanceRequest, reader: jspb.BinaryReader): BalanceRequest;
}

export namespace BalanceRequest {
  export type AsObject = {
    address: string,
  }
}

export class BalanceResponse extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  getAvailable(): number;
  setAvailable(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceResponse): BalanceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BalanceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceResponse;
  static deserializeBinaryFromReader(message: BalanceResponse, reader: jspb.BinaryReader): BalanceResponse;
}

export namespace BalanceResponse {
  export type AsObject = {
    total: number,
    available: number,
  }
}

export class WalletInfoRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WalletInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WalletInfoRequest): WalletInfoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WalletInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WalletInfoRequest;
  static deserializeBinaryFromReader(message: WalletInfoRequest, reader: jspb.BinaryReader): WalletInfoRequest;
}

export namespace WalletInfoRequest {
  export type AsObject = {
    address: string,
  }
}

export class WalletInfoResponse extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  getAvailable(): number;
  setAvailable(value: number): void;

  clearTransactionsList(): void;
  getTransactionsList(): Array<Transaction>;
  setTransactionsList(value: Array<Transaction>): void;
  addTransactions(value?: Transaction, index?: number): Transaction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WalletInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WalletInfoResponse): WalletInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WalletInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WalletInfoResponse;
  static deserializeBinaryFromReader(message: WalletInfoResponse, reader: jspb.BinaryReader): WalletInfoResponse;
}

export namespace WalletInfoResponse {
  export type AsObject = {
    total: number,
    available: number,
    transactionsList: Array<Transaction.AsObject>,
  }
}

export class Transaction extends jspb.Message {
  getToAddress(): string;
  setToAddress(value: string): void;

  getPoints(): number;
  setPoints(value: number): void;

  getMetadata(): string;
  setMetadata(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Transaction.AsObject;
  static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Transaction;
  static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
  export type AsObject = {
    toAddress: string,
    points: number,
    metadata: string,
  }
}

