export interface HasherCompare {
    compare:(text: string, digest: string) => Promise<boolean>
}