'use client';

import Table from "@/app/components/Table";
import {createTasks, deleteTasks, getTasks, updateTasks} from "@/app/utils/ServiceApi";
import {useEffect, useState} from "react";
import Modal from "@/app/components/Modal";

export default function Home() {
    const [tableData, setTableData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<{ name: string; description: string }>({name: '', description: ''});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const tasks = await getTasks();
            setTableData(tasks);
        };

        fetchData();
    }, []);

    const handleAddTask = async (task: { name: string; description: string }) => {
        await createTasks(task).then(async () => {
            const tasks = await getTasks();
            setTableData(tasks);
        });
    };

    const handleUpdate = async (index: string, updatedTask: { name: string; description: string }) => {
        await updateTasks(index, updatedTask).then(async () => {
            const tasks = await getTasks();
            setTableData(tasks);
            setIsModalOpen(false);
        });
    };

    const handleSubmit = async (task: { name: string; description: string }) => {
        if (isEditing) {
            handleUpdate(editingIndex!, task);
        } else {
            handleAddTask(task);
        }
    }

    const handleDelete = async (index: string) => {
        await deleteTasks(index).then(async () => {
            const tasks = await getTasks();
            setTableData(tasks);
        });
    };

    const openEditModal = async (rowIndex: number) => {
        setIsEditing(true);
        const taskToEdit = await tableData[rowIndex];
        setEditingIndex(taskToEdit.id);
        setEditingTask({
            name: taskToEdit.name,
            description: taskToEdit.description
        });
        setIsModalOpen(true);
    };

    return (
        <>
            <div
                className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => setIsModalOpen(true)}>Add Task
                </button>
                {tableData ?
                    <Table data={tableData} onDelete={handleDelete} onUpdate={openEditModal}/> :
                    <h1>Loading....</h1>}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => {setIsModalOpen(false); setIsEditing(false); setEditingTask({name: '', description: ''})}}
                onSubmit={(task) => handleSubmit(task)}
                initialName={editingTask.name}
                initialDescription={editingTask.description}
            />
        </>
    );
}
