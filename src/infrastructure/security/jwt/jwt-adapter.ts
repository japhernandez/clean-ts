import {Decrypt} from "@/domain/usecase/utils/decrypt";
import {Encrypt} from "@/domain/usecase/utils/encrypt";
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Decrypt, Encrypt {

    constructor(private readonly secret: string) {
    }

    async decrypt(ciphertext: string): Promise<string> {
       const plainText: any = await jwt.verify(ciphertext, this.secret);
       return plainText
    }

    async encrypt(text: string): Promise<string> {
        const cipherText = await jwt.sign({id: text}, this.secret)
        return cipherText
    }

}