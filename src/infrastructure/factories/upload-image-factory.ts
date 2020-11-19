import {AccountRepositoryMongoAdapter} from "../../infrastructure/driven_adapters/mongo-repository/adapter/account-repository-adapter";
import {UploadImageServiceImpl} from "../../domain/usecase/impl/upload-image-service-impl";
import {UploadImageService} from "@/domain/usecase/account-service";

export const makeDbUploadImage = (): UploadImageService => {
    const accountRepositoryMongoAdapter = new AccountRepositoryMongoAdapter()
    return new UploadImageServiceImpl(
        accountRepositoryMongoAdapter,
        accountRepositoryMongoAdapter
    )
}