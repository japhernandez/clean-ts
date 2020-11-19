import {EmailValid} from "@/infrastructure/driven_adapters/mongo-repository/exception/validations/email-is-valid";
import validator from "validator";

jest.mock('validator', () => ({
    isEmail (): boolean {
        return true
    }
}))

const makeSut = (): EmailValid => {
    return new EmailValid()
}

describe('EmailValid', () => {
    it('should return false if validator returns false', function () {
        const sut = makeSut()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
        const isValid = sut.isValid('invalid_email@max')
        expect(isValid).toBe(false)
    });

    it('should return true if validator returns true', function () {
        const sut = makeSut()
        const isValid = sut.isValid('admin@admin.com')
        expect(isValid).toBe(true)
    });

    it('should call validator with correct email', function () {
        const sut = makeSut()
        const isEmailSpy = jest.spyOn(validator, 'isEmail')
        sut.isValid('admin@admin.com')
        expect(isEmailSpy).toHaveBeenCalledWith('admin@admin.com')
    });
})