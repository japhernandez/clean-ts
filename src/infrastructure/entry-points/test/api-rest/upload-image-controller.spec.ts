import {forbidden, HttpRequest, noContent} from "@/infrastructure/helpers/http";
import {mockUploadImageParams} from "@/domain/usecase/test/mocks/mock-account";
import {UploadImageController} from "@/infrastructure/entry-points/api-rest/upload-image-controller";
import {MockUploadImageServiceSpy} from "@/domain/usecase/test/mocks/mock-upload-spy";
import * as faker from "faker";
import {log} from "util";

const mockRequest = (): HttpRequest => {
    return {
        body: {
            _id: faker.random.uuid(),
            avatar: faker.random.word()
        }
    }
}

type SutType = {
    sut: UploadImageController
    mockUploadImageServiceSpy: MockUploadImageServiceSpy
}

const makeSut = (): SutType => {
    const mockUploadImageServiceSpy = new MockUploadImageServiceSpy()
    const sut = new UploadImageController(mockUploadImageServiceSpy)
    return  {
        sut,
        mockUploadImageServiceSpy
    }
}

describe('Upload Image Controller', () => {
    it('should call upload image with correct values',  async function () {
        const { sut, mockUploadImageServiceSpy } = makeSut()
        const httpRequest = mockRequest()
        await sut.handle(httpRequest)
        expect(mockUploadImageServiceSpy.uploadImageModel).toBeTruthy()
    });
})