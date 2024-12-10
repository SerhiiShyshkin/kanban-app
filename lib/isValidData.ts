import {ZodSchema} from "zod";

function isValidData<T>(data: unknown, schema: ZodSchema<T>): data is T {
    if (data === null || data === undefined) {
        return false;
    }

    const result = schema.safeParse(data);
    return result.success;
}

export default isValidData;