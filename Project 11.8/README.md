## Generate JS code from xxx.proto file with protoc-gen-js (JS)

#### Setup:

```
npm i protoc-gen-js
```

#### Generate code:

in package.json:

```
"scripts": {
    "generate": "protoc --js_out=import_style=commonjs,binary:./protos ./protos/example.proto"
  }
```

run:

```
npm run generate
```

or globaly:

```bash
npm i -g protoc-gen-js

protoc --js_out=import_style=commonjs,binary:. ./protos/example.proto
```

#### Start:

```
npm run example-1
npm run example-2
```
