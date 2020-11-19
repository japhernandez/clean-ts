import {AccountServiceImpl} from "@/domain/usecase/impl/account-service-impl";
import {HashSpy} from "@/domain/usecase/test/mocks/mock-criptography";
import {
    MockAccountSpy,
    MockDocumentUniqueSpy,
    MockLoadAccountByEmailSpy
} from "@/domain/usecase/test/mocks/mock-account-spy";
import {mockAccountModel, mockAddAccountParams} from "@/domain/usecase/test/mocks/mock-account";
import {throwError} from "@/domain/usecase/test/mocks/test-helpers";

type SutType = {
    sut: AccountServiceImpl
    mockHashSpy: HashSpy
    mockLoadByEmailSpy: MockLoadAccountByEmailSpy
    mockDocumentUniqueSpy: MockDocumentUniqueSpy
    mockAddSpy: MockAccountSpy
}

const makeSut = (): SutType => {
    const mockHashSpy = new HashSpy()
    const mockLoadByEmailSpy = new MockLoadAccountByEmailSpy()
    mockLoadByEmailSpy.accountModel = null
    const mockDocumentUniqueSpy = new MockDocumentUniqueSpy()
    mockDocumentUniqueSpy.accountModel = null
    const mockAddSpy = new MockAccountSpy()
    const sut = new AccountServiceImpl(
        mockHashSpy,
        mockLoadByEmailSpy,
        mockAddSpy,
        mockDocumentUniqueSpy
    )

    return {
        sut,
        mockHashSpy,
        mockLoadByEmailSpy,
        mockAddSpy,
        mockDocumentUniqueSpy,
    }
}

describe('AccountServiceImpl UseCase', () => {
    it('should call hash with correct plainText', async function () {
        const { sut, mockHashSpy } = makeSut()
        const addAccountParams = mockAddAccountParams()
        await sut.add(addAccountParams)
        expect(mockHashSpy.plainText).toBe(addAccountParams.password)
    });

    it('should call AddAccountRepository with correct values', async function () {
        const { sut, mockAddSpy } = makeSut()
        const addAccountParams = mockAddAccountParams()
        const account = await sut.add(addAccountParams)
        expect(account).toEqual(mockAddSpy.accountModel)
    });

    it('should return null if LoadByEmailRepository not return null', async function () {
        const {sut, mockLoadByEmailSpy } = makeSut()
        mockLoadByEmailSpy.accountModel = mockAccountModel()
        const account = await sut.add(mockAddAccountParams())
        expect(account).toBeNull()
    });

    it('should throw if AddAccountRepository throws', function () {
        const { sut, mockAddSpy } = makeSut()
        jest.spyOn(mockAddSpy, 'add').mockImplementationOnce(throwError)
        const promise = sut.add(mockAddAccountParams())
        expect(promise).rejects.toThrow()
    });
})