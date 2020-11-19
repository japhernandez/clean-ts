import {EmailValidator} from "@/infrastructure/driven_adapters/mongo-repository/exception/validations/email-validator";

export class MockEmailValidationSpy implements EmailValidator{
    isEmailValid = true
    email: string

    isValid(email: string): boolean {
        this.email = email
        return this.isEmailValid
    }
}