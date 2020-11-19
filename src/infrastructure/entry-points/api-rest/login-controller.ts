import {Controller} from "../../../infrastructure/helpers/controller";
import {
    badRequest,
    HttpRequest,
    HttpResponse,
    ok,
    serverError,
    unauthorized
} from "../../../infrastructure/helpers/http";
import {Validation} from "../../../infrastructure/helpers/validation";
import {AuthenticationRepository} from "@/domain/models/gateway/authentication-repository";

export class LoginController implements Controller {

    constructor(
        private readonly authentication: AuthenticationRepository,
        private readonly validation: Validation
    ) {
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const {email, password} = httpRequest.body
            const modelAuthentication = await this.authentication.auth({
                email,
                password
            })

            if (!modelAuthentication) return unauthorized()

            return ok(modelAuthentication)
        } catch (error) {
            return serverError(error)
        }
    }

}