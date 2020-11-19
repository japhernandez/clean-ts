import {UploadImageService} from "../account-service";
import {
    LoadByIdRepository, UploadImageParams,
    UploadImageRepository
} from "../../models/gateway/account-repository";
import {AccountModel} from "@/domain/models/account";

export class UploadImageServiceImpl implements UploadImageService {

    constructor(
        private readonly uploadImageRepository: UploadImageRepository, // void
        private readonly loadByIdRepository: LoadByIdRepository
    ) {
    }

    async uploadImage(data: UploadImageParams): Promise<AccountModel> {
        const account = await this.loadByIdRepository.loadById(data.id)
        if (account) {
            await this.uploadImageRepository.uploadImage(data.id, data.avatar)
        } else {
            return null
        }
    }
}