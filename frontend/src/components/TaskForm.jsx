import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';


const ADD_TASK = gql`
    mutation AddTask($title: String!, $description: String!) {
        addTask(title: $title, description: $description) {
            id
            title
            description
            completed
        }
    }
`;

const TaskForm = () => {
    const dispatch = useDispatch();
    const [addTaskMutation] = useMutation(ADD_TASK);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        if (title && description) {
            try {
                const { data } = await addTaskMutation({
                    variables: { title, description },
                });
                dispatch(addTask(data.addTask));
                e.target.reset();
            } catch (error) {
                console.error('Error adding task:', error.message);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form 
            onSubmit={handleSubmit} 
            role="form" 
            placeholder="Add a task" 
            className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add a New Task</h2>
            
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              className="block w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            
            <textarea
              name="description"
              placeholder="Task Description"
              className="block w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
            
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-200"
            >
              Add Task
            </button>
          </form>
        </div>
      );
      
    };
export default TaskForm;
