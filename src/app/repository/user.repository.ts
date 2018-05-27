import {getConnection} from "typeorm";
import {User} from "../model/user.model";
import {Repository} from "typeorm/repository/Repository";
import {RestRepository} from "../../custom-rest/decorators/rest.decorator";

@RestRepository()
export class UserRepository {

    private repo: Repository<User>;

    constructor() {
        this.repo = getConnection().getRepository(User)
    }

    findAll(): Promise<Array<User>> {
        return this.repo.find();
    }

}