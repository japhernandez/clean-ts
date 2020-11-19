import jwt from 'jsonwebtoken'
import {JwtAdapter} from "@/infrastructure/security/jwt/jwt-adapter";

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
        return 'token'
    },

    async verify (): Promise<string> {
        return 'value'
    }
}))

const makeSut = (): JwtAdapter => {
    return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
    describe('sign()', () => {
        it('should call sign with correct values',async function () {
            const sut = makeSut()
            const signSpy = jest.spyOn(jwt, 'sign')
            await sut.encrypt('id')
            expect(signSpy).toHaveBeenCalledWith({id: 'id'}, 'secret')
        });
    })

    describe('verify()', () => {
        it('should call verify with correct values', async function () {
            const sut = makeSut()
            const verifySpy = jest.spyOn(jwt, 'verify')
            await sut.decrypt('token')
            expect(verifySpy).toHaveBeenCalledWith('token', 'secret')
        });
    })
})