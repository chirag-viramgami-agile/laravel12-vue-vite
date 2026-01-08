import axios from 'axios';
import { useAuthStore } from './stores/auth';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

axios.interceptors.response.use(
  r => r,
  e => {
    if (e.config?.skipAuthRedirectForLogin) {
      return Promise.reject(e);
    }

    if (e.response?.status === 401) {
      const auth = useAuthStore();
      auth.logout();
      window.location.href = '/login';
    }

    if (e.response?.status === 403) {
      window.location.href = '/403';
    }


    return Promise.reject(e);
  }
);


export default axios;
