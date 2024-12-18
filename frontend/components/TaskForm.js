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
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                name="title"
                placeholder="Task Title"
                className="block w-full p-2 mb-2 border"
                required
            />
            <textarea
                name="description"
                placeholder="Task Description"
                className="block w-full p-2 mb-2 border"
                required
            ></textarea>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
