import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, ManyToOne } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { Users } from "src/auth/user.entity";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string
    @Column()
    description: string
    @Column()
    status: TaskStatus

    @ManyToOne(type => Users, user => user.tasks, { eager: false })
    user: Users
}