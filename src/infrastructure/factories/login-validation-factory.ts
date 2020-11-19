import {ValidationComposite} from "../../infrastructure/driven_adapters/mongo-repository/exception/validations/validation-composite";
import {Validation} from "../../infrastructure/helpers/validation";
import {RequiredFieldValidation} from "../../infrastructure/driven_adapters/mongo-repository/exception/validations/required-field-validation";
import {EmailValid} from "../driven_adapters/mongo-repository/exception/validations/email-is-valid";
import {EmailValidation} from "../../infrastructure/driven_adapters/mongo-repository/exception/validations/email-validation";

export const makeLoginValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValid()))
    return new ValidationComposite(validations)
}