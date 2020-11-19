import {AddAccountParams, AddAccountService} from "@/domain/usecase/account-service";
import {AccountModel} from "@/domain/models/account";
import {mockAccountModel} from "@/domain/usecase/test/mocks/mock-account";
import {
    LoadByEmailRepository,
    UniqueDocumentRepository, UploadImageRepository,
} from "@/domain/models/gateway/account-repository";
import {
    AuthenticationParams,
    AuthenticationRepository,
    LoadAccountByTokenRepository,
    UpdateAccessTokenRepository
} from "@/domain/models/gateway/authentication-repository";
import {AuthenticationModel} from "@/domain/models/authentication";
import * as faker from "faker";

export class MockAccountSpy implements AddAccountService {
    accountModel: AccountModel = mockAccountModel()
    addAccountParams: AddAccountParams | undefined

    async add(data: AddAccountParams): Promise<AccountModel | boolean> {
        this.addAccountParams = data
        return this.accountModel
    }
}

export class MockLoadAccountByEmailSpy implements LoadByEmailRepository {
    accountModel = mockAccountModel()
    email: string | undefined

    async loadByEmail(email: string): Promise<AccountModel> {
        this.email = email
        return this.accountModel
    }
}

export class MockDocumentUniqueSpy implements UniqueDocumentRepository {
    accountModel = mockAccountModel()
    document: string

    async uniqueDocument(document: string): Promise<AccountModel | boolean> {
        this.document = document
        return this.accountModel
    }
}

export class MockLoadByTokenSpy implements LoadAccountByTokenRepository {
    accountModel = mockAccountModel()
    token?: string
    role?: string

    async load(accessToken: string, role?: string): Promise<AccountModel> {
        this.token = accessToken
        this.role = role
        return this.accountModel
    }
}

export class MockUpdateAccessTokenSpy implements UpdateAccessTokenRepository {
    id: string
    token: string

    async updateAccessToken(id: string, token: string): Promise<void> {
        this.id = id
        this.token = token
    }
}

export class MockAuthenticationSpy implements AuthenticationRepository {
    authenticationParams: AuthenticationParams
    authenticationModel = {
        accessToken: faker.random.uuid(),
        name: faker.name.findName()
    }

    async auth(authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
        this.authenticationParams = authenticationParams
        // @ts-ignore
        return this.authenticationModel
    }
}

export class MockUploadImageRepositorySpy implements UploadImageRepository {
    id: string
    avatar: string

    async uploadImage(id: string, avatar: string): Promise<void> {
        this.id = id
        this.avatar = avatar
    }
}