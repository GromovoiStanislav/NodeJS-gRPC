## Generate JS code from xxx.proto file with protoc-gen-js (JS)

```
npm i protoc-gen-js
```

in package.json:

```
"scripts": {
    "generate": "protoc --js_out=import_style=commonjs,binary:./protos ./protos/example.proto"
  }
```

run:

```bash
npm run generate
```

or globaly:

```bash
npm i -g protoc-gen-js

protoc --js_out=import_style=commonjs,binary:. ./protos/example.proto
```
