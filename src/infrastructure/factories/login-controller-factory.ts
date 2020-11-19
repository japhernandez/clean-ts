import {Controller} from "../../infrastructure/helpers/controller";
import {LoginController} from "../../infrastructure/entry-points/api-rest/login-controller";
import {makeDbAuthentication} from "../../infrastructure/factories/db-authentication-factory";
import {makeLoginValidation} from "../../infrastructure/factories/login-validation-factory";

export const makeLoginController = (): Controller => {
    return new LoginController(makeDbAuthentication(), makeLoginValidation())
}