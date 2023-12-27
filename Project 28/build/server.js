"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = require("@grpc/grpc-js");
const wallet_grpc_pb_1 = require("./proto/wallet_grpc_pb");
const wallet_pb_1 = require("./proto/wallet_pb");
function transaction(call, callback) {
    const toAaddress = call.request.getToaddress();
    const metadata = call.request.getMetadata();
    const points = call.request.getPoints();
    // Perform necessary business logic
    const transactionId = Date.now();
    const transactionResponse = new wallet_pb_1.TransactionResponse();
    transactionResponse.setTransactionId(transactionId);
    callback(null, transactionResponse);
}
function balance(call, callback) {
    const address = call.request.getAddress();
    // Perform necessary business logic
    const total = 100;
    const available = 50;
    const balanceResponse = new wallet_pb_1.BalanceResponse();
    balanceResponse.setTotal(total);
    balanceResponse.setAvailable(available);
    callback(null, balanceResponse);
}
function createAddress(call, callback) {
    // Perform necessary business logic
    const address = '0x1234567890abcdef';
    const createAddressResponse = new wallet_pb_1.CreateAddressResponse();
    createAddressResponse.setAddress(address);
    callback(null, createAddressResponse);
}
async function walletInfo(call, callback) {
    const address = call.request.getAddress();
    try {
        const result = {
            total: 100,
            available: 80,
        };
        const transactions = [];
        {
            const tr = new wallet_pb_1.Transaction();
            tr.setToAddress(address);
            tr.setPoints(10);
            tr.setMetadata('0x1234567890');
            transactions.push(tr);
        }
        {
            const tr = new wallet_pb_1.Transaction();
            tr.setToAddress(address);
            tr.setPoints(20);
            tr.setMetadata('0x0987654321');
            transactions.push(tr);
        }
        const walletInfoResponse = new wallet_pb_1.WalletInfoResponse();
        walletInfoResponse.setTotal(result.total);
        walletInfoResponse.setAvailable(result.available);
        walletInfoResponse.setTransactionsList(transactions);
        callback(null, walletInfoResponse);
    }
    catch (err) {
        callback(err, null);
    }
}
const server = new grpc.Server();
server.addService(wallet_grpc_pb_1.WalletService, {
    createAddress,
    transaction,
    balance,
    walletInfo,
});
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (e, port) => {
    if (e)
        throw e;
    console.log(`Server started, listening: 127.0.0.1:${port}`);
    server.start();
});
