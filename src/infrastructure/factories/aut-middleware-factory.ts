import {MiddlewareInterface} from "../../infrastructure/security/middleware/middleware-interface";
import {AuthMiddleware} from "../../infrastructure/security/middleware/auth-middleware";
import {makeDbLoadAccountByToken} from "../../infrastructure/factories/db-load-account-by-token-factory";

export const makeAuthMiddleware = (role?: string): MiddlewareInterface => {
    return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}