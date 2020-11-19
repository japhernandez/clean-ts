export type AuthenticationModel = {
    id: string,
    name: string,
    email: string,
    password?: string,
    image?: string,
    status: number,
    rol?: string
    accessToken: string
}
