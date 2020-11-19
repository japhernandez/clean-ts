import {SignupController} from "@/infrastructure/entry-points/api-rest/signup-controller";
import {MockAccountSpy, MockAuthenticationSpy} from "@/domain/usecase/test/mocks/mock-account-spy";
import {MockValidationSpy} from "@/infrastructure/driven_adapters/mongo-repository/test/mocks/mock-validation";
import {badRequest, forbidden, HttpRequest, ok, serverError} from "@/infrastructure/helpers/http";
import * as faker from "faker";
import {throwError} from "@/domain/usecase/test/mocks/test-helpers";
import {
    FieldInUseError,
    MissingParamError,
    ServerError
} from "@/infrastructure/driven_adapters/mongo-repository/exception/error";


const mockRequest = (): HttpRequest => {
    const password = faker.internet.password()
    return {
        body: {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password,
            passwordConfirmation: password
        }
    }
}

type SutType = {
    sut: SignupController
    mockAuthenticationSpy: MockAuthenticationSpy
    mockAccountSpy: MockAccountSpy
    mockValidationSpy: MockValidationSpy
}

const makeSut = (): SutType => {
    const mockAuthenticationSpy = new MockAuthenticationSpy()
    const mockAccountSpy = new MockAccountSpy()
    const mockValidationSpy = new MockValidationSpy()
    const sut = new SignupController(mockAuthenticationSpy, mockAccountSpy, mockValidationSpy)
    return {
        sut,
        mockAuthenticationSpy,
        mockAccountSpy,
        mockValidationSpy
    }
}

describe('SignUp Controller', () => {
    it('should return 500 if AddAccount throws', async function () {
        const {sut, mockAccountSpy} = makeSut()
        jest.spyOn(mockAccountSpy, 'add').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        await expect(httpResponse).toEqual(serverError(new ServerError(null)))
    });

    it('should call AddAccount with correct values', async function () {
        const { sut, mockAccountSpy } = makeSut()
        const httpRequest = mockRequest()
        await sut.handle(httpRequest)
        expect(mockAccountSpy.addAccountParams).toEqual({
            name: httpRequest.body.name,
            email: httpRequest.body.email,
            password: httpRequest.body.password
        })
    });

    it('should return 403 if AddAccount return null', async function () {
        const { sut, mockAccountSpy } = makeSut()
        mockAccountSpy.accountModel = null
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(forbidden(new FieldInUseError()))
    });

    it('should return 400 if Validation returns an error', async function () {
        const { sut, mockValidationSpy } = makeSut()
        mockValidationSpy.error = new MissingParamError(faker.random.word())
        const account = await sut.handle(mockRequest())
        expect(account).toEqual(badRequest(mockValidationSpy.error))
    });

    it('should return 200 if authentication is succeed', async function () {
        const { sut, mockAuthenticationSpy } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(ok(mockAuthenticationSpy.authenticationModel))
    });
})