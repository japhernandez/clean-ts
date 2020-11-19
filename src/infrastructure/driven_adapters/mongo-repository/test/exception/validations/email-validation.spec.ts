import * as faker from "faker";
import {EmailValidation} from "@/infrastructure/driven_adapters/mongo-repository/exception/validations/email-validation";
import {MockEmailValidationSpy} from "@/infrastructure/driven_adapters/mongo-repository/test/mocks/mock-email-validation";
import {InvalidParamError} from "@/infrastructure/driven_adapters/mongo-repository/exception/error";
import {throwError} from "@/domain/usecase/test/mocks/test-helpers";

const field = faker.random.word()

type SutTypes = {
    sut: EmailValidation
    mockEmailValidatorSpy: MockEmailValidationSpy
}

const makeSut = (): SutTypes => {
    const mockEmailValidatorSpy = new MockEmailValidationSpy()
    const sut = new EmailValidation(field, mockEmailValidatorSpy)
    return {
        sut,
        mockEmailValidatorSpy
    }
}

describe('Email Validation', () => {
    it('should return an error if EmailValidator returns false', function () {
        const { sut, mockEmailValidatorSpy } = makeSut()
        mockEmailValidatorSpy.isEmailValid = false
        const email = faker.internet.email()
        const error = sut.validate({ [field]: email })
        expect(error).toEqual(new InvalidParamError(field))
    });

    it('should call EmailValidation with correct email', function () {
        const { sut, mockEmailValidatorSpy } = makeSut()
        const email = faker.internet.email()
        sut.validate({ [field]: email })
        expect(mockEmailValidatorSpy.email).toEqual(email)
    });

    it('should throw if EmailValidation throws', function () {
        const { sut, mockEmailValidatorSpy } = makeSut()
        jest.spyOn(mockEmailValidatorSpy, 'isValid').mockImplementationOnce(throwError)
        expect(sut.validate).toThrow()
    });
})