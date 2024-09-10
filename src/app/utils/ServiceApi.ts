import axios from 'axios';

const API_URL = "http://localhost:8000/api";

export const getTasks = async () => {
    return await axios.get(`${API_URL}/tasks`).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export const getTask = async (taskId: string) => {
    return await axios.get(`${API_URL}/tasks/${taskId}`).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export const createTasks = async (data: any) => {
    return await axios.post(`${API_URL}/tasks`, data).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export const updateTasks = async (taskId: string, data: any) => {
    return await axios.put(`${API_URL}/tasks/${taskId}`, data).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export const deleteTasks = async (taskId: string) => {
    return await axios.delete(`${API_URL}/tasks/${taskId}`).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}