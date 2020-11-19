import {
    AddAccountParams,
    AddAccountRepository, LoadByIdRepository,
    UniqueDocumentRepository, UploadImageRepository
} from "@/domain/models/gateway/account-repository";
import {AccountModel} from "@/domain/models/account";
import {MongoAdapter} from "../service/mongo-adapter";
import {
    LoadAccountByTokenRepository, UpdateAccessTokenRepository
} from "@/domain/models/gateway/authentication-repository";
import { ObjectId } from 'mongodb'


export class AccountRepositoryMongoAdapter
    implements AddAccountRepository,
        LoadAccountByTokenRepository,
        UpdateAccessTokenRepository,
        UniqueDocumentRepository,
        UploadImageRepository,
        LoadByIdRepository {

    async add(data: AddAccountParams): Promise<AccountModel> {
        const accountCollection = await MongoAdapter.getCollection('accounts')
        const result = await accountCollection.insertOne(data)
        return MongoAdapter.map(result.ops[0])
    }

    async loadByEmail(email: string): Promise<AccountModel> {
        const accountCollection = await MongoAdapter.getCollection('accounts')
        const account = await accountCollection.findOne({email})
        return account && MongoAdapter.map(account)
    }


    async load(accessToken: string, role?: string): Promise<AccountModel> {
        const accountCollection = await MongoAdapter.getCollection('accounts')
        const account = await accountCollection.findOne({
            accessToken: accessToken,
            $or: [{
                role
            }, {
                role: 'Admin'
            }]
        })
        return account && MongoAdapter.map(account)
    }

    async uniqueDocument(document: string): Promise<AccountModel> {
        const accountCollection = await MongoAdapter.getCollection('accounts')
        const account = await accountCollection.findOne({document})
        return account && MongoAdapter.map(account)
    }

    async loadById(id: string): Promise<AccountModel> {
        const accountCollection = await MongoAdapter.getCollection('accounts')
        const account = await accountCollection.findOne({ '_id': new ObjectId(id) })
        return account && MongoAdapter.map(account)
    }

    async updateAccessToken(id: string, token: string): Promise<void> {
        const accountCollection = await MongoAdapter.getCollection('accounts')
        await accountCollection.updateOne({
            _id: id
        }, {
            $set: {
                accessToken: token
            }
        })
    }

    async uploadImage(id: string, avatar: string): Promise<void> {
        const accountCollection = await MongoAdapter.getCollection('accounts')
        await accountCollection.updateOne(
            { '_id': new ObjectId(id) },
            {
                $set: { avatar: avatar },
                $currentDate: { lastModified: true }
            }
        )
    }
}