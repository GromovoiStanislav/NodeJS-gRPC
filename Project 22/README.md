## Static code generation with grpc-tool and working with Protobuf (JS)

Generate code:

```bash
grpc_tools_node_protoc --js_out=import_style="commonjs,binary":./proto  --proto_path=./proto employees.proto
```

Convert to JSON:

```
npm run to-json
```

Convert to protobuf:

```
npm run to-protobuf
```
