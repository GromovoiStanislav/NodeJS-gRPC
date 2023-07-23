const protoLoader = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')
const fs = require('fs')
const { promisify } = require('util');
const { Transform, pipeline } = require('stream');
const protoFileName = "./prices.proto"



const packageDefinition = protoLoader.loadSync(protoFileName, {
	includeDirs: [__dirname]
})
const proto = grpc.loadPackageDefinition(packageDefinition)

const client = new proto.bitcoinPrices.HistoryData('0.0.0.0:8001', grpc.credentials.createInsecure());

client.get({ Date: "02/01/2023" }, (error, response) => {
	if (error) {
		console.error(error)
		return;
	}

	console.log("find currencies from server " + JSON.stringify(response))
})

client.list(null, (error, response) => {
	if (error) {
		console.error(error)
		return;
	}

	console.log("read currencies from server " + JSON.stringify(response))
})



async function run() {
	for await (const price of client.listStream(null)) {
		console.log('Stream price', price);
	}
}

run()



async function run2() {
	const call = client.listStream();
	call.on('data', function (price) {
		console.log('Stream price', price);
	});
	call.on('end', function () {
		// The server has finished sending
	});
	call.on('error', function (e) {
		// An error has occurred and the stream has been closed.
	});
	call.on('status', function (status) {
		// process status
	});
}

run2()


async function writJSON() {
	const pipelineAsync = promisify(pipeline);
	const readableStream = client.listStream(null);
	const writableStream = fs.createWriteStream('prices-from-stream.json');

	try {
		let isFirstObject = true;
		await pipelineAsync(
			readableStream,
			new Transform({
				objectMode: true,
				transform(chunk, encoding, callback) {
					// Форматирование объекта в строку JSON с переносом строки и запятой между объектами
					const jsonString = (isFirstObject ? '[' : ',\n') + JSON.stringify(chunk);
					isFirstObject = false;
					this.push(jsonString);
					callback();
				},
				flush(callback) {
					// Завершаем массив и закрываем поток записи
					this.push(']');
					callback();
				},
			}),
			writableStream
		);
		console.log('Pipeline succeeded.');
	} catch (err) {
		console.error('Error:', err);
	}
}

writJSON()



