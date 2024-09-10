import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { TaskRequestDTO } from './dtos/task.request.dto';

@Injectable()
export class TasksService {
  constructor(private dbService: PrismaService) {}

  async getTasks(): Promise<Task[]> {
    return this.dbService.task.findMany();
  }

  async getTask(id: number): Promise<Task> {
    const result = await this.dbService.task.findUnique({
      where: { id: Number(id) },
    });

    if (!result) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return result;
  }

  async createTask(dto: TaskRequestDTO): Promise<Task> {
    const { name, description } = dto;
    return this.dbService.task.create({
      data: {
        name,
        description,
      },
    });
  }

  async updateTask(id: number, dto: TaskRequestDTO): Promise<Task> {
    const { name, description } = dto;

    const isExist = await this.getTask(id);

    if (!isExist) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.dbService.task.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
      },
    });
  }

  async deleteTask(id: number): Promise<void> {
    await this.dbService.task.delete({
      where: { id: Number(id) },
    });
  }
}
