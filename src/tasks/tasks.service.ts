import { v1 as uuid } from 'uuid'

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task-dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks
    }

    createTask(createTaskDTO: CreateTaskDTO): Task {
        const { title, description } = createTaskDTO
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find((task) => task.id === id)
        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found.`)
        }
        return found
    }

    deleteTaskById(id: string): void {
        this.getTaskById(id)
        const taskIndex = this.tasks.findIndex((task) => task.id === id)
        this.tasks.splice(taskIndex, 1)
    }

    updateTaskStatusById(id: string, status: TaskStatus): Task {
        const foundTask = this.getTaskById(id)
        foundTask.status = status
        return foundTask
    }

    getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
        const { status, search } = filterDTO

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }

        return tasks
    }
}
