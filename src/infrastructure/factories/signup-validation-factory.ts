import {ValidationComposite} from "../../infrastructure/driven_adapters/mongo-repository/exception/validations/validation-composite";
import {Validation} from "../../infrastructure/helpers/validation";
import {RequiredFieldValidation} from "../../infrastructure/driven_adapters/mongo-repository/exception/validations/required-field-validation";
import {CompareFieldValidation} from "../../infrastructure/driven_adapters/mongo-repository/exception/validations/compare-field-validation";
import {EmailValid} from "../driven_adapters/mongo-repository/exception/validations/email-is-valid";
import {EmailValidation} from "../../infrastructure/driven_adapters/mongo-repository/exception/validations/email-validation";

export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []

    for (const field of ['name', 'email', 'document', 'status', 'password', 'passwordConfirmation']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new  EmailValid()))

    return new ValidationComposite(validations)
}