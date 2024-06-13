import { createRouter,createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/:id?/about', name: 'About', component: ()=>import('@/views/About.vue'), props: true},
    {path: '/:id?/stats', name: 'Stats', component: ()=>import('@/views/StatsPage.vue'), props: true},
    {path: '/:id?/dashboard', name: 'Dashboard', component: ()=>import('@/views/DashboardPage.vue'), props: true},
    {path: '/:id?/blocks', name: 'Blocks', component: ()=>import('@/views/BlocksPage.vue'), props: true},
    {path: '/:id?/connect', name: 'Connect', component: ()=>import('@/views/ConnectPage.vue'), props: true},
    {path: '/:id?/miners', name : 'Miners', component: ()=>import('@/views/MinersPage.vue'), props: true},
    {path: '/:id?/payments', name : 'Payments', component: ()=>import('@/views/PaymentsPage.vue'), props: true},
    {path: '/:id?/support', name: 'Support', component: ()=>import('@/views/SupportPage.vue'), props: true},
]
const router = createRouter({
    history:createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
      },
})
export default router