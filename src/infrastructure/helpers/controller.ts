import {HttpRequest, HttpResponse} from "@/infrastructure/helpers/http";

export interface Controller {
    handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}