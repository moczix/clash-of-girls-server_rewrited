import {Get, InjectRepository, param, RequestMapping, response} from '../../custom-rest/decorators/rest.decorator';
import {UserRepository} from "../repository/user.repository";
import {User} from "../model/user.model";
import {UserDetails} from "../model/user-details.model";
import {UserPushSettings} from "../model/user-push-settings.model";
import {UserStats} from "../model/user-stats.model";
import {validate} from "class-validator";

// @Authenticated()
@RequestMapping("/")
export class UserController {

    @InjectRepository('UserRepository')
    private userRepository: UserRepository = null;


    @Get("test2/:id")
    async test2(@param('id') id: number, @response() res) {
        console.log(id);
        const object = await this.userRepository.findAll();
        res.send(object)
    }


    async createAccount(username: string, language: string, country: string, email: string, googleId: string, res) {
        const userRepository = new UserRepository();
        const user = new User();
        user.username = username;
        user.country = country;
        user.language = language;
        user.email = email;
        user.googleId = googleId;


        const userDetails = new UserDetails();
        userDetails.level = 1;
        userDetails.trashing = 5;
        userDetails.trashingMax = 5;
        userDetails.desire = 20;
        userDetails.desireMax = 20;
        userDetails.tiredness = 100;
        userDetails.tirednessMax = 100;
        userDetails.smacking = 1;
        userDetails.currentLocation = 1;

        const userPushSettings = new UserPushSettings();
        userPushSettings.smacking = 1;
        userPushSettings.comments = 1;
        userPushSettings.message = 1;
        userPushSettings.selledItem = 1;
        userPushSettings.syndicateForum = 1;
        userPushSettings.applicationAccepted = 1;

        user.userDetails = userDetails;
        user.userPushSettings = userPushSettings;
        user.userStats = new UserStats();

        let errors;
        if ((errors = await validate(user))) {
            res.status(403).send(errors);
        } else {
            res.send(await userRepository.save(user));
        }
    }
}