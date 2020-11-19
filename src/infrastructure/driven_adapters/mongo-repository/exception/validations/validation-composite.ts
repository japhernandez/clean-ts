import {Validation} from "../../../../../infrastructure/helpers/validation";

export class ValidationComposite implements Validation {

    constructor(private readonly validations: Validation[]) {
    }

    // @ts-ignore
    validate(input: any): Error {
        for (const validation of this.validations) {
            const error = validation.validate(input)
            if (error) return error
        }
    }
}