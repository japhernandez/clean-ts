import {Validation} from "../../../../../infrastructure/helpers/validation";
import {MissingParamError} from "../../../../../infrastructure/driven_adapters/mongo-repository/exception/error";

export class RequiredFieldValidation implements Validation {

    constructor(private readonly field: string) {
    }
    // @ts-ignore
    validate(input: any): Error {
        if(!input[this.field]) {
            return new MissingParamError(this.field)
        }
    }
}