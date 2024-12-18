const Task = require('../models/Task');

const resolvers = {
    Query: {
        tasks: async () => await Task.find(),
    },
    Mutation: {
        addTask: async (_, { title, description }) => {
            if (!title || !description) throw new Error('Title and description are required!');
            const newTask = new Task({ title, description });
            return await newTask.save();
        },
        deleteTask: async (_, { id }) => {
            await Task.findByIdAndDelete(id);
            return 'Task deleted successfully';
        },
        toggleTaskCompletion: async (_, { id }) => {
            const task = await Task.findById(id);
            task.completed = !task.completed;
            await task.save();
            return task;
        },
        updateTask: async (_, { id, title, description }) => {
            if (!title || !description) throw new Error('Title and description are required!');
            const task = await Task.findByIdAndUpdate(
                id,
                { title, description },
                { new: true }
            );
            return task;
        },
    },
};

module.exports = resolvers;
