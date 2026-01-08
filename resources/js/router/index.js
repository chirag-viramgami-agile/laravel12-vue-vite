import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { PERMISSIONS } from "@/constants/permissions";
import Dashboard from "@/pages/Dashboard.vue";
import Users from "@/pages/users/Index.vue";
import UserCreate from "@/pages/users/Create.vue";
import UserEdit from "@/pages/users/Edit.vue";
import { usePermissions } from "@/composables/usePermissions.js";

const routes = [
    // Home routes
    {
        path: "/",
        name: "home",
        component: () => import("@/pages/HomeView.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/pages/auth/Login.vue"),
        meta: { guest: true },
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/pages/auth/Register.vue"),
        meta: { guest: true },
    },
    {
        path: "/admin",
        component: () => import("@/layouts/AdminLayout.vue"),//parent layout with router-link
        meta: { requiresAuth: true },
        children: [
            {
                path: "",
                name: "admin.dashboard",
                component: Dashboard,
                meta: { permission: PERMISSIONS.VIEW_DASHBOARD },
            },
            {
                path: "users",
                meta: { permission: PERMISSIONS.MANAGE_USERS },
                children: [
                    {
                        path: "",
                        name: "user-list",
                        component: Users,
                    },
                    {
                        path: "create",
                        name: "user-create",
                        component: UserCreate,
                    },
                    {
                        path: "edit/:id",
                        name: "user-edit",
                        component: UserEdit,
                        props: true,
                    },
                ],
            },
            {
                path: "roles",
                meta: { permission: PERMISSIONS.MANAGE_ROLES },
                children: [
                    {
                        path: "",
                        name: "role-list",
                        component: ()=> import("@/pages/roles/Index.vue"),
                    },
                    {
                        path: "create",
                        name: "role-create",
                        component: ()=> import("@/pages/roles/Create.vue"),
                    },
                    {
                        path: "edit/:id",
                        name: "role-edit",
                        component: ()=> import("@/pages/roles/Edit.vue"),
                        props: true,
                    },
                ],
            },
        ],
    },

    // Fallback route
    { path: "/:catchAll(.*)", redirect: "/login" },
    { path: "/403", component: () => import("@/pages/Forbidden.vue") },
];

// Router Routes
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// middleware
router.beforeEach(async (to) => {
    const auth = useAuthStore();
    const { can } = usePermissions();
    // Do nothing until auth is resolved
    await auth.fetchUser();

    const requiredPermission = [...to.matched]
    .reverse()
    .map(r => r.meta.permission)
    .find(Boolean);

    // Guest-only routes (login)
    if (to.meta.guest && auth.isAuthenticated) {
        return "/admin";
    }

    // Protected routes
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return "/login";
    }

    // Permission-based UI guard
    if (to.meta.permission && !can(to.meta.permission)) {
        return "/403";
    }
});

export default router;
