import {Controller} from "../../infrastructure/helpers/controller";
import {UploadImageController} from "../../infrastructure/entry-points/api-rest/upload-image-controller";
import {makeDbUploadImage} from "../../infrastructure/factories/upload-image-factory";

export const makeUploadImageController = (): Controller => {
    return new UploadImageController(makeDbUploadImage())
}