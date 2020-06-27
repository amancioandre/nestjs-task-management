import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get() 
    async getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO): Promise<Task[]> {
        return await this.tasksService.getTasks(filterDTO)
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
        return await this.tasksService.createTask(createTaskDTO)
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return await this.tasksService.getTaskById(id)
    }

    @Delete(':id')
    async deleteTaskById(@Param('id') id: string): Promise<void> {
        return await this.tasksService.deleteTaskById(id)
    }

    @Patch(':id/status')
    async updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return await this.tasksService.updateTaskStatusById(id, status)
    }
}
