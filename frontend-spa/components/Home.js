const Home = {
    template: `
        <div>
            <div class="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-white shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between">
                <div class="mb-6 md:mb-0 max-w-xl">
                    <h1 class="text-4xl font-extrabold mb-4">Selamat Datang di JEBOOK</h1>
                    <p class="text-emerald-100 text-lg">Pinjam komik dan buku digital favoritmu dengan mudah, cepat, tanpa ribet dalam hitungan detik.</p>
                </div>
                <div class="text-6xl hidden md:block">📖✨</div>
            </div>

            <div class="mb-8 max-w-md mx-auto">
                <div class="relative">
                    <input type="text" v-model="search" placeholder="Cari judul buku atau penulis..." class="w-full px-5 py-3 rounded-xl border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <span class="absolute right-4 top-3.5 text-slate-400">🔍</span>
                </div>
            </div>

            <h2 class="text-2xl font-bold text-slate-800 mb-6">Koleksi Buku Terbaru</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="book in filteredBooks" :key="book.id" class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">
                    <img :src="book.image_url" alt="Cover Buku" class="w-full h-56 object-cover bg-slate-100" />
                    <div class="p-6">
                        <span class="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">{{ book.genre }}</span>
                        <h3 class="text-xl font-bold mt-2 text-slate-800">{{ book.title }}</h3>
                        <p class="text-xs text-slate-400 mb-3">Penulis: {{ book.author }} | Penerbit: {{ book.publisher }}</p>
                        <p class="text-sm text-slate-600 line-clamp-3 mb-4">{{ book.synopsis }}</p>
                        
                        <div class="flex items-center justify-between mt-auto">
                            <span :class="book.status === 'Tersedia' ? 'text-green-600 bg-green-50 px-2.5 py-1 rounded text-xs font-medium' : 'text-amber-600 bg-amber-50 px-2.5 py-1 rounded text-xs font-medium'">
                                {{ book.status }}
                            </span>
                            <button v-if="book.status === 'Tersedia'" @click="openRentModal(book)" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm">
                                Sewa Buku
                            </button>
                            <button v-else disabled class="bg-slate-200 text-slate-400 px-4 py-2 rounded-lg text-sm cursor-not-allowed">
                                Sedang Dipinjam
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
                    <h3 class="text-xl font-bold mb-4 text-slate-800">Formulir Sewa Buku</h3>
                    <p class="text-sm text-slate-500 mb-4">Anda akan meminjam buku: <strong class="text-emerald-600">{{ selectedBook.title }}</strong></p>
                    
                    <form @submit.prevent="submitRent">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                            <input type="text" v-model="rentForm.name" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-slate-700 mb-1">Email Aktif</label>
                            <input type="email" v-model="rentForm.email" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-slate-700 mb-1">Tanggal Pengembalian</label>
                            <input type="date" v-model="rentForm.return_date" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div class="flex justify-end gap-2 mt-6">
                            <button type="button" @click="showModal = false" class="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm">Konfirmasi Pinjam</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            books: [],
            search: '',
            showModal: false,
            selectedBook: null,
            rentForm: { name: '', email: '', return_date: '' }
        }
    },
    computed: {
        filteredBooks() {
            return $this = this.books.filter(book => {
                return book.title.toLowerCase().includes(this.search.toLowerCase()) || 
                       book.author.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    mounted() {
        this.fetchBooks();
    },
    methods: {
        fetchBooks() {
            axios.get(`${API_URL}/books`).then(res => { this.books = res.data; });
        },
        openRentModal(book) {
            this.selectedBook = book;
            this.showModal = true;
        },
        submitRent() {
            const payload = {
                book_id: this.selectedBook.id,
                ...this.rentForm
            };
            axios.post(`${API_URL}/rentals`, payload).then(res => {
                alert(res.data.message);
                this.showModal = false;
                this.rentForm = { name: '', email: '', return_date: '' };
                this.fetchBooks();
            });
        }
    }
};