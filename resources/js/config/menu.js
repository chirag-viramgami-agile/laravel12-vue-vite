import { PERMISSIONS } from "@/constants/permissions";

export const adminMenu = [
    {
        label: "Dashboard",
        to: "/admin",
        permission: PERMISSIONS.VIEW_DASHBOARD,
    },
    {
        label: "User Management",
        children: [
            {
                label: "Users",
                to: "/admin/users",
                permission: PERMISSIONS.USERS_VIEW,
            },
            {
                label: "Customer",
                to: "/admin/customer",
                permission: PERMISSIONS.CUSTOMERS_VIEW,
            },
        ],
    },
    {
        label: "Role Management",
        children: [
            {
                label: "Roles",
                to: "/admin/roles",
                permission: PERMISSIONS.ROLES_VIEW,
            },
        ],
    },
    // {
    //     label: "Users",
    //     to: "/admin/users",
    //     permission: PERMISSIONS.USERS_VIEW,
    // },
    // {
    //     label: "Roles",
    //     to: "/admin/roles",
    //     permission: PERMISSIONS.ROLES_VIEW,
    // },

    // {
    //     label: "CRM",
    //     children: [
    //         {
    //             label: "Customers",
    //             to: "/admin/customers",
    //             permission: PERMISSIONS.CUSTOMERS_VIEW,
    //         },
    //         {
    //             label: "Leads",
    //             to: "/admin/leads",
    //             permission: PERMISSIONS.LEADS_VIEW,
    //         },
    //     ],
    // },
];
