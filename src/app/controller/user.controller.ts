import {
    Get,
    response,
    param,
    RequestMapping,
    InjectRepository
} from '../../custom-rest/decorators/rest.decorator';
import {UserRepository} from "../repository/user.repository";

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



}