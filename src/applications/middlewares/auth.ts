import {adaptMiddleware} from "../../infrastructure/security/middleware/middleware-adapter";
import {makeAuthMiddleware} from "../../infrastructure/factories/aut-middleware-factory";

export const authAdmin = adaptMiddleware(makeAuthMiddleware('admin'))
export const authUser = adaptMiddleware(makeAuthMiddleware('user'))