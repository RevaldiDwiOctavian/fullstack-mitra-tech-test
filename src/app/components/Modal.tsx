'use client';

import React, {useEffect, useState} from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: { name: string, description: string }) => void;
    initialName?: string;
    initialDescription?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, initialDescription, initialName }) => {
    const [formData, setFormData] = useState({ name: '', description: '' });

    useEffect(() => {
       if (initialName != null && initialDescription != null) {
           setFormData({
               name: initialName,
               description: initialDescription,
           })
       }
    }, [initialDescription, initialName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', description: '' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Task Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
