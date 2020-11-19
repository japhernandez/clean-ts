import {
    LoadAccountByTokenRepository,
    UpdateAccessTokenRepository
} from "@/domain/models/gateway/authentication-repository";
import {AccountModel} from "@/domain/models/account";

export class AuthenticationRepositoryAdapter implements  LoadAccountByTokenRepository, UpdateAccessTokenRepository {
    load(accessToken: string, role?: string): Promise<AccountModel> {
        return Promise.resolve(undefined);
    }

    updateAccessToken(id: string, token: string): Promise<void> {
        return Promise.resolve(undefined);
    }

}