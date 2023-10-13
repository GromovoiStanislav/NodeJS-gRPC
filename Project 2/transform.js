const fs = require('fs');
const protos = require('./prices_pb');
const pricesData = require('./prices.json');

/// Сериализация
const prices = new protos.Prices();
for (const priceData of pricesData) {
  const price = new protos.Price();
  price.setDate(priceData.Date);
  price.setPrice(priceData.Price);
  price.setOpen(priceData.Open);
  price.setHigh(priceData.High);
  price.setChangepercentfromlastmonth(priceData.ChangePercentFromLastMonth);
  price.setVolume(priceData.Volume);

  prices.addPrices(price);
}

console.log(prices);
console.log(prices.toString());

const serialized = prices.serializeBinary();
fs.writeFileSync('prices.binary', serialized);

console.log(serialized);
console.log(serialized.toString());

/// Десериализация
const bytes = fs.readFileSync('prices.binary');
const deserialized = protos.Prices.deserializeBinary(bytes);

console.log(deserialized);
console.log(deserialized.toString());
