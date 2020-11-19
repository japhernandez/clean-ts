import * as faker from "faker";
import {RequiredFieldValidation} from "@/infrastructure/driven_adapters/mongo-repository/exception/validations/required-field-validation";
import {MissingParamError} from "@/infrastructure/driven_adapters/mongo-repository/exception/error";

const field = faker.random.word()

const makeSut = (): RequiredFieldValidation => {
    return new RequiredFieldValidation(field)
}

describe('Required Field Validation', () => {
    it('should return an MissingParamError if validation is fails', function () {
        const sut = makeSut()
        const error = sut.validate({
            invalidParamField: faker.random.word()
        })
        expect(error).toEqual(new MissingParamError(field))
    });

    it('should not return if validation succeed', function () {
        const sut = makeSut()
        const error = sut.validate({ [field]: field})
        expect(error).toBeFalsy()
    });
})