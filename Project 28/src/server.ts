import * as grpc from '@grpc/grpc-js';

import { WalletService } from './proto/wallet_grpc_pb';
import {
  BalanceResponse,
  BalanceRequest,
  WalletInfoResponse,
  Transaction,
  TransactionResponse,
  TransactionRequest,
  CreateAddressResponse,
  CreateAddressRequest,
  WalletInfoRequest,
} from './proto/wallet_pb';

function transaction(
  call: grpc.ServerUnaryCall<TransactionRequest, TransactionResponse>,
  callback: grpc.sendUnaryData<TransactionResponse>
) {
  const toAaddress = call.request.getToaddress();
  const metadata = call.request.getMetadata();
  const points = call.request.getPoints();
  // Perform necessary business logic
  const transactionId = Date.now();
  const transactionResponse = new TransactionResponse();
  transactionResponse.setTransactionId(transactionId);
  callback(null, transactionResponse);
}

function balance(
  call: grpc.ServerUnaryCall<BalanceRequest, BalanceResponse>,
  callback: grpc.sendUnaryData<BalanceResponse>
) {
  const address = call.request.getAddress();
  // Perform necessary business logic
  const total = 100;
  const available = 50;
  const balanceResponse = new BalanceResponse();
  balanceResponse.setTotal(total);
  balanceResponse.setAvailable(available);
  callback(null, balanceResponse);
}

function createAddress(
  call: grpc.ServerUnaryCall<CreateAddressRequest, CreateAddressResponse>,
  callback: grpc.sendUnaryData<CreateAddressResponse>
) {
  // Perform necessary business logic
  const address = '0x1234567890abcdef';
  const createAddressResponse = new CreateAddressResponse();
  createAddressResponse.setAddress(address);
  callback(null, createAddressResponse);
}

async function walletInfo(
  call: grpc.ServerUnaryCall<WalletInfoRequest, WalletInfoResponse>,
  callback: grpc.sendUnaryData<WalletInfoResponse>
) {
  const address = call.request.getAddress();
  try {
    const result = {
      total: 100,
      available: 80,
    };
    const transactions = [];

    {
      const tr = new Transaction();
      tr.setToAddress(address);
      tr.setPoints(10);
      tr.setMetadata('0x1234567890');
      transactions.push(tr);
    }
    {
      const tr = new Transaction();
      tr.setToAddress(address);
      tr.setPoints(20);
      tr.setMetadata('0x0987654321');
      transactions.push(tr);
    }

    const walletInfoResponse = new WalletInfoResponse();
    walletInfoResponse.setTotal(result.total);
    walletInfoResponse.setAvailable(result.available);
    walletInfoResponse.setTransactionsList(transactions);

    callback(null, walletInfoResponse);
  } catch (err) {
    callback(err, null);
  }
}

const server = new grpc.Server();
server.addService(WalletService, {
  createAddress,
  transaction,
  balance,
  walletInfo,
});

server.bindAsync(
  '127.0.0.1:50051',
  grpc.ServerCredentials.createInsecure(),
  (e, port) => {
    if (e) throw e;
    console.log(`Server started, listening: 127.0.0.1:${port}`);
    server.start();
  }
);
