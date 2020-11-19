import {UploadImageServiceImpl} from "@/domain/usecase/impl/upload-image-service-impl";
import {MockUploadImageRepositorySpy} from "@/domain/usecase/test/mocks/mock-account-spy";
import {mockUploadImageParams} from "@/domain/usecase/test/mocks/mock-account";
import {MockLoadByIdRepositorySpy} from "@/domain/usecase/test/mocks/mock-upload-spy";

type SutType = {
    sut: UploadImageServiceImpl
    mockUploadImageRepository: MockUploadImageRepositorySpy // void
    mockLoadByIdRepositorySpy: MockLoadByIdRepositorySpy // return
}

const makeSut = (): SutType => {
    const mockUploadImageRepository = new MockUploadImageRepositorySpy()
    const mockLoadByIdRepositorySpy = new MockLoadByIdRepositorySpy()
    const sut = new UploadImageServiceImpl(
        mockUploadImageRepository,
        mockLoadByIdRepositorySpy,
    )

    return {
        sut,
        mockUploadImageRepository,
        mockLoadByIdRepositorySpy,
    }
}

describe('UploadImageServiceImpl UseCase', () => {
    it('should call UploadImageService', async function () {
        const { sut } = makeSut()
        const uploadSpy = jest.spyOn(sut, 'uploadImage')
        await sut.uploadImage(mockUploadImageParams())
        expect(uploadSpy).toBeCalled()
    });

    it('should return null if UploadImageService not returns null', async function () {
        const { sut, mockLoadByIdRepositorySpy } = makeSut()
        mockLoadByIdRepositorySpy.accountModel = null
        const account = await sut.uploadImage(mockUploadImageParams())
        expect(account).toBeNull()
    });
})