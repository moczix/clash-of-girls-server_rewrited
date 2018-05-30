import {Repository} from "typeorm/repository/Repository";
import {getConnection} from "typeorm";

export class BaseRepository<T> {
    protected repo: Repository<T>;

    constructor(repo: (new () => T)) {
        this.repo = getConnection().getRepository(repo)
    }

}