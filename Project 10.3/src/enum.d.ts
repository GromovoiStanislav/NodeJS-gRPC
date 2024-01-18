import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace test. */
export namespace test {

    /** Enum enum. */
    enum Enum {
        A = 0,
        B = 1
    }

    /** Properties of an EnumTest. */
    interface IEnumTest {

        /** EnumTest a */
        a?: (test.Enum|null);

        /** EnumTest b */
        b?: (test.Enum|null);

        /** EnumTest c */
        c?: (test.Enum[]|null);
    }

    /** Represents an EnumTest. */
    class EnumTest implements IEnumTest {

        /**
         * Constructs a new EnumTest.
         * @param [properties] Properties to set
         */
        constructor(properties?: test.IEnumTest);

        /** EnumTest a. */
        public a: test.Enum;

        /** EnumTest b. */
        public b: test.Enum;

        /** EnumTest c. */
        public c: test.Enum[];

        /**
         * Creates a new EnumTest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnumTest instance
         */
        public static create(properties?: test.IEnumTest): test.EnumTest;

        /**
         * Encodes the specified EnumTest message. Does not implicitly {@link test.EnumTest.verify|verify} messages.
         * @param message EnumTest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: test.IEnumTest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnumTest message, length delimited. Does not implicitly {@link test.EnumTest.verify|verify} messages.
         * @param message EnumTest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: test.IEnumTest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnumTest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnumTest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): test.EnumTest;

        /**
         * Decodes an EnumTest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnumTest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): test.EnumTest;

        /**
         * Verifies an EnumTest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnumTest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnumTest
         */
        public static fromObject(object: { [k: string]: any }): test.EnumTest;

        /**
         * Creates a plain object from an EnumTest message. Also converts values to other types if specified.
         * @param message EnumTest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: test.EnumTest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnumTest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for EnumTest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
