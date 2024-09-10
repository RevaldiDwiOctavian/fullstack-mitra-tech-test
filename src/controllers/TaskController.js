import * as taskService from "../services/TaskService.js"

async function createTask(req, res) {
    const {name, description} = req.body;
    const result = await taskService.createTask(name, description);
    res.json(result);
}

async function updateTask(req, res) {
    const {taskId} = req.params;
    const {name, description} = req.body;
    const result = await taskService.updateTask(taskId, name, description);
    res.json(result);
}

async function deleteTask(req, res) {
    const {taskId} = req.params;
    const result = await taskService.deleteTask(taskId);
    res.json(result);
}

async function getTask(req, res) {
    const {taskId} = req.params;
    const result = await taskService.getTask(taskId);
    res.json(result);

}

async function getTasks(req, res) {
    const result = await taskService.getTasks();
    res.json(result);
}

export {createTask, getTasks, updateTask, deleteTask, getTask};
