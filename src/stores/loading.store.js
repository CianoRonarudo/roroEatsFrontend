import { defineStore } from "pinia"
import { markRaw } from "vue"

export const useLoadingStore = defineStore('loading', {
    state: () => ({
        isLoading: false,
        loaderComponent: null
    }),
    actions: {
        showLoader() {
            if (!this.isLoading) {
                this.isLoading = true
                import('@/components/ui/RouteLoading.vue').then(module => {
                    this.loaderComponent = markRaw(module.default)
                })
            }
        },
        hideLoader() {
            this.isLoading = false
            this.loaderComponent = null
        }
    }
})