export interface Hasher {
    has: (text: string) => Promise<string>
}