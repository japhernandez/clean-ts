import {Collection} from "mongodb";
import {MongoAdapter} from "@/infrastructure/driven_adapters/mongo-repository/service/mongo-adapter";
import {AccountRepositoryMongoAdapter} from "@/infrastructure/driven_adapters/mongo-repository/adapter/account-repository-adapter";
import {mockAddAccountParams} from "@/domain/usecase/test/mocks/mock-account";
import * as faker from "faker";

let accountCollection: Collection

describe('AccountRepositoryMongoAdapter', () => {
    beforeAll(async () => {
        await MongoAdapter.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoAdapter.disconnect()
    })

    beforeEach(async () => {
        accountCollection = await MongoAdapter.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    const makeSut = (): AccountRepositoryMongoAdapter => {
        return new AccountRepositoryMongoAdapter()
    }

    describe('Add()', () => {
        it('should return an account on success', async function () {
            const sut = makeSut()
            const addAccountParams = mockAddAccountParams()
            const account = await sut.add(addAccountParams)
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toBe(addAccountParams.name)
            expect(account.email).toBe(addAccountParams.email)
            expect(account.password).toBe(addAccountParams.password)
        });
    })

    describe('loadByEmail', () => {
        it('should return an account on success', async function () {
            const sut = makeSut()
            const addAccountParams = mockAddAccountParams()
            await accountCollection.insertOne(addAccountParams)
            const account = await sut.loadByEmail(addAccountParams.email)
            expect(account.id).toBeTruthy()
            expect(account.name).toBe(addAccountParams.name)
            expect(account.email).toBe(addAccountParams.email)
            expect(account.password).toBe(addAccountParams.password)
        });

        it('should return null if loadByEmail fails', async function () {
            const sut = makeSut()
            const account = await sut.loadByEmail(faker.random.word())
            expect(account).toBeFalsy()
        });
    })

    describe('updateAccessToken()', () => {
        it('should update the account accessToke on success', async function () {
            const sut = makeSut()
            const result = await accountCollection.insertOne(mockAddAccountParams())
            const fakeAccount = result.ops[0]
            expect(fakeAccount.accessToken).toBeFalsy()
            const accessToken = faker.random.uuid()
            await sut.updateAccessToken(fakeAccount._id, accessToken)
            const account = await accountCollection.findOne({_id: fakeAccount._id})
            expect(account).toBeTruthy()
            expect(account.accessToken).toBe(accessToken)
        });
    })

    describe('loadByToken()', () => {
        let name = faker.name.findName()
        let email = faker.internet.email()
        let password = faker.internet.password()
        let accessToken = faker.random.uuid()

        beforeEach(() => {
             name = faker.name.findName()
             email = faker.internet.email()
             password = faker.internet.password()
             accessToken = faker.random.uuid()
        })

        it('should return an account on loadByToken without role', async function () {
            const sut = makeSut()
            await accountCollection.insertOne({
                name, email, password, accessToken
            })
            const account = await sut.load(accessToken)
            expect(account).toBeTruthy()
        });
    })

    describe('uniqueDocument()', () => {
        it('should return an account on success', async function () {
            const sut = makeSut()
            const addAccountParams = mockAddAccountParams()
            await accountCollection.insertOne(addAccountParams)
            const account = await sut.uniqueDocument(addAccountParams.document)
            expect(account.id).toBeTruthy()
            expect(account.document).toBe(addAccountParams.document)
        });

        it('should return an account validation is false', async function () {
            const sut = makeSut()
            const addAccountParams = mockAddAccountParams()
            const account = await sut.uniqueDocument(addAccountParams.document)
            expect(account).toBeFalsy()
        });
    })

    describe('loadByDocument()', () => {
        it('should return an account on success', async function () {
            const sut = makeSut()
            const addAccountParams = mockAddAccountParams()
            await accountCollection.insertOne(addAccountParams)
            const account = await sut.uniqueDocument(addAccountParams.document)
            expect(account.id).toBeTruthy()
            expect(account.document).toBe(addAccountParams.document)
        });

        it('should return an account validation is false', async function () {
            const sut = makeSut()
            const addAccountParams = mockAddAccountParams()
            const account = await sut.uniqueDocument(addAccountParams.document)
            expect(account).toBeFalsy()
        });
    })

    describe('uploadImage()', () => {
        it('should update the upload image on success', async function () {
            const sut = makeSut()
            const result = await accountCollection.insertOne(mockAddAccountParams())
            const fakeAccount = result.ops[0]
            await sut.uploadImage(fakeAccount._id, fakeAccount.avatar)
            const account = await accountCollection.findOne({_id: fakeAccount._id})
            expect(account).toBeTruthy()
        });
    })
})