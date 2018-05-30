import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./user.model";

@Entity({name: "user_push_settings"})
export class UserPushSettings {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    smacking: number;

    @Column()
    message: number;

    @Column()
    comments: number;

    @Column({name: 'application_accepted'})
    applicationAccepted: number;

    @Column({name: 'selled_item'})
    selledItem: number;

    @Column({name: 'syndicate_forum'})
    syndicateForum: number;

    @OneToOne(type => User, user => user.userPushSettings)
    @JoinColumn({name: 'user_id'})
    user: User;


    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}