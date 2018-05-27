import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "members"})
export class User {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    login: string;
}