import {LoadAccountByTokenRepository} from "@/domain/models/gateway/authentication-repository";
import {LoadAccountByTokenServiceImpl} from "../../domain/usecase/impl/load-account-by-token-service-impl";
import {JwtAdapter} from "../../infrastructure/security/jwt/jwt-adapter";
import env from "../../applications/config/env";
import {AccountRepositoryMongoAdapter} from "../../infrastructure/driven_adapters/mongo-repository/adapter/account-repository-adapter";

export const makeDbLoadAccountByToken = (): LoadAccountByTokenRepository => {
    const jwtAdapter = new JwtAdapter(env.JWT_SECRET)
    const accountRepositoryMongoAdapter = new AccountRepositoryMongoAdapter()
    return new LoadAccountByTokenServiceImpl(
        accountRepositoryMongoAdapter,
        jwtAdapter
    )
}