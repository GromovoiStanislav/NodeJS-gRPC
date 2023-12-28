import { Author, Change, Kind } from './types/myproto.js';

// Constructed message
const change = new Change({
  kind: Kind.UPDATED,
  patch: '@@ -7,11 +7,15 @@',
  tags: ['no prefix', 'as is'],
  name: 'patch for typescript 4.5',
  author: new Author({
    name: 'mary poppins',
    role: 'maintainer',
  }),
});

// Sent over the wire
const bytes: Uint8Array = change.serialize();

const receivedChange: Change = Change.deserialize(bytes);

console.log(receivedChange.kind == Kind.UPDATED); // true
console.log(receivedChange.patch); // "@@ -7,11 +7,15 @@"
console.log(receivedChange.tags); // ["no prefix", "as is"]
console.log(receivedChange.name); // "patch for typescript 4.5"
// see which one of the fields were filled
console.log(receivedChange.name_or_id); // "name"
console.log(receivedChange.author.name); // "mary poppins"
