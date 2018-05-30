import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {MaxLength, MinLength} from "class-validator";
import {IsUserAlreadyExist} from "../util/validator/is-user-already-exist.constraint";
import {UserDetails} from "./user-details.model";
import {UserPushSettings} from "./user-push-settings.model";
import {UserStats} from "./user-stats.model";

@Entity({name: "user"})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'google_id', select: false})
    googleId: string;


    @MinLength(3, {
        message: "Nazwa musi zawierać minimum $constraint1 znaki"
    })
    @MaxLength(25, {
        message: "Nazwa może zawierać maksymalnie $constraint1 znaków"
    })
    @IsUserAlreadyExist({
        message: "Dziwka $value już istnieje"
    })
    @Column()
    username: string;




    @Column()
    email: string;

    @Column()
    language: string;

    @Column()
    country: string;


    @OneToOne(type => UserDetails, userDetails => userDetails.user, {eager: true, cascade: true})
        //@JoinColumn({ name: 'user_id' })
    userDetails: UserDetails;


    @OneToOne(type => UserPushSettings, userPushSettings => userPushSettings.user, {eager: true, cascade: true})
        //@JoinColumn({ name: 'user_id' })
    userPushSettings: UserPushSettings;

    @OneToOne(type => UserStats, userStats => userStats.user, {eager: true, cascade: true})
        //@JoinColumn({ name: 'user_id' })
    userStats: UserStats;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}