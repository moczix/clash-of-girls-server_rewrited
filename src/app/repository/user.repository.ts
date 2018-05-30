import {User} from "../model/user.model";
import {RestRepository} from "../../custom-rest/decorators/rest.decorator";
import {BaseRepository} from "./base.repository";


@RestRepository()
export class UserRepository extends BaseRepository<User> {

    constructor() {
        super(User)
    }

    findByGoogleId(googleId: string): Promise<User> {
        return this.repo.findOne({googleId: googleId})
    }

    findOneByUsername(username: string) {
        return this.repo.findOne({username: username})
    }

    findAll(): Promise<Array<User>> {
        return this.repo.find();
    }

    save(user: User): Promise<User> {
        return this.repo.save(user);
    }

}