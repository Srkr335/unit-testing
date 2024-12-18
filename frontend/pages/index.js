import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow rounded">
            <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
            <TaskForm />
            <TaskList />
        </div>
    );
}
