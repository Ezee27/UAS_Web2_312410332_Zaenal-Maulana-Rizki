const Dashboard = {
    template: `
        <div>
            <div class="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <h2 class="text-3xl font-bold text-slate-800 tracking-tight">HALAMAN ADMIN JEBOOK 📚</h2>
                    <p class="text-sm text-slate-500 mt-1">Kelola database katalog, anggota, dan sistem peminjaman secara realtime.</p>
                </div>
                <button @click="logout" class="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition shadow-sm">
                    🚪 Keluar (Logout)
                </button>
            </div>

            <div class="flex gap-2 border-b border-slate-200 mb-6 text-sm font-medium">
                <button @click="currentTab = 'books'" :class="currentTab === 'books' ? 'border-emerald-600 text-emerald-600 border-b-2' : 'text-slate-500 hover:text-slate-700'" class="px-4 py-2.5 transition">
                    📖 Data Buku & Penerbit
                </button>
                <button @click="currentTab = 'members'" :class="currentTab === 'members' ? 'border-emerald-600 text-emerald-600 border-b-2' : 'text-slate-500 hover:text-slate-700'" class="px-4 py-2.5 transition">
                    👥 Anggota Perpustakaan
                </button>
                <button @click="currentTab = 'rentals'" :class="currentTab === 'rentals' ? 'border-emerald-600 text-emerald-600 border-b-2' : 'text-slate-500 hover:text-slate-700'" class="px-4 py-2.5 transition">
                    ⏳ Status Peminjaman
                </button>
            </div>

            <div v-if="currentTab === 'books'">
                <button @click="openAddModal" class="mb-6 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition">
                    + Tambah Buku Baru
                </button>

                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50/70 text-slate-400 border-b text-xs uppercase tracking-wider font-bold">
                                <th class="p-4">Cover</th>
                                <th class="p-4">Buku & Penulis</th>
                                <th class="p-4">Genre / Kategori</th>
                                <th class="p-4">Penerbit</th>
                                <th class="p-4">Status</th>
                                <th class="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm">
                            <tr v-for="book in books" :key="book.id" class="hover:bg-slate-50/40 transition">
                                <td class="p-4"><img :src="book.image_url" class="w-10 h-14 object-cover rounded bg-slate-100" /></td>
                                <td class="p-4">
                                    <div class="font-bold text-slate-800">{{ book.title }}</div>
                                    <div class="text-xs text-slate-400 mt-0.5">Oleh: {{ book.author }}</div>
                                </td>
                                <td class="p-4"><span class="px-2.5 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">{{ book.genre }}</span></td>
                                <td class="p-4 text-slate-500">{{ book.publisher }}</td>
                                <td class="p-4">
                                    <span :class="book.status === 'Tersedia' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'" class="px-2.5 py-1 rounded text-xs font-semibold">
                                        {{ book.status }}
                                    </span>
                                </td>
                                <td class="p-4 text-center">
                                    <div class="flex justify-center gap-3 text-xs font-bold">
                                        <button @click="openEditModal(book)" class="text-emerald-600 hover:text-emerald-800">Edit</button>
                                        <button @click="deleteBook(book.id)" class="text-rose-600 hover:text-rose-800">Hapus</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="currentTab === 'members'">
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50/70 text-slate-400 border-b text-xs uppercase tracking-wider font-bold">
                                <th class="p-4">ID Anggota</th>
                                <th class="p-4">Nama Lengkap</th>
                                <th class="p-4">Email</th>
                                <th class="p-4">Status Akun</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm">
                            <tr v-for="rent in rentals" :key="rent.rental_id" class="hover:bg-slate-50/40 transition">
                                <td class="p-4 text-slate-400 font-mono">#{{ rent.rental_id }}</td>
                                <td class="p-4 font-bold text-slate-800">{{ rent.member_name }}</td>
                                <td class="p-4 text-slate-500">{{ rent.member_email }}</td>
                                <td class="p-4">
                                    <span class="px-2.5 py-1 bg-blue-50 text-blue-600 rounded text-xs font-semibold">Aktif</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="currentTab === 'rentals'">
                <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50/70 text-slate-400 border-b text-xs uppercase tracking-wider font-bold">
                                <th class="p-4">Buku</th>
                                <th class="p-4">Peminjam</th>
                                <th class="p-4">Tgl Kembali</th>
                                <th class="p-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm">
                            <tr v-for="rent in rentals" :key="rent.rental_id" class="hover:bg-slate-50/40 transition">
                                <td class="p-4 font-bold text-slate-800">{{ rent.title || 'Judul Tidak Diketahui' }}</td>
                                <td class="p-4 text-slate-600">{{ rent.member_name }}</td>
                                <td class="p-4 text-slate-500 font-mono">{{ rent.return_date }}</td>
                                <td class="p-4 text-center">
                                    <span :class="rent.rental_status === 'Aktif' ? 'text-amber-600 bg-amber-50' : 'text-green-600 bg-green-50'" class="px-2.5 py-1 rounded text-xs font-semibold">
                                        {{ rent.rental_status === 'Aktif' ? 'Dipinjam' : 'Dikembalikan' }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                    <h3 class="text-xl font-bold mb-4 text-slate-800">{{ isEdit ? 'Edit Buku' : 'Tambah Buku Baru' }}</h3>
                    <form @submit.prevent="saveBook">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Judul Buku</label>
                                <input type="text" v-model="form.title" required class="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                            <div>
                                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Genre</label>
                                <input type="text" v-model="form.genre" required class="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Penulis</label>
                                <input type="text" v-model="form.author" required class="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                            <div>
                                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Penerbit</label>
                                <input type="text" v-model="form.publisher" required class="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">URL Cover Gambar</label>
                            <input type="text" v-model="form.image_url" required class="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Sinopsis Cerita</label>
                            <textarea v-model="form.synopsis" rows="3" required class="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                        </div>
                        <div class="flex justify-end gap-2 mt-6">
                            <button type="button" @click="showModal = false" class="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold shadow-sm">Simpan Data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            currentTab: 'books',
            books: [],
            rentals: [],
            showModal: false,
            isEdit: false,
            currentId: null,
            form: { title: '', genre: '', author: '', publisher: '', image_url: '', synopsis: '' }
        }
    },
    mounted() { 
        this.fetchBooks(); 
        this.fetchRentals();
        this.toggleOuterNavbar(false);
    },
    unmounted() {
        this.toggleOuterNavbar(true);
    },
    methods: {
        toggleOuterNavbar(show) {
            const elements = document.querySelectorAll('a, button, div, span');
            elements.forEach(el => {
                const text = el.textContent.trim();
                if (text === 'Beranda' || text === 'Daftar Pinjam') {
                    el.style.display = show ? 'inline-block' : 'none';
                }
            });
        },
        fetchBooks() {
            axios.get(`${API_URL}/books`).then(res => { this.books = res.data; });
        },
        fetchRentals() {
            axios.get(`${API_URL}/rentals`).then(res => { this.rentals = res.data; });
        },
        openAddModal() {
            this.isEdit = false;
            this.form = { title: '', genre: '', author: '', publisher: '', image_url: '', synopsis: '' };
            this.showModal = true;
        },
        openEditModal(book) {
            this.isEdit = true;
            this.currentId = book.id;
            this.form = { ...book };
            this.showModal = true;
        },
        saveBook() {
            if (this.isEdit) {
                axios.put(`${API_URL}/books/${this.currentId}`, this.form).then(res => {
                    alert(res.data.message);
                    this.showModal = false;
                    this.fetchBooks();
                });
            } else {
                axios.post(`${API_URL}/books`, this.form).then(res => {
                    alert(res.data.message);
                    this.showModal = false;
                    this.fetchBooks();
                });
            }
        },
        deleteBook(id) {
            if (confirm("Apakah Anda yakin ingin menghapus data buku master ini?")) {
                axios.delete(`${API_URL}/books/${id}`).then(res => {
                    alert(res.data.message);
                    this.fetchBooks();
                });
            }
        },
        logout() {
            localStorage.clear();
            this.toggleOuterNavbar(true);
            
            // 🔥 PERBAIKAN: Fungsi alert() sukses dihapus total agar langsung pindah halaman ke /login
            window.location.hash = "/login";
        }
    }
};