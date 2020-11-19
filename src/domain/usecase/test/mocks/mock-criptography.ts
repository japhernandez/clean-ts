import * as faker from "faker";
import {Hasher} from "@/domain/usecase/utils/hasher";
import {HasherCompare} from "@/domain/usecase/utils/hasher-compare";
import {Encrypt} from "@/domain/usecase/utils/encrypt";
import {Decrypt} from "@/domain/usecase/utils/decrypt";

export class HashSpy implements Hasher {
    digest = faker.random.uuid()
    plainText: string | undefined

    async has(text: string): Promise<string> {
        this.plainText = text
        return this.digest
    }
}

export class HashCompareSpy implements HasherCompare {
    plainText: string | undefined
    digest: string | undefined
    isValid = true

    async compare(text: string, digest: string): Promise<boolean> {
        this.plainText = text
        this.digest = digest
        return this.isValid
    }
}

export class EncryptSpy implements Encrypt {
    ciphertext = faker.random.uuid()
    plainText: string | undefined

    async encrypt(text: string): Promise<string> {
        this.plainText = text
        return this.ciphertext
    }
}

export class DecryptSpy implements Decrypt {
    plainText = faker.internet.password()
    ciphertext: string | undefined

    async decrypt(ciphertext: string): Promise<string> {
        this.ciphertext = ciphertext
        return this.plainText
    }
}