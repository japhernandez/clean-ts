import {LoadAccountByTokenServiceImpl} from "@/domain/usecase/impl/load-account-by-token-service-impl";
import {MockLoadByTokenSpy} from "@/domain/usecase/test/mocks/mock-account-spy";
import {DecryptSpy} from "@/domain/usecase/test/mocks/mock-criptography";
import * as faker from "faker";

type SutType = {
    sut: LoadAccountByTokenServiceImpl
    mockLoadByTokenSpy: MockLoadByTokenSpy
    mockDecrypt: DecryptSpy
}

const makeSut = (): SutType => {
    const mockDecrypt = new DecryptSpy()
    const mockLoadByTokenSpy = new MockLoadByTokenSpy()
    const sut = new LoadAccountByTokenServiceImpl(mockLoadByTokenSpy, mockDecrypt)
    return {
        sut,
        mockDecrypt,
        mockLoadByTokenSpy
    }
}

let token: string
let role: string

describe('LoadAccountByTokenServiceImpl UseCase', () => {
    beforeEach(() => {
        token = faker.random.uuid()
        role = faker.random.word()
    })

    it('should call decrypt with correct ciphertext', async function () {
        const { sut, mockDecrypt } = makeSut()
        await sut.load(token, role)
        expect(mockDecrypt.ciphertext).toEqual(token)
    });

    it('should call LoadAccountByTokenRepository with correct values', async function () {
        const { sut, mockLoadByTokenSpy } = makeSut()
        await sut.load(token, role)
        expect(mockLoadByTokenSpy.token).toBe(token)
    });
})