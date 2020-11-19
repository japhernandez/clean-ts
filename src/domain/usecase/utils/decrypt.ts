export interface Decrypt {
    decrypt: (ciphertext: string) => Promise<string>
}