const Rentals = {
    template: `
        <div class="w-full px-2 py-2">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                    <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
                        <span class="p-2 bg-emerald-50 text-emerald-600 rounded-2xl shadow-xs">📋</span>
                        <span>Status Peminjaman Aktif</span>
                    </h2>
                    <p class="text-sm text-slate-500 mt-2 pl-1">Daftar koleksi buku digital yang sedang Anda baca saat ini.</p>
                </div>
                
                <div class="relative w-full md:w-80 flex-shrink-0">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
                        🔍
                    </span>
                    <input 
                        type="text" 
                        v-model="searchQuery" 
                        placeholder="Cari judul buku atau nama..." 
                        class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-xs"
                    />
                    <button v-if="searchQuery" @click="searchQuery = ''" class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 text-xs">
                        ✕
                    </button>
                </div>
            </div>
            
            <div v-if="filteredRentals.length === 0" class="bg-white text-center p-16 rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto">
                <div class="text-5xl mb-4">📖</div>
                <h3 class="text-lg font-bold text-slate-700">Tidak Ada Data</h3>
                <p class="text-slate-400 text-sm mt-1">Buku yang Anda cari tidak ditemukan atau rak pinjam kosong.</p>
            </div>
            
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full items-start justify-start text-left">
                <div v-for="rent in filteredRentals" :key="rent.rental_id" class="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col w-full overflow-hidden transition-all duration-200 hover:shadow-md">
                    
                    <div class="relative w-full h-64 bg-slate-100 border-b border-slate-100 flex-shrink-0">
                        <img :src="rent.image_url" alt="Cover Buku" class="w-full h-full object-cover" />
                        <div class="absolute top-3 left-3">
                            <span class="inline-block px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-emerald-600 text-white uppercase tracking-wider shadow-sm">
                                {{ rent.genre }}
                            </span>
                        </div>
                    </div>
                    
                    <div class="p-5 flex-1 flex flex-col justify-between min-w-0 bg-white">
                        <div class="w-full mb-4">
                            <h3 class="text-lg font-bold text-slate-800 tracking-tight leading-snug truncate w-full" :title="rent.title">
                                {{ rent.title }}
                            </h3>
                            
                            <div class="mt-2 text-xs text-slate-600 space-y-0.5 border-l-2 border-emerald-500 pl-2">
                                <p class="truncate"><span class="text-slate-400">Peminjam:</span> <span class="font-bold text-slate-700">{{ rent.member_name }}</span></p>
                                <p class="text-slate-400 text-[11px] font-mono truncate">{{ rent.member_email }}</p>
                            </div>
                            
                            <p class="text-[11px] text-slate-500 mt-2">
                                Tempo: <span class="font-bold text-rose-500 font-mono">📅 {{ rent.return_date }}</span>
                            </p>
                        </div>
                        
                        <div class="flex items-center justify-between border-t border-slate-50 pt-3 mt-auto w-full">
                            <button @click="openBookDetails(rent)" class="text-xl p-1.5 hover:bg-slate-50 rounded-xl transition-all duration-150 transform hover:scale-110 flex items-center justify-center" title="Buka Isi Buku">
                                📖
                            </button>
                            
                            <button @click="returnBook(rent.rental_id)" class="inline-flex items-center gap-1 bg-slate-100 hover:bg-rose-50 text-rose-600 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 border border-rose-100">
                                ↩️ Kembalikan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="showBookModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 flex flex-col relative">
                    <button @click="showBookModal = false" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-sm p-2 rounded-full hover:bg-slate-50 transition">
                        ✕
                    </button>

                    <div class="mb-4 pr-6">
                        <span class="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-emerald-50 text-emerald-700 uppercase tracking-wider">
                            {{ selectedBook.genre }}
                        </span>
                        <h3 class="text-2xl font-extrabold text-slate-800 mt-1.5 tracking-tight">
                            {{ selectedBook.title }}
                        </h3>
                    </div>

                    <div class="flex gap-4 mb-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <img :src="selectedBook.image_url" class="w-20 h-28 object-cover rounded-xl shadow-xs border bg-white flex-shrink-0" />
                        <div class="text-xs text-slate-600 space-y-1.5 py-1">
                            <p><strong class="text-slate-400 uppercase tracking-wider text-[10px] block mb-0.5">Penulis</strong> <span class="text-sm font-bold text-slate-700">{{ selectedBook.author || '-' }}</span></p>
                            <p><strong class="text-slate-400 uppercase tracking-wider text-[10px] block mb-0.5">Penerbit</strong> <span class="text-sm font-medium text-slate-700">{{ selectedBook.publisher || '-' }}</span></p>
                        </div>
                    </div>

                    <div class="mb-2">
                        <h4 class="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">Sinopsis Buku:</h4>
                        <div class="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 max-h-44 overflow-y-auto">
                            <p class="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                {{ selectedBook.synopsis || 'Sinopsis teks buku ini belum diisi atau ditambahkan oleh admin.' }}
                            </p>
                        </div>
                    </div>

                    <div class="mt-4 flex justify-end">
                        <button @click="showBookModal = false" class="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition">
                            Tutup Buku
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() { 
        return { 
            rentals: [],
            searchQuery: '', // State penampung ketikan pencarian user
            showBookModal: false,
            selectedBook: {}
        } 
    },
    computed: {
        // Logika menyaring data secara otomatis berdasarkan Judul Buku atau Nama Peminjam
        filteredRentals() {
            return this.rentals.filter(item => {
                const query = this.searchQuery.toLowerCase();
                const matchTitle = item.title ? item.title.toLowerCase().includes(query) : false;
                const matchName = item.member_name ? item.member_name.toLowerCase().includes(query) : false;
                return matchTitle || matchName;
            });
        }
    },
    mounted() { 
        this.fetchRentals(); 
    },
    methods: {
        fetchRentals() {
            axios.get(`${API_URL}/rentals`).then(res => { 
                this.rentals = res.data.filter(item => item.rental_status === 'Aktif'); 
            }).catch(err => {
                console.error("Gagal menarik log data sewa:", err);
            });
        },
        openBookDetails(rent) {
            axios.get(`${API_URL}/books`).then(res => {
                const masterBook = res.data.find(b => b.title === rent.title);
                
                this.selectedBook = {
                    title: rent.title,
                    genre: rent.genre,
                    image_url: rent.image_url,
                    author: masterBook ? masterBook.author : '',
                    publisher: masterBook ? masterBook.publisher : '',
                    synopsis: masterBook ? masterBook.synopsis : ''
                };
                this.showBookModal = true;
            });
        },
        returnBook(id) {
            if (confirm("Apakah kamu yakin ingin mengembalikan buku ini?")) {
                axios.post(`${API_URL}/rentals/return/${id}`).then(res => {
                    alert(res.data.message);
                    this.fetchRentals();
                });
            }
        }
    }
};