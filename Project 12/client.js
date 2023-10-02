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

// Создание клиента gRPC
const client = new files_service_package.FilesService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);



const upload = () => {

  const fileStream = client.UploadFile((error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(response.message);
    }
  });

  // Открываем файл для чтения
  const filePath = 'cat.jpg';

  
  const fileInfo = path.parse(filePath);
  const file_name = fileInfo.name; // Имя файла
  const file_extension = fileInfo.ext.slice(1); // Расширение файла без точки (убираем первый символ)


  const fileReadStream = fs.createReadStream(filePath);
  
  fileReadStream.on('data', (chunk) => {
    // Отправляем каждую часть файла вместе с именем и расширением
    fileStream.write({ file_name, file_extension, data: chunk });
  });

  fileReadStream.on('end', () => {
    // Завершаем поток и закрываем соединение после передачи всего файла
    fileStream.end();
  });

  fileReadStream.on('error', (error) => {
    console.error('Error reading file:', error);
  });

}


const download = () => {
  // Имя файла, который вы хотите скачать
  const fileToDownload = 'cat.jpg';

  // Создаем файловый поток для сохранения скачанного файла
  const downloadPath = path.join(__dirname, 'downloads', fileToDownload);

  const fileStream = fs.createWriteStream(downloadPath);


  // Отправляем запрос на скачивание файла
  const downloadCall = client.DownloadFile({
    file_name: fileToDownload
  });

  downloadCall.on('data', (chunk) => {
    // Получаем части файла и записываем их в файловый поток
    fileStream.write(chunk.data);
  });

  downloadCall.on('end', () => {
    // Завершаем поток и закрываем файловый поток после завершения скачивания
    fileStream.end();
    console.log(`File "${fileToDownload}" downloaded successfully`);
  });

  downloadCall.on('error', (error) => {
    console.error('Error during file download:', error);
    fileStream.end(); // Закрываем файловый поток в случае ошибки
  });
};

// upload()
download();
