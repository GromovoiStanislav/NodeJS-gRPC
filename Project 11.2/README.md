## Generate TS code from xxx.proto file with protoc-gen-ts (TS)

```
npm i protoc-gen-ts
```

in package.json:

```
"scripts": {
     "generate": "protoc -I=protos --ts_out=src example.proto"
  }
```

run:

```bash
npm run generate
```

or globaly:

```bash
npm i -g protoc-gen-ts

protoc -I=protos --ts_out=src example.proto
```
