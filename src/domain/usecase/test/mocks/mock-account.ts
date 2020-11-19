import {AddAccountParams} from "@/domain/usecase/account-service";
import faker from "faker";
import {AccountModel} from "@/domain/models/account";
import {AuthenticationParams} from "@/domain/usecase/authentication-service";
import {UploadImageParams} from "@/domain/models/gateway/account-repository";

export const mockAddAccountParams = (): AddAccountParams => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    document: faker.random.word(),
    avatar: faker.random.word(),
    status: 1
})

export const mockAccountModel = (): AccountModel => ({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    document: faker.random.word(),
    status: 1
})

export const mockAuthenticationParams = (): AuthenticationParams => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})

export const mockUploadImageParams =  (): UploadImageParams => ({
    id: faker.random.uuid(),
    avatar: faker.random.word()
})