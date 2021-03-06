import {MiddlewareInterface} from "@/infrastructure/security/middleware/middleware-interface";
import {NextFunction, Request, Response} from "express";
import {HttpRequest} from "@/infrastructure/helpers/http";

export const adaptMiddleware = (middleware: MiddlewareInterface) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest: HttpRequest = { headers: req.headers }
        const httpResponse = await middleware.handle(httpRequest)

        if (httpResponse.statusCode === 200) {
            Object.assign(req, httpResponse.body)
            next()
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            })
        }
    }
}