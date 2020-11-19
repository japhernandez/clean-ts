import {MiddlewareInterface} from "../../../infrastructure/security/middleware/middleware-interface";
import {forbidden, HttpRequest, HttpResponse, ok, serverError} from "../../../infrastructure/helpers/http";
import {LoadAccountByTokenService} from "@/domain/usecase/load-account-by-token-service";
import {AccessDeniedError} from "../../../infrastructure/driven_adapters/mongo-repository/exception/error";

export class AuthMiddleware implements MiddlewareInterface {
    constructor(
        private readonly loadAccountByTokenService: LoadAccountByTokenService,
        private readonly role?: string
    ) {
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const accountToken = httpRequest.headers.authorization
            const token = accountToken && accountToken.split(' ')[1]
            if (accountToken) {
                const account = await this.loadAccountByTokenService.load(token, this.role)
                if(account) {
                    if (account.rol === this.role) return ok({id: account.id})
                }
            }
            return forbidden(new AccessDeniedError())
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}