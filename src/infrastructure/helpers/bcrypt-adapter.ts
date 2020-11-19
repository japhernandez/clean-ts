import {Hasher} from "@/domain/usecase/utils/hasher";
import {HasherCompare} from "@/domain/usecase/utils/hasher-compare";
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HasherCompare {

     constructor(private readonly salt: number) {
     }

    async compare(text: string, digest: string): Promise<boolean> {
        return await bcrypt.compare(text, digest)
    }

    async has(text: string): Promise<string> {
        return await bcrypt.hash(text, this.salt)
    }

}