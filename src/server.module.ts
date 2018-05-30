import {UserController} from "./app/controller/user.controller";
import {AuthMiddleware} from "./app/middleware/auth.middleware";
import {User} from "./app/model/user.model";
import {UserRepository} from "./app/repository/user.repository";
import {AuthController} from "./app/controller/auth.controller";
import {UserStats} from "./app/model/user-stats.model";
import {UserPushSettings} from "./app/model/user-push-settings.model";
import {UserDetails} from "./app/model/user-details.model";

export const serverModule = {
    controllers: [AuthController, UserController],
    middlewares: [AuthMiddleware],
    models: [User, UserDetails, UserStats, UserPushSettings],
    repositories: [UserRepository]
}