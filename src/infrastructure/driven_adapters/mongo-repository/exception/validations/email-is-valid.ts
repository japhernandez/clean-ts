import {EmailValidator} from "./email-validator";
import validator from "validator";

export class EmailValid implements EmailValidator {
    isValid(email: string): boolean {
        return validator.isEmail(email)
    }
}