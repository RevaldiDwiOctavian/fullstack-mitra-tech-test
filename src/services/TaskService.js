import prisma from '../prisma.js';

async function createTask(name, description) {
    try {
        return await prisma.task.create({
            data: {
                name,
                description,
            },
        });
    } catch (error) {
        console.error('Error creating task:', error);
        throw new Error('Failed to create task. Please try again later.');
    }
}

async function getTasks() {
    try {
        return await prisma.task.findMany();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Failed to fetch tasks. Please try again later.');
    }
}

async function getTask(taskId) {
    try {
        const result = await prisma.task.findUnique({
            where: {
                id: Number(taskId),
            },
        });

        if (result) {
            return result;
        } else {
            return {error: 'Task not found'};
        }
    } catch (error) {
        console.error('Error fetching task:', error);
        throw new Error('Failed to fetch task. Please try again later.');
    }
}

async function updateTask(taskId, name, description) {
    try {
        const result = await prisma.task.findUnique({
            where: {
                id: Number(taskId),
            },
        });

        if (!result) {
            return {error: 'Task not found'};
        }

        return await prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data: {
                name,
                description,
            },
        });
    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Failed to update task. Please try again later.');
    }
}

async function deleteTask(taskId) {

    try {
        const result = await prisma.task.findUnique({
            where: {
                id: Number(taskId),
            },
        });

        if (!result) {
            return {error: 'Task not found'};
        }

        await prisma.task.delete({
            where: {
                id: Number(taskId),
            },
        });
        return 'Task successfully deleted';
    } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('Failed to delete task. Please try again later.');
    }
}

export { createTask, updateTask, getTasks, getTask, deleteTask };
