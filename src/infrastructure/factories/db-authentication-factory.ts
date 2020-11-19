import {AuthenticationRepository} from "@/domain/models/gateway/authentication-repository";
import {BcryptAdapter} from "../../infrastructure/helpers/bcrypt-adapter";
import {AccountRepositoryMongoAdapter} from "../../infrastructure/driven_adapters/mongo-repository/adapter/account-repository-adapter";
import {JwtAdapter} from "../../infrastructure/security/jwt/jwt-adapter";
import env from "../../applications/config/env";
import {AuthenticationServiceImpl} from "../../domain/usecase/impl/authentication-service-impl";

export const makeDbAuthentication = (): AuthenticationRepository => {
    const salt = 12;
    const jwtAdapter = new JwtAdapter(env.JWT_SECRET)
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountRepositoryMongoAdapter = new AccountRepositoryMongoAdapter()
    return new AuthenticationServiceImpl(accountRepositoryMongoAdapter, accountRepositoryMongoAdapter, bcryptAdapter,  jwtAdapter)
}