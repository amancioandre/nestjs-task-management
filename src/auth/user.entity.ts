import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    password: string
}