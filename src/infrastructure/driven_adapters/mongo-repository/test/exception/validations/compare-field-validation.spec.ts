import * as faker from "faker";
import {CompareFieldValidation} from "@/infrastructure/driven_adapters/mongo-repository/exception/validations/compare-field-validation";
import {InvalidParamError} from "@/infrastructure/driven_adapters/mongo-repository/exception/error";

const field = faker.random.word()
const fieldCompare = faker.random.word()

const makeSut = (): CompareFieldValidation => {
    return new CompareFieldValidation(field, fieldCompare)
}

describe('Compare Field Validation', () => {
    it('should return an InvalidParamError if validation fails', function () {
        const sut = makeSut()
        const error = sut.validate({
            [field]: field,
            [fieldCompare]: fieldCompare
        })

        expect(error).toEqual(new InvalidParamError(fieldCompare))
    });

    it('should not return if validation succeeds', function () {
        const sut = makeSut()
        const value = faker.random.word()
        const error = sut.validate({
            [field]: value,
            [fieldCompare]: value
        })
        expect(error).toBeFalsy()
    });
})