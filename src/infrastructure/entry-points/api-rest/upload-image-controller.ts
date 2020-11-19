import {Controller} from "../../../infrastructure/helpers/controller";
import {HttpRequest, HttpResponse, noContent, serverError} from "../../../infrastructure/helpers/http";
import {UploadImageService} from "@/domain/usecase/account-service";

export class UploadImageController implements Controller {

    constructor(
        private readonly uploadImageService: UploadImageService
    ) {
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const id  = httpRequest.params.id
            const avatar  = httpRequest.body.avatar
            await this.uploadImageService.uploadImage({ id, avatar })
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}