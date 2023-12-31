/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 4.24.3
 * source: test.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export var Kind;
(function (Kind) {
    Kind[Kind["UPDATED"] = 0] = "UPDATED";
    Kind[Kind["DELETED"] = 1] = "DELETED";
})(Kind || (Kind = {}));
export class Change extends pb_1.Message {
    #one_of_decls = [];
    constructor(data) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("kind" in data && data.kind != undefined) {
                this.kind = data.kind;
            }
            if ("patch" in data && data.patch != undefined) {
                this.patch = data.patch;
            }
            if ("tags" in data && data.tags != undefined) {
                this.tags = data.tags;
            }
        }
    }
    get kind() {
        return pb_1.Message.getFieldWithDefault(this, 1, Kind.UPDATED);
    }
    set kind(value) {
        pb_1.Message.setField(this, 1, value);
    }
    get patch() {
        return pb_1.Message.getFieldWithDefault(this, 2, "");
    }
    set patch(value) {
        pb_1.Message.setField(this, 2, value);
    }
    get tags() {
        return pb_1.Message.getFieldWithDefault(this, 3, []);
    }
    set tags(value) {
        pb_1.Message.setField(this, 3, value);
    }
    static fromObject(data) {
        const message = new Change({});
        if (data.kind != null) {
            message.kind = data.kind;
        }
        if (data.patch != null) {
            message.patch = data.patch;
        }
        if (data.tags != null) {
            message.tags = data.tags;
        }
        return message;
    }
    toObject() {
        const data = {};
        if (this.kind != null) {
            data.kind = this.kind;
        }
        if (this.patch != null) {
            data.patch = this.patch;
        }
        if (this.tags != null) {
            data.tags = this.tags;
        }
        return data;
    }
    serialize(w) {
        const writer = w || new pb_1.BinaryWriter();
        if (this.kind != Kind.UPDATED)
            writer.writeEnum(1, this.kind);
        if (this.patch.length)
            writer.writeString(2, this.patch);
        if (this.tags.length)
            writer.writeRepeatedString(3, this.tags);
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes) {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Change();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    message.kind = reader.readEnum();
                    break;
                case 2:
                    message.patch = reader.readString();
                    break;
                case 3:
                    pb_1.Message.addToRepeatedField(message, 3, reader.readString());
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary() {
        return this.serialize();
    }
    static deserializeBinary(bytes) {
        return Change.deserialize(bytes);
    }
}
