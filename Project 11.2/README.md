## Generate TS code (JS)

```
npm i protoc-gen-ts
```

in package.json:

```
"scripts": {
     "generate-grpc": "protoc -I=protos --ts_out=src example.proto"
  }
```

run:

```bash
npm run generate-grpc
```

or globaly:

```bash
npm i -g protoc-gen-ts

protoc -I=protos --ts_out=src example.proto
```
