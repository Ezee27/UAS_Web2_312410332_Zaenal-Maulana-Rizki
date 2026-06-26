const { createRouter, createWebHashHistory } = VueRouter;
const { createApp } = Vue;

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { 
        path: '/admin', 
        component: Dashboard, 
        meta: { requiresAuth: true }, // Proteksi di tingkat induk
        children: [
            { path: '', redirect: 'books' }, // Redirect otomatis ke /admin/books jika akses /admin
            { path: 'books', component: Books }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Navigation Guard (Client-Side Security)
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // Memeriksa apakah ada rute atau rute induk yang membutuhkan autentikasi
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !isLoggedIn) {
        next('/login');
    } else if (to.path === '/login' && isLoggedIn) {
        next('/admin/books'); // Jika sudah login tapi mau ke halaman login, lempar ke dashboard
    } else {
        next();
    }
});

// Axios Interceptors (Otomatisasi Token)
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Axios Response Interceptor (Diperbarui Khusus Deteksi Rute)
axios.interceptors.response.use(
    response => response, 
    error => {
        if (error.response && error.response.status === 401) {
            
            // 1. JIKA sedang di endpoint login atau halaman login, biarkan ditangani Login.js
            if (error.config.url.includes('api/login') || router.currentRoute.value.path === '/login') {
                return Promise.reject(error);
            }
            
            // 2. JIKA error 401 terjadi saat berada di halaman publik biasa (Home), abaikan saja alert-nya
            if (router.currentRoute.value.path === '/') {
                return Promise.reject(error);
            }
            
            // 3. JIKA benar-benar sedang di dalam panel admin (/admin/...) lalu token hangus/invalid
            alert('Sesi Anda telah habis. Silakan login kembali.');
            localStorage.clear();
            window.location.hash = '/login'; 
        }
        return Promise.reject(error);
    }
);

const app = createApp({});
app.use(router);
app.mount('#app');