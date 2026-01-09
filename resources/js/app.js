import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'
import { useAuthStore } from "@/stores/auth";

import './bootstrap'; //← GLOBAL axios + sanctum setup
const app = createApp(App)

app.use(createPinia())
app.use(router)

// 🔑 Add global $can helper
app.config.globalProperties.$can = (permission) => {
  const auth = useAuthStore();
  return auth.can(permission);
};
app.config.globalProperties.$canAny = (permissions) => {
  const auth = useAuthStore();
  return permissions.some(auth.can);
};

app.mount('#app')
