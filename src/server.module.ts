import {UserController} from "./app/controller/user.controller";
import {AuthMiddleware} from "./app/middleware/auth.middleware";
import {User} from "./app/model/user.model";
import {UserRepository} from "./app/repository/user.repository";

export const serverModule = {
    controllers: [UserController],
    middlewares: [AuthMiddleware],
    models: [User],
    repositories: [UserRepository]
}