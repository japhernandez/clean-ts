import { AccountModel } from "../account";

export type AddAccountParams = Omit<AccountModel, 'id'>

export type UploadImageParams = {
  id: string,
  avatar: string
}

export interface AddAccountRepository {
  add: (data: AddAccountParams) => Promise<AccountModel | boolean>
}

export interface LoadByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel>
}

export interface LoadByIdRepository {
  loadById: (id: string) => Promise<AccountModel>
}

export interface UniqueDocumentRepository {
  uniqueDocument: (document: string) => Promise<AccountModel | boolean>
}

export interface UploadImageRepository {
  uploadImage: (id: string, avatar: string) => Promise<void>
}