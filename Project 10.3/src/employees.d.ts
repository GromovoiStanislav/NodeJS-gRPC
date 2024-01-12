import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace main. */
export namespace main {

    /** Properties of an Employee. */
    interface IEmployee {

        /** Employee id */
        id?: (number|null);

        /** Employee name */
        name?: (string|null);

        /** Employee salary */
        salary?: (number|null);
    }

    /** Represents an Employee. */
    class Employee implements IEmployee {

        /**
         * Constructs a new Employee.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IEmployee);

        /** Employee id. */
        public id: number;

        /** Employee name. */
        public name: string;

        /** Employee salary. */
        public salary: number;

        /**
         * Creates a new Employee instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Employee instance
         */
        public static create(properties?: main.IEmployee): main.Employee;

        /**
         * Encodes the specified Employee message. Does not implicitly {@link main.Employee.verify|verify} messages.
         * @param message Employee message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IEmployee, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Employee message, length delimited. Does not implicitly {@link main.Employee.verify|verify} messages.
         * @param message Employee message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IEmployee, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Employee message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Employee
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.Employee;

        /**
         * Decodes an Employee message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Employee
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.Employee;

        /**
         * Verifies an Employee message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Employee message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Employee
         */
        public static fromObject(object: { [k: string]: any }): main.Employee;

        /**
         * Creates a plain object from an Employee message. Also converts values to other types if specified.
         * @param message Employee
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.Employee, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Employee to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Employee
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an Employees. */
    interface IEmployees {

        /** Employees employees */
        employees?: (main.IEmployee[]|null);
    }

    /** Represents an Employees. */
    class Employees implements IEmployees {

        /**
         * Constructs a new Employees.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.IEmployees);

        /** Employees employees. */
        public employees: main.IEmployee[];

        /**
         * Creates a new Employees instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Employees instance
         */
        public static create(properties?: main.IEmployees): main.Employees;

        /**
         * Encodes the specified Employees message. Does not implicitly {@link main.Employees.verify|verify} messages.
         * @param message Employees message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.IEmployees, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Employees message, length delimited. Does not implicitly {@link main.Employees.verify|verify} messages.
         * @param message Employees message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.IEmployees, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Employees message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Employees
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.Employees;

        /**
         * Decodes an Employees message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Employees
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.Employees;

        /**
         * Verifies an Employees message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Employees message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Employees
         */
        public static fromObject(object: { [k: string]: any }): main.Employees;

        /**
         * Creates a plain object from an Employees message. Also converts values to other types if specified.
         * @param message Employees
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.Employees, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Employees to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Employees
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
