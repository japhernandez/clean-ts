import {Router} from "express";
import {adaptRoute} from "../config/express-router-adapter";
import {makeSignUpController} from "../../infrastructure/factories/signup-controller-factory";
import {makeLoginController} from "../../infrastructure/factories/login-controller-factory";
import {authAdmin} from "../../applications/middlewares/auth";

export default (router: Router): void => {
    router.post('/signup', authAdmin, adaptRoute(makeSignUpController()))
    router.post('/login', adaptRoute(makeLoginController()))
}