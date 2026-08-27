import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm";
import { User } from "./Users";

@Entity ("situations")
export class Situation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nameSituation!: string;

    @OneToMany(() => User, (user) => user.situation)
    users!: User[];

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt!: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updatedAt!: number;
}