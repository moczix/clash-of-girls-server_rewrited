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

@Entity({name: 'user_stats'})
export class UserStats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'pvp_win'})
    pvpWin: number;

    @Column({name: 'pvp_all'})
    pvpAll: number;

    @Column()
    clients: number;

    @OneToOne(type => User, user => user.userStats)
    @JoinColumn({name: 'user_id'})
    user: User;


    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}