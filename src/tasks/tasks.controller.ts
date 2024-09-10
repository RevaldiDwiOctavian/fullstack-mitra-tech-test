import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
import { TaskRequestDTO } from './dtos/task.request.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Get('/:taskId')
  async getTask(@Param('taskId') taskId: number): Promise<Task> {
    return this.tasksService.getTask(taskId);
  }

  @Post()
  async createTask(@Body() dto: TaskRequestDTO): Promise<Task> {
    return this.tasksService.createTask(dto);
  }

  @Put('/:taskId')
  async updateTask(
    @Param('taskId') taskId: number,
    @Body() dto: TaskRequestDTO,
  ): Promise<Task> {
    return this.tasksService.updateTask(taskId, dto);
  }

  @Delete('/:taskId')
  async deleteTask(@Param('taskId') taskId: number): Promise<void> {
    return this.tasksService.deleteTask(taskId);
  }
}
