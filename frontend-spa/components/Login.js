const Login = {
    template: `
        <div class="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            <h2 class="text-2xl font-bold text-center text-slate-800 mb-2">Login Admin Jeebook</h2>
            <p class="text-sm text-center text-slate-400 mb-8">Username [admin] Password [admin123]</p>
            
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1 text-slate-600">Username</label>
                    <input type="text" v-model="username" required placeholder="admin" class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-1 text-slate-600">Password</label>
                    <input type="password" v-model="password" required placeholder="••••••••" class="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition shadow-md">
                    Masuk ke Dashboard
                </button>
            </form>
        </div>
    `,
    data() { return { username: '', password: '' } },
    methods: {
        handleLogin() {
            axios.post(`${API_URL}/login`, {
                username: this.username,
                password: this.password
            })
            .then(res => {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('token', res.data.token);
                
                // 🔥 PERBAIKAN: Fungsi alert() sukses dihapus total agar langsung auto-redirect ke admin panel
                window.location.hash = "/dashboard";
            })
            .catch(err => {
                // Untuk kondisi gagal/salah password tetap dipertahankan alert-nya supaya tahu kalau keliru mengetik
                alert("Login gagal! Periksa username & password.");
            });
        }
    }
};