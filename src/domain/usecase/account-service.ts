import { AccountModel } from "../models/account";
import {UploadImageParams} from "@/domain/models/gateway/account-repository";

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface AddAccountService {
  add: (data: AddAccountParams) => Promise<AccountModel | boolean>
}

export interface UploadImageService {
  uploadImage: (data: UploadImageParams) => Promise<AccountModel>
}
