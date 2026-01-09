import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { PERMISSIONS } from "@/constants/permissions";
import Dashboard from "@/pages/Dashboard.vue";
import Users from "@/pages/users/Index.vue";
import UserCreate from "@/pages/users/Create.vue";
import UserEdit from "@/pages/users/Edit.vue";

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
                children: [
                    {
                        path: "",
                        name: "user-list",
                        component: Users,
                        meta: { permission: PERMISSIONS.USERS_VIEW },
                    },
                    {
                        path: "create",
                        name: "user-create",
                        component: UserCreate,
                        meta: { permission: PERMISSIONS.USERS_CREATE },
                    },
                    {
                        path: "edit/:id",
                        name: "user-edit",
                        component: UserEdit,
                        meta: { permission: PERMISSIONS.USERS_UPDATE },
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
    // Do nothing until auth is resolved
    await auth.fetchUser();

    // Checks all parent/child permissions
    const requiredPermission = [...to.matched]
      .reverse()
      .map(r => r.meta.permission)
      .find(Boolean);

    // If we are heading to 403, "from" is our previous page
    if (to.path === '/403') {
        to.query.from = from.fullPath;
    }

    // Guest-only routes (login)
    if (to.meta.guest && auth.isAuthenticated) {
        return "/admin";
    }

    // Protected routes
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return "/login";
    }
    // Permission-based UI guard
    if (requiredPermission && !auth.can(requiredPermission)) {
        return "/403";
    }
});

export default router;
