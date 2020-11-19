import {AddAccountService} from "@/domain/usecase/account-service";
import {Controller} from "@/infrastructure/helpers/controller";
import {badRequest, forbidden, HttpRequest, HttpResponse, ok, serverError} from "../../../infrastructure/helpers/http";
import {Validation} from "../../../infrastructure/helpers/validation";
import {DocumentInUseError, FieldInUseError} from "../../driven_adapters/mongo-repository/exception/error";
import {AuthenticationRepository} from "@/domain/models/gateway/authentication-repository";

export class SignupController implements Controller {

    constructor(
        private readonly authentication: AuthenticationRepository,
        private readonly accountService: AddAccountService,
        private readonly validation: Validation
    ) {
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) return badRequest(error)

            const {
                name,
                email,
                password,
                avatar,
                document,
                status,
                rol
            } = httpRequest.body

            const account = await this.accountService.add({
                name,
                email,
                password,
                avatar,
                document,
                status,
                rol
            })

            if (account === false) return forbidden(new DocumentInUseError())

            if (!account) return forbidden(new FieldInUseError())

            const modelAuthentication = await this.authentication.auth({
                email,
                password
            })

            return ok(modelAuthentication);
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}


