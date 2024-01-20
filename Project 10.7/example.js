const {
  Timestamp,
} = require('google-protobuf/google/protobuf/timestamp_pb.js');
const google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

// Создание объекта google.protobuf.Timestamp
const timestamp = new Timestamp();

const currentTimestamp = new Date();
console.log(currentTimestamp);
const seconds = Math.floor(currentTimestamp.getTime() / 1000); // текущее время в секундах
const nanos = currentTimestamp.getMilliseconds() * 1000000;

timestamp.setSeconds(seconds);
timestamp.setNanos(nanos);

// timestamp.fromDate(new Date());

// const timeMS = Date.now();
// timestamp.setSeconds(timeMS / 1000);
// timestamp.setNanos((timeMS % 1000) * 1e6);

{
  const date = new Date(
    timestamp.getSeconds() * 1000 + timestamp.getNanos() / 1000000
  );
  console.log(date);
}

console.log(timestamp.toDate());
console.log(timestamp.toObject(false)); //{ seconds: 1705730237.643, nanos: 643000000 }

{
  const timestamp = Timestamp.fromDate(new Date());
  console.log(timestamp.toDate());
  console.log(Timestamp.toObject(false, timestamp)); //{ seconds: 1705730732, nanos: 133000000 }
}

// function toDate(timestamp: Timestamp): Date {
function toDate(timestamp) {
  return new Date(timestamp.getSeconds() * 1000 + timestamp.getNanos() / 1e6);
}
console.log(toDate(timestamp));
