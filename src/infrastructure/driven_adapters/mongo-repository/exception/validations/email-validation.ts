import {Validation} from "../../../../../infrastructure/helpers/validation";
import {EmailValidator} from "../../../../../infrastructure/driven_adapters/mongo-repository/exception/validations/email-validator";
import {InvalidParamError} from "../../../../../infrastructure/driven_adapters/mongo-repository/exception/error";

export class EmailValidation implements Validation {

    constructor(
        private readonly field: string,
        private readonly emailValidator: EmailValidator) {
    }

    // @ts-ignore
    validate(input: any): Error {
        const isValid = this.emailValidator.isValid(input[this.field])
        if (!isValid) return new InvalidParamError(this.field)
    }
}