import {AuthenticationServiceImpl} from "@/domain/usecase/impl/authentication-service-impl"
import {MockLoadAccountByEmailSpy, MockUpdateAccessTokenSpy} from "@/domain/usecase/test/mocks/mock-account-spy"
import {EncryptSpy, HashCompareSpy} from "@/domain/usecase/test/mocks/mock-criptography"
import {mockAuthenticationParams} from "@/domain/usecase/test/mocks/mock-account"
import {throwError} from "@/domain/usecase/test/mocks/test-helpers";

type SutTypes = {
    sut: AuthenticationServiceImpl
    mockLoadAccountByEmailSpy: MockLoadAccountByEmailSpy
    mockUpdateAccessTokenSpy: MockUpdateAccessTokenSpy
    mockHashCompareSpy: HashCompareSpy
    mockEncryptSpy: EncryptSpy
}

// Mock global de la clase
const makeSut = (): SutTypes => {
    // Mocks
    const mockLoadAccountByEmailSpy = new MockLoadAccountByEmailSpy()
    const mockUpdateAccessTokenSpy = new MockUpdateAccessTokenSpy()
    const mockHashCompareSpy = new HashCompareSpy()
    const mockEncryptSpy = new EncryptSpy()

    // Instanciamos la clase y agregamos las dependencias como mocks a la clase
    const sut = new AuthenticationServiceImpl(
        mockLoadAccountByEmailSpy,
        mockUpdateAccessTokenSpy,
        mockHashCompareSpy,
        mockEncryptSpy
    )

    return {
        sut,
        mockLoadAccountByEmailSpy,
        mockUpdateAccessTokenSpy,
        mockHashCompareSpy,
        mockEncryptSpy
    }
}

describe('AuthenticationServiceImpl UseCase', () => {
    it('should call LoadByEmailRepository with correct email', async function () {
        const { sut, mockLoadAccountByEmailSpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        await sut.auth(authenticationParams)
        expect(mockLoadAccountByEmailSpy.email).toBe(authenticationParams.email)
    });

    it('should throw if LoadByEmailRepository throws', async function () {
        const { sut, mockLoadAccountByEmailSpy} = makeSut()
        jest.spyOn(mockLoadAccountByEmailSpy, 'loadByEmail').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow()
    });

    it('should return null if LoadByEmailRepository returns null', async function () {
        const { sut, mockLoadAccountByEmailSpy } = makeSut()
        mockLoadAccountByEmailSpy.accountModel = null
        const model = await sut.auth(mockAuthenticationParams())
        expect(model).toBeNull()
    });

    it('should call HashComparer with correct values', async function () {
        const { sut, mockHashCompareSpy, mockLoadAccountByEmailSpy} = makeSut()
        const authenticationParams = mockAuthenticationParams()
        await sut.auth(authenticationParams)
        expect(mockHashCompareSpy.plainText).toBe(authenticationParams.password)
        expect(mockHashCompareSpy.digest).toBe(mockLoadAccountByEmailSpy.accountModel.password)
    });

    it('should throw if HashComparer throws', async function () {
        const { sut, mockHashCompareSpy} = makeSut()
        jest.spyOn(mockHashCompareSpy, 'compare').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow()
    });

    it('should return null if HashComparer returns false', async function () {
        const { sut, mockHashCompareSpy} = makeSut()
        mockHashCompareSpy.isValid = false
        const model = await sut.auth(mockAuthenticationParams())
        expect(model).toBeNull()
    });

    it('should call Encrypt with correct plainText', async function () {
        const { sut, mockEncryptSpy, mockLoadAccountByEmailSpy } = makeSut()
        await sut.auth(mockAuthenticationParams())
        expect(mockEncryptSpy.plainText).toBe(mockLoadAccountByEmailSpy.accountModel.id)
    });

    it('should throw if Encrypt throws', async function () {
        const { sut, mockEncryptSpy } = makeSut()
        jest.spyOn(mockEncryptSpy, 'encrypt').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow()
    });

    it('should return an AuthenticationModel on success', async function () {
        const { sut, mockEncryptSpy, mockLoadAccountByEmailSpy } = makeSut()
        const { accessToken, name } = await sut.auth(mockAuthenticationParams())
        expect(accessToken).toBe(mockEncryptSpy.ciphertext)
        expect(name).toBe(mockLoadAccountByEmailSpy.accountModel.name)
    });

    it('should call UpdateAccessTokenRepository with correct values', async function () {
       const { sut, mockLoadAccountByEmailSpy, mockEncryptSpy, mockUpdateAccessTokenSpy } = makeSut()
        await sut.auth(mockAuthenticationParams())
        expect(mockUpdateAccessTokenSpy.id).toBe(mockLoadAccountByEmailSpy.accountModel.id)
        expect(mockUpdateAccessTokenSpy.token).toBe(mockEncryptSpy.ciphertext)
    });

    it('should throw if UpdateAccessTokenRepository throws', async function () {
        const { sut, mockUpdateAccessTokenSpy } = makeSut()
        jest.spyOn(mockUpdateAccessTokenSpy, 'updateAccessToken').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow()
    });
})