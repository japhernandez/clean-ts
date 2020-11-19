import {Validation} from "../../../../../infrastructure/helpers/validation";
import {InvalidParamError} from "../../../../../infrastructure/driven_adapters/mongo-repository/exception/error";

export class CompareFieldValidation implements Validation {
    constructor(
        private readonly field: string,
        private readonly fieldCompare: string
    ) {
    }

    // @ts-ignore
    validate(input: any): Error {
        if (input[this.field] !== input[this.fieldCompare]) {
            return new InvalidParamError(this.fieldCompare)
        }
    }

}