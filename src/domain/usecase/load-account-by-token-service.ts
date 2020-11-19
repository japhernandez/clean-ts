import {AccountModel} from "@/domain/models/account";

export interface LoadAccountByTokenService {
    load: (accessToken: string, role?: string) => Promise<AccountModel>
}