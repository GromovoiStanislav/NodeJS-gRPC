## Generate TS code from xxx.proto file with protoc-gen-ts (TS)

localy:

```
npm i protoc-gen-ts

in package.json:
"scripts": {
     "generate": "protoc -I=protos --ts_out=src weather.proto"
  }

```

or globaly:

```bash
npm i -g protoc-gen-ts

protoc -I ./protos --ts_out=src ./protos/weather.proto
#or
protoc -I=protos --ts_out=src weather.proto
```
