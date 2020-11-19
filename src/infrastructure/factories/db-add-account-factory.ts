import {AddAccountRepository} from "../../domain/models/gateway/account-repository";
import {AccountRepositoryMongoAdapter} from "../driven_adapters/mongo-repository/adapter/account-repository-adapter";
import {AccountServiceImpl} from "../../domain/usecase/impl/account-service-impl";
import {BcryptAdapter} from "../helpers/bcrypt-adapter";

export const makeDbAddAccount = (): AddAccountRepository => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountRepositoryMongoAdapter = new AccountRepositoryMongoAdapter()
    return new AccountServiceImpl(
        bcryptAdapter,
        accountRepositoryMongoAdapter,
        accountRepositoryMongoAdapter,
        accountRepositoryMongoAdapter,
    )
}