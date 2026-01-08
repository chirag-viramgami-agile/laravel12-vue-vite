import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

export function usePermissions() {
  const auth = useAuthStore()

  const can = (permission) =>
    computed(() => auth.can(permission))

  const canAny = (permissions) =>
    computed(() => permissions.some(p => auth.permissions.includes(p)))

  return { can, canAny }
}
