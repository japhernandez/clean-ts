export class AccessDeniedError extends Error {
    constructor () {
        super('Access denied')
        this.name = 'AccessDeniedError'
    }
}

export class FieldInUseError extends Error {
    constructor () {
        super('The received email is already in use')
        this.name = 'FieldInUseError'
    }
}

export class DocumentInUseError extends Error {
    constructor() {
        super('The received document is already in use');
        this.name = 'DocumentInUseError'
    }
}

export class InvalidParamError extends Error {
    constructor (paramName: string) {
        super(`Invalid param: ${paramName}`)
        this.name = 'InvalidParamError'
    }
}

export class MissingParamError extends Error {
    constructor (paramName: string) {
        super(`Missing param: ${paramName}`)
        this.name = 'MissingParamError'
    }
}

export class ServerError extends Error {
    constructor(stack: string | undefined) {
        super('Internal server error')
        this.name = 'ServerError'
        this.stack = stack
    }
}

export class UnauthorizedError extends Error {
    constructor () {
        super('Unauthorized')
        this.name = 'UnauthorizedError'
    }
}

