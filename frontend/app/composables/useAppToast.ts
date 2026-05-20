import { useToast } from "@nuxt/ui/runtime/composables/useToast.js"

export const useAppToast = () => {
    const toast = useToast()

    const success = (title: string, description: string) => {
        toast.add({
            title,
            description,
            color: 'success'
        })
    }

    const error = (title: string, description: string) => {
        toast.add({
            title,
            description,
            color: 'error'
        })
    }

    const warning = (title: string, description: string) => {
        toast.add({
            title,
            description,
            color: 'warning'
        })
    }

    return {
        success,
        error,
        warning
    }
}