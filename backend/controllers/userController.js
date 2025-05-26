import * as userService from '../services/userService.js';

export const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

export const getUserByEmail = async (req, res) => {
  const user = await userService.getUserByEmail(req.params.email);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.createUser(email, password);
  res.status(201).json(user);
};

export const updateUser = async (req, res) => {
  const { nom, prenom, email, telephone } = req.body;
  const { id } = req.params;
  const user = await userService.updateUser(id, nom, prenom, email, telephone);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.json({ message: 'User deleted' });
};