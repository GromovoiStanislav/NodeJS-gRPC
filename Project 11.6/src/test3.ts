import { Buffer } from 'buffer';
import { Help, Topic } from './types/help.js';

// serialize
const help = new Help();
help.topic = Topic.PACK;
help.message = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
help.short =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
help.generated_via = 'cli';

const b64 = Buffer.from(help.serialize()).toString('base64');
console.log(b64);

console.log();

// deserialize
{
  const help = Help.deserialize(Buffer.from(b64, 'base64'));
  console.log(help); // instanceof Help
  console.log(help.toObject()); //Object

  console.log(help instanceof Help); // true
  console.log(help.toObject() instanceof Help); // false
  console.log(typeof help.toObject() === 'object'); // true

  console.log(JSON.stringify(help)); // JSON
  console.log(JSON.stringify(help.toObject())); // JSON
}
