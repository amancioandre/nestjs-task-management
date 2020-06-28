import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import { Task } from "src/tasks/task.entity";

@Entity()
@Unique(['username'])
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[]
}