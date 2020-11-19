import {HttpRequest, HttpResponse} from "@/infrastructure/helpers/http";

export interface MiddlewareInterface {
    handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}