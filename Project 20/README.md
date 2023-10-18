## Static code generation gRCP with grpc-tool (JS)

```bash
npm run dynamic:server -- --port 8080
npm run dynamic:client -- --target localhost:8080 <name>
#or
npm run static:server -- --port 8080
npm run static:client -- --target localhost:8080 <name>
```

```
npm i google-protobuf
npm install -g grpc-tools@1.11.3

grpc_tools_node_protoc --js_out=import_style="commonjs,binary":./static_codegen/ --grpc_out=grpc_js:./static_codegen/ --proto_path=./protos/ ./protos/\*.proto
```
