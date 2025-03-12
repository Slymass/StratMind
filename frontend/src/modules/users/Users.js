// src/modules/users/users.js

import { postData, updateData, deleteData, fetchData } from '../../services/apiServices';

export const getUsers = async () => {
  const data = await fetchData("/users");
  return data;
};

export const createUser = async (userData) => {
  const data = await postData("/users", userData);
  return data;
};

export const updateUser = async (userId, userData) => {
  const data = await updateData(`/users/${userId}`, userData);
  return data;
};

export const deleteUser = async (userId) => {
  const data = await deleteData(`/users/${userId}`);
  return data;
};
