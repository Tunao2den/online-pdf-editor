import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from '@/pages/WelcomePage.vue';

const routes = [
    { path: '/', redirect: '/welcome' },
    { path: '/welcome', component: WelcomePage }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
