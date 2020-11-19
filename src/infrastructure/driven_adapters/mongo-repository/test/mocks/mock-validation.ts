import {Validation} from "@/infrastructure/helpers/validation";

export class MockValidationSpy implements Validation {
    error: Error = null
    input: any

    validate(input: any): Error {
        this.input = input
        return this.error
    }
}