import axios from "axios";

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL:API_URL
});

//interceptor
api.interceptors.request.use((config) => {
    const userId = localStorage.getItem('userId');
    if(userId) {
        config.headers['X-User-ID'] = userId;
    }
    return config;
});

export const getActivities = () => api.get("/activities");
export const addActivity = (activity) => api.post("/activity", activity);
export const getActivityDetail = () => api.get("/recommendations/activity/${id}");