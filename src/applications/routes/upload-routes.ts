import {Router} from "express";
import {adaptRoute} from "../../applications/config/express-router-adapter";
import {makeUploadImageController} from "../../infrastructure/factories/upload-image-controller-factory";
import {authAdmin} from "../../applications/middlewares/auth";

export default (router: Router): void => {
    router.put('/upload/:id', authAdmin, adaptRoute(makeUploadImageController()))
}