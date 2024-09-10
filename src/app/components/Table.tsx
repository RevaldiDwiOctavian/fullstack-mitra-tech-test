'use client';

import {FaTrash, FaEdit} from 'react-icons/fa';
import Modal from "@/app/components/Modal";

interface Props {
    data: any;
    onDelete: (rowIndex: string) => void;
    onUpdate: (rowIndex: number) => void;
}

const Table: React.FC<Props> = ({data, onUpdate, onDelete}) => {

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            {data.length === 0 ? (
                <h1>No Data</h1>
                ) : (
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr className="bg-gray-200">
                        {Object.keys(data[0]).map((key, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </th>
                        ))}
                        <th className="border border-gray-300 px-4 py-2">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : ""}>
                            {Object.values(row).map((value, colIndex) => (
                                <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                    {value}
                                </td>
                            ))}
                            <td className="border border-gray-300 px-4 py-2  space-x-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => onUpdate(rowIndex)}
                                >
                                    <FaEdit/>
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => onDelete(row.id)}
                                >
                                    <FaTrash/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Table;
