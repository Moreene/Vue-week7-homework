import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: () => import('../views/LoginView.vue'),
        },
        {
            path: '/admin',
            component:() => import('../views/AdminView.vue'),
            children: [
                {
                    path: '',
                    component: () => import('../views/FrontPageView.vue')
                },
                {
                    path: 'products',
                    component: () => import('../views/ProductView.vue')
                },
                {
                    path: 'orders',
                    component: () => import('../views/OrderView.vue')
                }
            ]
        },
    ]
});

export default router
