export interface Encrypt {
    encrypt: (text: string) => Promise<string>
}