import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Remplacez par l'URL de votre API, surtout en production

// Fonction générique pour récupérer des données
export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

// Fonction générique pour envoyer des données
export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données:", error);
    throw error;
  }
};

// Fonction générique pour mettre à jour des données
export const updateData = async (endpoint, data) => {
  try {
    const response = await axios.put(`${API_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données:", error);
    throw error;
  }
};

// Fonction générique pour supprimer des données
export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression des données:", error);
    throw error;
  }
};
