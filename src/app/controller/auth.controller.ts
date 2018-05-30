import {
    body,
    Get,
    InjectRepository,
    param,
    Post,
    RequestMapping,
    response
} from "../../custom-rest/decorators/rest.decorator";
import {GoogleLogin} from "../util/google-login";
import {UserRepository} from "../repository/user.repository";
import {UserController} from "./user.controller";

@RequestMapping("/auth")
export class AuthController {


    @InjectRepository('UserRepository')
    private userRepository: UserRepository = null;

    @Get("/is-auth/:idToken")
    async isAuth(@param('idToken') idToken, @response() res) {
        const tokenData = await (new GoogleLogin()).extractDataFromToken(idToken);
        if (tokenData) {
            res.send({status: !!(await this.userRepository.findByGoogleId(tokenData.googleId))});
        }
        res.status(403).send();
    }

    @Post("/user")
    async createUser(@body() user: { idToken: string, username: string, language: string, country: string }, @response() res) {
        const tokenData = await (new GoogleLogin()).extractDataFromToken(user.idToken);
        if (tokenData) {
            await (new UserController()).createAccount(user.username, user.language, user.country, tokenData.email, tokenData.googleId, res)
        }
        res.status(403).send();
    }
}