import {LoadAccountByTokenService} from "@/domain/usecase/load-account-by-token-service";
import {AccountModel} from "@/domain/models/account";
import {LoadAccountByTokenRepository} from "@/domain/models/gateway/authentication-repository";
import {Decrypt} from "@/domain/usecase/utils/decrypt";

export class LoadAccountByTokenServiceImpl implements LoadAccountByTokenService {
    constructor(
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly decrypt: Decrypt
    ) {
    }

    async load(accessToken: string, role?: string): Promise<AccountModel> {

        let token: string
        try {
            token = await this.decrypt.decrypt(accessToken)
            if (token) {
                const account = await this.loadAccountByTokenRepository.load(accessToken)
                if (account) {
                    return account
                }
            }
        } catch (e) {
            return null
        }
    }
}