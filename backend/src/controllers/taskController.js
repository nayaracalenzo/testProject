const TaskService = require('../services/taskService');

const getAllTasks = async (req, res) => {
  const tasks = await TaskService.getAllTasks();
  res.json(tasks);
}

const getTask = async (req, res) => {
  const {id}= req.params
  const tasks = await TaskService.getTask(id);
  res.json(tasks);
}

const createTask = async (req, res) => {
  const { title } = req.body;
  if (title.trim() === "") console.log(title)
  const task = await TaskService.createTask(title);
  res.status(201).json(task);
}

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await TaskService.updateTask(id, req.body);
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json(task);
}

const deleteTask = async (req, res) => {
  const id = req.params.id;
  const deleted = await TaskService.deleteTask(id);
  if (!deleted) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json({ success: true });
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}