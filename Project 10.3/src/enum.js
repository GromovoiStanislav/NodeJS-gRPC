/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.test = (function() {

    /**
     * Namespace test.
     * @exports test
     * @namespace
     */
    var test = {};

    /**
     * Enum enum.
     * @name test.Enum
     * @enum {number}
     * @property {number} A=0 A value
     * @property {number} B=1 B value
     */
    test.Enum = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "A"] = 0;
        values[valuesById[1] = "B"] = 1;
        return values;
    })();

    test.EnumTest = (function() {

        /**
         * Properties of an EnumTest.
         * @memberof test
         * @interface IEnumTest
         * @property {test.Enum|null} [a] EnumTest a
         * @property {test.Enum|null} [b] EnumTest b
         * @property {Array.<test.Enum>|null} [c] EnumTest c
         */

        /**
         * Constructs a new EnumTest.
         * @memberof test
         * @classdesc Represents an EnumTest.
         * @implements IEnumTest
         * @constructor
         * @param {test.IEnumTest=} [properties] Properties to set
         */
        function EnumTest(properties) {
            this.c = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnumTest a.
         * @member {test.Enum} a
         * @memberof test.EnumTest
         * @instance
         */
        EnumTest.prototype.a = 0;

        /**
         * EnumTest b.
         * @member {test.Enum} b
         * @memberof test.EnumTest
         * @instance
         */
        EnumTest.prototype.b = 0;

        /**
         * EnumTest c.
         * @member {Array.<test.Enum>} c
         * @memberof test.EnumTest
         * @instance
         */
        EnumTest.prototype.c = $util.emptyArray;

        /**
         * Creates a new EnumTest instance using the specified properties.
         * @function create
         * @memberof test.EnumTest
         * @static
         * @param {test.IEnumTest=} [properties] Properties to set
         * @returns {test.EnumTest} EnumTest instance
         */
        EnumTest.create = function create(properties) {
            return new EnumTest(properties);
        };

        /**
         * Encodes the specified EnumTest message. Does not implicitly {@link test.EnumTest.verify|verify} messages.
         * @function encode
         * @memberof test.EnumTest
         * @static
         * @param {test.IEnumTest} message EnumTest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnumTest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.a != null && Object.hasOwnProperty.call(message, "a"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.a);
            if (message.b != null && Object.hasOwnProperty.call(message, "b"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.b);
            if (message.c != null && message.c.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (var i = 0; i < message.c.length; ++i)
                    writer.int32(message.c[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified EnumTest message, length delimited. Does not implicitly {@link test.EnumTest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof test.EnumTest
         * @static
         * @param {test.IEnumTest} message EnumTest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnumTest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnumTest message from the specified reader or buffer.
         * @function decode
         * @memberof test.EnumTest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {test.EnumTest} EnumTest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnumTest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.test.EnumTest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.a = reader.int32();
                        break;
                    }
                case 2: {
                        message.b = reader.int32();
                        break;
                    }
                case 3: {
                        if (!(message.c && message.c.length))
                            message.c = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.c.push(reader.int32());
                        } else
                            message.c.push(reader.int32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnumTest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof test.EnumTest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {test.EnumTest} EnumTest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnumTest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnumTest message.
         * @function verify
         * @memberof test.EnumTest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnumTest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.a != null && message.hasOwnProperty("a"))
                switch (message.a) {
                default:
                    return "a: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.b != null && message.hasOwnProperty("b"))
                switch (message.b) {
                default:
                    return "b: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.c != null && message.hasOwnProperty("c")) {
                if (!Array.isArray(message.c))
                    return "c: array expected";
                for (var i = 0; i < message.c.length; ++i)
                    switch (message.c[i]) {
                    default:
                        return "c: enum value[] expected";
                    case 0:
                    case 1:
                        break;
                    }
            }
            return null;
        };

        /**
         * Creates an EnumTest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof test.EnumTest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {test.EnumTest} EnumTest
         */
        EnumTest.fromObject = function fromObject(object) {
            if (object instanceof $root.test.EnumTest)
                return object;
            var message = new $root.test.EnumTest();
            switch (object.a) {
            default:
                if (typeof object.a === "number") {
                    message.a = object.a;
                    break;
                }
                break;
            case "A":
            case 0:
                message.a = 0;
                break;
            case "B":
            case 1:
                message.a = 1;
                break;
            }
            switch (object.b) {
            default:
                if (typeof object.b === "number") {
                    message.b = object.b;
                    break;
                }
                break;
            case "A":
            case 0:
                message.b = 0;
                break;
            case "B":
            case 1:
                message.b = 1;
                break;
            }
            if (object.c) {
                if (!Array.isArray(object.c))
                    throw TypeError(".test.EnumTest.c: array expected");
                message.c = [];
                for (var i = 0; i < object.c.length; ++i)
                    switch (object.c[i]) {
                    default:
                        if (typeof object.c[i] === "number") {
                            message.c[i] = object.c[i];
                            break;
                        }
                    case "A":
                    case 0:
                        message.c[i] = 0;
                        break;
                    case "B":
                    case 1:
                        message.c[i] = 1;
                        break;
                    }
            }
            return message;
        };

        /**
         * Creates a plain object from an EnumTest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof test.EnumTest
         * @static
         * @param {test.EnumTest} message EnumTest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnumTest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.c = [];
            if (options.defaults) {
                object.a = options.enums === String ? "A" : 0;
                object.b = options.enums === String ? "A" : 0;
            }
            if (message.a != null && message.hasOwnProperty("a"))
                object.a = options.enums === String ? $root.test.Enum[message.a] === undefined ? message.a : $root.test.Enum[message.a] : message.a;
            if (message.b != null && message.hasOwnProperty("b"))
                object.b = options.enums === String ? $root.test.Enum[message.b] === undefined ? message.b : $root.test.Enum[message.b] : message.b;
            if (message.c && message.c.length) {
                object.c = [];
                for (var j = 0; j < message.c.length; ++j)
                    object.c[j] = options.enums === String ? $root.test.Enum[message.c[j]] === undefined ? message.c[j] : $root.test.Enum[message.c[j]] : message.c[j];
            }
            return object;
        };

        /**
         * Converts this EnumTest to JSON.
         * @function toJSON
         * @memberof test.EnumTest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnumTest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EnumTest
         * @function getTypeUrl
         * @memberof test.EnumTest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EnumTest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/test.EnumTest";
        };

        return EnumTest;
    })();

    return test;
})();

module.exports = $root;
