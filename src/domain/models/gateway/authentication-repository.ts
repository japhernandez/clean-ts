import {AuthenticationModel} from "@/domain/models/authentication";
import {AccountModel} from "@/domain/models/account";

export type AuthenticationParams = {
    email: string
    password: string,
}

export interface AuthenticationRepository {
    auth: (authenticationParams: AuthenticationParams) => Promise<AuthenticationModel>
}

export interface UpdateAccessTokenRepository {
    updateAccessToken: (id: string, token: string) => Promise<void>
}

// export interface LoadAccountByTokenRepository {
//     loadByToken: (accessToken: string, role?: string) => Promise<AccountModel>
// }

export interface LoadAccountByTokenRepository {
    load: (accessToken: string, role?: string) => Promise<AccountModel>
}