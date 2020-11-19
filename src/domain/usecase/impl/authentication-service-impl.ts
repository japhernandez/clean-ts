import {AuthenticationParams, AuthenticationService} from "@/domain/usecase/authentication-service";
import {AuthenticationModel} from "@/domain/models/authentication";
import {LoadByEmailRepository} from "@/domain/models/gateway/account-repository";
import {UpdateAccessTokenRepository} from "@/domain/models/gateway/authentication-repository";
import {HasherCompare} from "@/domain/usecase/utils/hasher-compare";
import {Encrypt} from "@/domain/usecase/utils/encrypt";

export class AuthenticationServiceImpl implements AuthenticationService {

    constructor(
        private readonly loadByEmailRepository: LoadByEmailRepository,
        private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
        private readonly hashCompare: HasherCompare,
        private readonly encrypt: Encrypt
    ) {
    }

    async auth(authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
        const account = await this.loadByEmailRepository.loadByEmail(authenticationParams.email)
        if (account) {
            const isValid = await this.hashCompare.compare(authenticationParams.password, account.password)
            if (isValid) {
                const accessToken = await this.encrypt.encrypt(account.id)
                await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
                return {
                    accessToken,
                    id: account.id,
                    name: account.name,
                    email: account.email,
                    status: account.status,
                    rol: account.rol
                }
            }
        }
        // @ts-ignore
        return null
    }
}