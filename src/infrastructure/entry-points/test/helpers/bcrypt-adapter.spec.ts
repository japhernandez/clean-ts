import bcrypt from "bcrypt";
import {BcryptAdapter} from "@/infrastructure/helpers/bcrypt-adapter";
import {throwError} from "@/domain/usecase/test/mocks/test-helpers";


jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return 'hash'
    },

    async compare(): Promise<boolean> {
        return true
    }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
    describe('hash()', () => {
        it('should call hash with correct values', async function () {
            const sut = makeSut()
            const hashSpy = jest.spyOn(bcrypt, 'hash')
            await sut.has('value')
            expect(hashSpy).toHaveBeenCalledWith('value', salt)
        });

        it('should return a valid hash on hash success', async function () {
            const sut = makeSut()
            const hash = await sut.has('value')
            expect(hash).toBe('hash')
        });

        it('should throw if hash throws', async function () {
           const sut = makeSut()
            jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
            const promise = sut.has('value')
            await expect(promise).rejects.toThrow()
        });
    })

    describe('compare()', () => {
        it('should call compare with correct values', async function () {
            const sut = makeSut()
            const compareSpy = jest.spyOn(bcrypt, 'compare')
            await sut.compare('value', 'hash')
            expect(compareSpy).toHaveBeenCalledWith('value', 'hash')

        });

        it('should return true when compare succeeds', async function () {
            const sut = makeSut()
            const isValid = await sut.compare('value', 'hash')
            expect(isValid).toBe(true)
        });

        it('should return false when compare fails', async function () {
            const sut = makeSut()
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false)
            const isValid = await sut.compare('value', 'hash')
            expect(isValid).toBe(false)
        });

        it('should throw if compare throws', async function () {
            const sut = makeSut()
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
            const promise = sut.compare('value', 'hash')
            await expect(promise).rejects.toThrow()
        });
    })
})