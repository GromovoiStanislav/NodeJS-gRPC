## Generate TS code from xxx.proto file with ts-proto (TS)

```bash
npm i ts-proto

protoc --plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd" --ts_proto_out=. ./protos/example.proto
# or
protoc -I ./protos --plugin=protoc-gen-ts_proto=.\\node_modules\\.bin\\protoc-gen-ts_proto.cmd --ts_proto_out=./src ./protos/example.proto
```
