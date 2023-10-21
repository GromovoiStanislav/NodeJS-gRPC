import { Client } from 'minio';

const minioClient = new Client({
  endPoint: 'play.min.io',
  port: 9000,
  useSSL: true,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
});

//const bucketName = 'grpctest';

const makeBucket = (bucketName) => {
  return new Promise((resolve, reject) => {
    minioClient.makeBucket(bucketName, 'us-east-1', (err) => {
      if (err) {
        console.log(err);
        reject();
      } else {
        console.log('Bucket created successfully in "us-east-1".');
        resolve(true);
      }
    });
  });
};

const bucketExists = (bucketName) => {
  return new Promise((resolve, reject) => {
    minioClient.bucketExists(bucketName, async (err, exists) => {
      if (err) {
        console.log(err);
        reject();
      }
      if (exists) {
        //console.log('Bucket exists.');
        resolve(true);
      } else {
        resolve(false);
        console.log('Bucket not exists.');
      }
    });
  });
};

const putObject = (bucketName, fileName, file) => {
  return new Promise((resolve, reject) => {
    const metaData = {
      'Content-Type': 'application/octet-stream',
      // 'X-Amz-Meta-Testing': 1234,
      // example: 5678,
    };

    minioClient.putObject(bucketName, fileName, file, metaData, (err, etag) => {
      if (err) {
        console.log(err);
        reject();
      } else {
        // console.log('File uploaded successfully.');
        resolve(etag);
      }
    });
  });
};

const removeFile = async ({ bucketName, fileName }) => {
  await minioClient.removeObject(bucketName, fileName);
};

const putFile = async ({ bucketName, fileName, file }) => {
  if (!(await bucketExists(bucketName))) {
    await makeBucket(bucketName);
  }

  return await putObject(bucketName, fileName, file);
};

const fetchFileStream = ({ customStream, bucketName, fileName }) => {
  minioClient.getObject(bucketName, fileName, (err, dataStream) => {
    if (err) {
      console.log(err);
      customStream.emit('error', new Error('FetchFile is error'));
      customStream.push(null);
      return;
    }

    dataStream.on('data', (chunk) => {
      customStream.push(chunk);
    });

    dataStream.on('end', () => {
      customStream.push(null);
      // console.log('Получены все части данных и отправлены через gRPC.');
    });

    dataStream.on('error', (err) => {
      console.log(err);
      customStream.emit('error', new Error('FetchFile is error'));
      customStream.push(null);
    });
  });
};

export default {
  putFile,
  removeFile,
  fetchFileStream,
  bucketExists,
};
