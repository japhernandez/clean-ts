import {ValidationComposite} from "@/infrastructure/driven_adapters/mongo-repository/exception/validations/validation-composite";
import * as faker from "faker";
import {MockValidationSpy} from "@/infrastructure/driven_adapters/mongo-repository/test/mocks/mock-validation";
import {MissingParamError} from "@/infrastructure/driven_adapters/mongo-repository/exception/error";

const field = faker.random.word()

type SutType = {
    mockValidationSpy: MockValidationSpy[]
    sut: ValidationComposite
}

const makeSut = (): SutType => {
    const mockValidationSpy = [
        new MockValidationSpy(),
        new MockValidationSpy()
    ]
    const sut = new ValidationComposite(mockValidationSpy)
    return {
        sut,
        mockValidationSpy
    }
}

describe('Validation Composite', () => {
    it('should return an error if any validation fails', function () {
        const { sut, mockValidationSpy } = makeSut()
        mockValidationSpy[1].error = new MissingParamError(field)
        const error = sut.validate({ [field]: field })
        expect(error).toEqual(mockValidationSpy[1].error)
    });

    it('should return the first error if more then validation fails', function () {
        const { sut, mockValidationSpy } = makeSut()
        mockValidationSpy[0].error = new Error()
        mockValidationSpy[1].error = new MissingParamError(field)
        const error = sut.validate({ [field]: field })
        expect(error).toEqual( mockValidationSpy[0].error = new Error())
     });

    it('should not return if validation succeeds', function () {
        const { sut } = makeSut()
        const error = sut.validate({ [field]: faker.random.word() })
        expect(error).toBeFalsy()
    });
})