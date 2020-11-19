import {AccountModel} from "../../models/account";
import {
    AddAccountParams,
    AddAccountRepository,
    LoadByEmailRepository,
    UniqueDocumentRepository
} from "../../models/gateway/account-repository";
import {AddAccountService} from "../account-service";
import {Hasher} from "@/domain/usecase/utils/hasher";

export class AccountServiceImpl implements AddAccountService {

    constructor(
        private readonly hasher: Hasher,
        private readonly loadByEmailRepository: LoadByEmailRepository,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly uniqueDocumentRepository: UniqueDocumentRepository
    ) {
    }

    async add(data: AddAccountParams): Promise<AccountModel | boolean> {
        const account = await this.loadByEmailRepository.loadByEmail(data.email)
        const documentUnique = await this.uniqueDocumentRepository.uniqueDocument(data.document)

        if (documentUnique) return false

        if (!account && !documentUnique) {
            const hashedPassword = await this.hasher.has(data.password)
            return await this.addAccountRepository.add(Object.assign({}, data, {password: hashedPassword}))
        }
        return null;
    }
}