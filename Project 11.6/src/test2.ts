import { Author, Change, Kind } from './types/myproto.js';

// Constructed message
const change = Change.fromObject({
  kind: Kind.UPDATED,
  patch: '@@ -7,11 +7,15 @@',
  tags: ['no prefix', 'as is'],
  name: 'patch for typescript 4.5',
  author: {
    name: 'mary poppins',
    role: 'maintainer',
  },
});

console.log(change.author instanceof Author); // true

// Sent over the wire
const bytes: Uint8Array = change.serialize();

const receivedChange: Change = Change.deserialize(bytes);

console.log(receivedChange.kind == Kind.UPDATED); // true
console.log(receivedChange.patch); // "@@ -7,11 +7,15 @@"
console.log(receivedChange.tags); // ["no prefix", "as is"]

if (
  JSON.stringify(change.toObject()) != JSON.stringify(receivedChange.toObject())
) {
  console.error(
    `Transferred object does not match the source 
  
  Expected:
  
  ${JSON.stringify(change.toObject())}
  
  Got: 
  
  ${JSON.stringify(receivedChange.toObject())}
  `
  );
  process.exit(1);
} else {
  process.exit(0);
}
