"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = require("@grpc/grpc-js");
const wallet_grpc_pb_1 = require("./proto/wallet_grpc_pb");
const wallet_pb_1 = require("./proto/wallet_pb");
const client = new wallet_grpc_pb_1.WalletClient('localhost:50051', grpc.credentials.createInsecure());
//// WalletInfo
{
    const request = new wallet_pb_1.WalletInfoRequest();
    request.setAddress('0x1234567890abcdef');
    client.walletInfo(request, (error, response) => {
        console.log('-----WalletInfo-----');
        if (error) {
            console.error(error);
        }
        else {
            console.log('Total', response.getTotal());
            console.log('Available', response.getAvailable());
            console.log();
            const transactionsList = response.getTransactionsList();
            transactionsList.forEach((el) => {
                console.log('ToAddress', el.getToAddress());
                console.log('Points', el.getPoints());
                console.log('Metadata', el.getMetadata());
                console.log();
            });
        }
    });
}
//// Balance
{
    const request = new wallet_pb_1.BalanceRequest();
    request.setAddress('0x1234567890abcdef');
    client.balance(request, (error, response) => {
        console.log('-----Balance-----');
        if (error) {
            console.error(error);
        }
        else {
            console.log('Total', response.getTotal());
            console.log('Available', response.getAvailable());
            console.log();
        }
    });
}
//// CreateAddress
{
    const request = new wallet_pb_1.CreateAddressRequest();
    client.createAddress(request, (error, response) => {
        console.log('-----CreateAddress-----');
        if (error) {
            console.error(error);
        }
        else {
            console.log('Address', response.getAddress());
            console.log();
        }
    });
}
//// Transaction
{
    const request = new wallet_pb_1.TransactionRequest();
    request.setToaddress('0x1234567890abcdef');
    request.setMetadata('same Metadata');
    request.setPoints(10);
    client.transaction(request, (error, response) => {
        console.log('-----Transaction-----');
        if (error) {
            console.error(error);
        }
        else {
            console.log('TransactionId', response.getTransactionId());
            console.log();
        }
    });
}
