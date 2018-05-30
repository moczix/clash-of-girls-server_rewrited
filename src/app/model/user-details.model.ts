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

@Entity({name: "user_details"})
export class UserDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    level: number;

    @Column()
    trashing: number;

    @Column({name: 'trashing_max'})
    trashingMax: number;

    @Column()
    desire: number;

    @Column({name: 'desire_max'})
    desireMax: number;

    @Column()
    tiredness: number;

    @Column({name: 'tiredness_max'})
    tirednessMax: number;

    @Column()
    smacking: number;

    @Column({name: 'current_location'})
    currentLocation: number;


    @OneToOne(type => User, user => user.userDetails)
    @JoinColumn({name: 'user_id'})
    user: User;


    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}