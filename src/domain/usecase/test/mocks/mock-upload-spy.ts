import {AccountModel} from "@/domain/models/account";
import {LoadByIdRepository, UploadImageParams} from "@/domain/models/gateway/account-repository";
import {mockAccountModel} from "@/domain/usecase/test/mocks/mock-account";
import {UploadImageService} from "@/domain/usecase/account-service";
import * as faker from "faker";

export class MockLoadByIdRepositorySpy implements LoadByIdRepository {
    accountModel = mockAccountModel()
    id: string

    async loadById(id: string): Promise<AccountModel> {
        this.id = id
        return this.accountModel
    }
}

export class MockUploadImageServiceSpy implements UploadImageService {
    uploadImageParams: UploadImageParams
    uploadImageModel = {
        id: faker.random.uuid(),
        avatar: faker.random.word()
    }

    async uploadImage(data: UploadImageParams): Promise<AccountModel> {
        this.uploadImageParams = data
        return this.uploadImageModel
    }
}