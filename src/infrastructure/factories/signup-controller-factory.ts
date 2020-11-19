import {Controller} from "../helpers/controller";
import {SignupController} from "../entry-points/api-rest/signup-controller";
import {makeDbAddAccount} from "./db-add-account-factory";
import {makeSignUpValidation} from "../../infrastructure/factories/signup-validation-factory";
import {makeDbAuthentication} from "../../infrastructure/factories/db-authentication-factory";

export const makeSignUpController = (): Controller => {
    return new SignupController(makeDbAuthentication(), makeDbAddAccount(), makeSignUpValidation())
}