import {createWebHistory, createRouter} from 'vue-router'
import Index from "../views/Index.vue";
const routes = [
    {
        path:"/",
        component:Index
        // child
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router