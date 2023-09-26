## Generate JS code based on the message definitions specified in the "xxx.proto" file (JS)

```
npm i protoc-gen-js
```

in package.json:

```
"scripts": {
    "generate-grpc-1": "protoc --js_out=import_style=commonjs,binary:. example.proto"
    "generate-grpc-2": "protoc --js_out=import_style=commonjs,binary:. ./protos/dummy.proto"
  }
```

run:

```bash
npm run generate-grpc-1
#or
npm run generate-grpc-1
```

or globaly:

```bash
npm i -g protoc-gen-js

protoc --js_out=import_style=commonjs,binary:. example.proto
#or
protoc --js_out=import_style=commonjs,binary:. ./protos/dummy.proto
```
