import { Prisma } from '@prisma/client';

export class Tasks implements Prisma.TaskCreateInput {
  id: number;
  name: string;
  description?: string;
}
