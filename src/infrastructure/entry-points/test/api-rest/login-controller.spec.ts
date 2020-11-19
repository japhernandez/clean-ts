import {badRequest, forbidden, HttpRequest, serverError, unauthorized} from "@/infrastructure/helpers/http";
import {mockAuthenticationParams} from "@/domain/usecase/test/mocks/mock-account";
import {LoginController} from "@/infrastructure/entry-points/api-rest/login-controller";
import {MockAuthenticationSpy} from "@/domain/usecase/test/mocks/mock-account-spy";
import {MockValidationSpy} from "@/infrastructure/driven_adapters/mongo-repository/test/mocks/mock-validation";
import {MissingParamError} from "@/infrastructure/driven_adapters/mongo-repository/exception/error";
import {throwError} from "@/domain/usecase/test/mocks/test-helpers";
import * as faker from "faker";

const mockRequest = (): HttpRequest => ({
    body: mockAuthenticationParams()
})

type SutType = {
    sut: LoginController
    mockAuthenticationSpy: MockAuthenticationSpy
    mockValidationSpy: MockValidationSpy
}

const makeSut = (): SutType => {
    const mockAuthenticationSpy = new MockAuthenticationSpy()
    const mockValidationSpy = new MockValidationSpy()
    const sut = new LoginController(mockAuthenticationSpy, mockValidationSpy)
    return {
        sut,
        mockAuthenticationSpy,
        mockValidationSpy
    }
}

describe('Login Controller', () => {
    it('should call authentication with correct values', async function () {
        const { sut, mockAuthenticationSpy } = makeSut()
        const httpRequest = mockRequest()
        await sut.handle(httpRequest)
        expect(mockAuthenticationSpy.authenticationParams).toEqual({
            email: httpRequest.body.email,
            password: httpRequest.body.password
        })
    });

    it('should return 401 if invalid credentials are provided', async function () {
        const {sut, mockAuthenticationSpy} = makeSut()
        mockAuthenticationSpy.authenticationModel = null
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(unauthorized())
    });

    it('should return 500 if Authentication throws', async function () {
        const {sut, mockAuthenticationSpy} = makeSut()
        jest.spyOn(mockAuthenticationSpy, 'auth').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    });

    it('should return 403 if Authentication return null', async function () {
        const {sut, mockValidationSpy} = makeSut()
        mockValidationSpy.error = new MissingParamError(faker.random.word())
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(badRequest(mockValidationSpy.error))
    });
})