const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const fs = require('fs');



// Загрузка protobuf
const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'files.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    //includeDirs: [__dirname],
  }
);

// Загрузка gRPC пакета определения
const { files_service_package } = grpc.loadPackageDefinition(packageDefinition);



// Реализация методов сервера
const server = new grpc.Server();
server.addService(files_service_package.FilesService.service, {
  
  UploadFile: (call, callback) => {

    let fileStream;
    let fileName;
    let fileExtension;

    const uploadsFolder = 'uploads';
    if (!fs.existsSync(uploadsFolder)) {
      fs.mkdirSync(uploadsFolder);
    }

    
    call.on('data', (chunk) => {
      // Первая часть данных содержит имя файла и расширение
      if (!fileStream) {
        fileName = chunk.file_name;
        fileExtension = chunk.file_extension;
        fileStream = fs.createWriteStream(`${uploadsFolder}/${fileName}.${fileExtension}`);
      }

      // Получаем и записываем части файла
      fileStream.write(chunk.data);
    });

    call.on('end', () => {
      // Закрываем поток и завершаем операцию
      fileStream.end();
      callback(null, { message: 'File uploaded successfully' });
    });

    call.on('error', (error) => {
      console.error('Error during file upload:', error);
      callback(error);
    });
  },

  DownloadFile: (call) => {
    const uploadsFolder = 'uploads';

    const fileName = call.request.file_name;
    const filePath = `${uploadsFolder}/${fileName}`;

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);

      // Отправляем файл клиенту в виде частей
      for (let i = 0; i < fileData.length; i += 1024) {
        const chunk = fileData.slice(i, i + 1024); // Отправляем файл по частям (1024 байта каждая)
        const fileChunk = {
          data: chunk,
        };
        call.write(fileChunk);
      }

      call.end();
    } else {
      // Если файл не найден, отправляем ошибку клиенту
      const error = new Error(`File not found: ${fileName}`);
      error.code = grpc.status.NOT_FOUND;
      call.emit('error', error);
    }
  },

});



// Запуск сервера
const PORT = '50051';
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error('Error starting server:', err);
    } else {
      console.log(`Server running at http://0.0.0.0:${PORT}`);
      server.start();
      console.log('[x] To exit press CTRL+C');
    }
  }
);
