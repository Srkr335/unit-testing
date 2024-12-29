import React from 'react';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, deleteTask, toggleTaskCompletion } from '../store/tasksSlice';

const GET_TASKS = gql`
    query GetTasks {
        tasks {
            id
            title
            description
            completed
        }
    }
`;

const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id)
    }
`;

const TOGGLE_TASK_COMPLETION = gql`
    mutation ToggleTaskCompletion($id: ID!) {
        toggleTaskCompletion(id: $id) {
            id
            completed
        }
    }
`;

const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const { data, loading } = useQuery(GET_TASKS);
    const [deleteTaskMutation] = useMutation(DELETE_TASK);
    const [toggleCompletionMutation] = useMutation(TOGGLE_TASK_COMPLETION);

    useEffect(() => {
        if (data) dispatch(setTasks(data.tasks));
    }, [data, dispatch]);

    const handleDelete = async (id) => {
        await deleteTaskMutation({ variables: { id } });
        dispatch(deleteTask(id));
    };

    const handleToggleCompletion = async (id) => {
        const { data } = await toggleCompletionMutation({ variables: { id } });
        dispatch(toggleTaskCompletion(data.toggleTaskCompletion.id));
    };

    if (loading) return <p>Loading...</p>;

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} className="flex justify-between items-center p-2 border-b">
                    <div>
                        <h3 className={task.completed ? 'line-through' : ''}>{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                    <div>
                        <button
                            onClick={() => handleToggleCompletion(task.id)}
                            className={`px-2 py-1 ${task.completed ? 'bg-green-500' : 'bg-gray-500'} text-white rounded`}
                        >
                            {task.completed ? 'Completed' : 'Complete'}
                        </button>
                        <button
                            onClick={() => handleDelete(task.id)}
                            className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
