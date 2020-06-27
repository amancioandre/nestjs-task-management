import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository
        ) {}
    async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDTO)
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDTO)
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOne({ id })

        if (!found) {
            throw new NotFoundException(`Task with id ${id}`)
        }
        return found
    }

    async deleteTaskById(id: string): Promise<void> {
        const result = await this.taskRepository.delete(id)

        if (result.affected === 0) {
            throw new NotFoundException(`Task with id ${id}`)
        }
    }

    async updateTaskStatusById(id: string, status: TaskStatus): Promise<any> {
        await this.taskRepository.update(id, { status })
    }
}
