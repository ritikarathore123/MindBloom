import axios from 'axios';


const API = axios.create({
  baseURL: 'https://mindbloom-backend-00pi.onrender.com/api',
  withCredentials: true,

  timeout: 10000, 
});



export const authAPI = {
  register: (userData) => API.post('/user/register', userData),
  login: (credentials) => {
    console.log("API - Login request data:", credentials);
    return API.post('/user/login', credentials);
  },
  logout: () => API.post('/user/logout'),
  getProfile: () => API.get('/user/profile'),
  deleteAccount: () => API.delete('/user/delete'),
   updateProfile: (data) => API.put("/user/profile", data),
};





export const journalAPI = {
  getEntries: () => API.get('/journal'), // no userId
  createEntry: (entryData) => API.post('/journal', entryData),
  
  deleteEntry: (id) => API.delete(`/journal/${id}`),
  
};

export const meditationAPI = {
  getSessions: () => API.get('/meditation'),
  
};


export const musicAPI = {
  getTracks: () => API.get('/music'),
  
};


export const exerciseAPI = {
  getExercises: () => API.get('/exercise'),
  
};


export const resourceAPI = {
  getResources: () => API.get('/resource'),
 
};


export const contentAPI = {

  getContentByType: (type) => API.get(`/content/type/${type}`),
  createContent: (data) => API.post('/content', data),
  updateContent: (id, data) => API.put(`/content/${id}`, data),
  deleteContent: (id) => API.delete(`/content/${id}`),
};



export const scoreAPI = {
  getScoreByRange: (score) => API.get(`/score/range/${score}`),
  createScores: (data) => API.post('/score', data),
  submitUserScore: (score) => API.post('/score/submit', { score }),
};
export default API;
