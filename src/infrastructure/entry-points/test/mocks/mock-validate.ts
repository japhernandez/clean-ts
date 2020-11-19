import {Validation} from "@/infrastructure/helpers/validation";

export class MockValidateSpy implements Validation {
    error: Error
    input: any

    validate(input: any): Error {
        this.input = input
        return this.error
    }
}