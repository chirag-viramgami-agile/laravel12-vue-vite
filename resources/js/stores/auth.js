import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
    // state
    const user = ref(null);
    const initialized = ref(false); // has hydration been attempted?
    const loading = ref(false); // is a request in progress?

    // getters
    const isAuthenticated = computed(() => !!user.value);
    const roles = computed(() => user.value?.roles ?? []);
    const permissions = computed(() => user.value?.permissions ?? []);

    const hasRole = (role) => {
        // return true;
        return roles.value.includes(role);
    };

    const can = (permission) => {
        return permissions.value.includes(permission);
    };

    // actions
    const fetchUser = async () => {
        if (initialized.value || loading.value) return;
        loading.value = true;

        try {
            const res = await axios.get("/api/me", { skipAuthRedirectForLogin: true });
            user.value = res.data;
        } catch (err) {
            user.value = null;
        } finally {
            initialized.value = true;
            loading.value = false;
        }
    };

    const login = async (email, password) => {
        // Sanctum requirement
        await axios.get("/sanctum/csrf-cookie");
        const { data } = await axios.post("/api/login", { email, password });

        user.value = data.user;
        initialized.value = true;
    };

    const register = async (data) => {
        await axios.get("/sanctum/csrf-cookie");
        await axios.post("/api/register", data);
        await fetchUser();
    };

    const logout = async () => {
        await axios.post("/api/logout");
        user.value = null;
        initialized.value = false;
    };

    return {
        // state
        user,
        initialized,

        // getters
        isAuthenticated,
        roles,
        hasRole,
        can,

        // actions
        fetchUser,
        login,
        register,
        logout,
    };
});
