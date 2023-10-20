import fs from 'fs';

const filePath = 'cat.jpg'; // Путь к вашему файлу
const outputFile = 'cat.txt'; // Имя файла для сохранения закодированных данных

// Чтение файла
fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error('Ошибка чтения файла:', err);
  } else {
    // Преобразование байтов в Base64
    const base64Data = data.toString('base64');

    // Сохранение закодированных данных в текстовом файле
    fs.writeFile(outputFile, base64Data, (err) => {
      if (err) {
        console.error('Ошибка записи файла:', err);
      } else {
        console.log('Файл успешно закодирован и сохранен как', outputFile);
      }
    });
  }
});
