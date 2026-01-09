import { computed,shallowRef, watch  } from "vue";
import { adminMenu } from "@/config/menu";
import { useAuthStore } from "@/stores/auth";

export function useMenu() {
    const auth = useAuthStore();

    // Optional caching
    const cachedMenu = shallowRef([]);
    const permissionHash = computed(() =>
        auth.permissions.slice().sort().join("|")
    );
    // End caching

    const filterMenu = (items) =>
        items
            .map((item) => {
                if (item.children) {
                    const children = filterMenu(item.children);
                    if (children.length === 0) return null;
                    return { ...item, children };
                }

                if (!item.permission) return item;
                return auth.can(item.permission) ? item : null;
            })
            .filter(Boolean);

    // const menu = computed(() => filterMenu(adminMenu));


    watch(
        permissionHash,
        () => {
            cachedMenu.value = filterMenu(adminMenu);
        },
        { immediate: true }
    );
    const menu = computed(() => filterMenu(cachedMenu.value));

    return { menu };
}
