## Converting data to protobuf. gRPC demo (JS)

protobuf:

```bash
npm i -g protoc-gen-js

protoc --js_out=import_style=commonjs,binary:. prices.proto
#or
npm run generate

npm run transform
```

gRPC:

```bash
npm run server

npm run tranclientsform
```
