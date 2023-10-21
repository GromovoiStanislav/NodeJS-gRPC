import { Client } from 'minio';
import { Readable } from 'stream';

const minioClient = new Client({
  endPoint: 'play.min.io',
  port: 9000,
  useSSL: true,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
});

// const minioClient = new Client({
//   endPoint: 'localhost',
//   port: 9000,
//   useSSL: false,
//   accessKey: '1xzgRR22x7I4Cky7mY2a',
//   secretKey: '4hhNR7KrjUsa0ygPulL2RPvwPfZMTGul2zAt7kxT',
// });

{
  // Make a bucket called europetrip.
  minioClient.makeBucket('grpctest', 'us-east-1', (err) => {
    if (err) return console.log(err);

    console.log('Bucket created successfully in "us-east-1".');
  });

  const file = 'cat.jpg';
  const metaData = {
    'Content-Type': 'application/octet-stream',
    'X-Amz-Meta-Testing': 1234,
    example: 5678,
  };

  minioClient.fPutObject('grpctest', 'cat.jpg', file, metaData, (err, etag) => {
    if (err) return console.log(err);
    console.log('etag', etag);
    console.log('File uploaded successfully.');
  });
}

{
  minioClient.bucketExists('grpctest', (err, exists) => {
    if (err) {
      return console.log(err);
    }
    if (exists) {
      return console.log('Bucket exists.');
    } else {
      return console.log('Bucket not exists.');
    }
  });
}

{
  let size = 0;
  minioClient.getObject('grpctest', 'cat.jpg', (err, dataStream) => {
    if (err) {
      return console.log(err);
    }

    dataStream.on('data', (chunk) => {
      console.log(chunk);
      size += chunk.length;
    });

    dataStream.on('end', () => {
      console.log('End. Total size = ' + size);
    });

    dataStream.on('error', (err) => {
      console.log(err);
    });
  });
}

{
  async function getObjectChunks() {
    let size = 0;
    return new Promise((resolve, reject) => {
      minioClient.getObject('grpctest', 'cat.jpg', (err, dataStream) => {
        if (err) {
          reject(err);
          return;
        }

        const chunks = [];

        dataStream.on('data', (chunk) => {
          size += chunk.length;
          chunks.push(chunk);
        });

        dataStream.on('end', () => {
          console.log('End. Total size = ' + size);
          resolve(chunks); // Решение обещания с массивом chunk
        });

        dataStream.on('error', (err) => {
          reject(err);
        });
      });
    });
  }

  // Используйте асинхронную функцию для получения chunk
  (async () => {
    try {
      const chunkArray = await getObjectChunks();
      for (const chunk of chunkArray) {
        console.log(chunk);
      }
    } catch (err) {
      console.error(err);
    }
  })();
}

{
  async function getObjectChunks() {
    let size = 0;
    return new Promise((resolve, reject) => {
      minioClient.getObject('grpctest', 'cat.jpg', (err, dataStream) => {
        if (err) {
          reject(err);
          return;
        }

        const chunks = [];

        dataStream.on('data', (chunk) => {
          size += chunk.length;
          chunks.push(chunk);
        });

        dataStream.on('end', () => {
          console.log('End. Total size = ' + size);

          // Объединяем буферы байтов в один буфер
          const concatenatedBuffer = Buffer.concat(chunks, size);
          resolve(concatenatedBuffer);
        });

        dataStream.on('error', (err) => {
          reject(err);
        });
      });
    });
  }

  // Используйте асинхронную функцию для получения объединенного буфера
  (async () => {
    try {
      const concatenatedBuffer = await getObjectChunks();
      console.log(concatenatedBuffer);
    } catch (err) {
      console.error(err);
    }
  })();
}

{
  const fetchFileStream = ({ bucketName, fileName }) => {
    minioClient.getObject(bucketName, fileName, (err, dataStream) => {
      if (err) {
        console.log(err);
        //call.emit('error', err);
        return;
      }

      dataStream.on('data', (chunk) => {
        console.log(chunk);
        //call.write({ data: chunk });
      });

      dataStream.on('end', () => {
        //call.end();
        console.log('Получены все части данных и отправлены через gRPC.');
      });

      dataStream.on('error', (err) => {
        console.log(err);
        //call.emit('error', err);
      });
    });
  };

  fetchFileStream({ bucketName: 'grpctest', fileName: 'cat.jpg' });
}

{
  const customStream = new Readable();

  customStream._read = () => {
    // Пользовательский поток готов к чтению, но в этом примере нет необходимости в дополнительных действиях.
  };
  customStream.on('data', (chunk) => {
    // chunk является буфером байтов
    console.log(chunk);
  });

  customStream.on('end', () => {
    console.log('Пользовательский поток завершился.');
  });

  customStream.on('error', (error) => {
    console.error('Ошибка в пользовательском потоке:', error.message);
  });

  minioClient.getObject('grpctest', 'cat.jpg', (err, dataStream) => {
    if (err) {
      // Генерируем и передаем ошибку в пользовательский поток
      const customError = new Error('Произошла ошибка');
      customStream.emit('error', customError);
      // Закрываем пользовательский поток после возникновения ошибки
      customStream.push(null);
      return;
    }

    dataStream.on('data', (chunk) => {
      // Передаем chunk в пользовательский поток
      customStream.push(chunk);
    });

    dataStream.on('end', () => {
      customStream.push(null); // Сигнализируем о завершении чтения пользовательского потока
      console.log('End.');
    });

    dataStream.on('error', (err) => {
      // Генерируем и передаем ошибку в пользовательский поток
      const customError = new Error('Произошла ошибка');
      customStream.emit('error', customError);
      // Закрываем пользовательский поток после возникновения ошибки
      customStream.push(null);
    });
  });
}
