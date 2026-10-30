export interface Berita {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  authorRole?: string;
  source?: string;
  sourceUrl?: string;
  image: string;
  excerpt: string;
  content: string;
  readTime?: string;
  trending?: boolean;
  breaking?: boolean;
  tags?: string[];
  views?: string;
}

export const beritaCategories = ["Semua", "Pariwisata", "Budaya", "Kuliner", "Ekonomi", "Teknologi", "Tradisi", "Peringatan"];

export const mockBerita: Berita[] = [
  {
    id: "1",
    title: "Pemerintah Garut Resmikan Rute Baru Wisata Kawah Darajat yang Lebih Nyaman",
    category: "Pariwisata",
    date: "12 Okt 2024",
    author: "Humas Pemkab Garut",
    authorRole: "Humas Resmi",
    source: "Pemkab Garut",
    sourceUrl: "https://garutkab.go.id",
    image: "",
    excerpt: "Akses menuju kawasan wisata Kawah Darajat kini lebih mudah dengan diresmikannya rute baru yang lebih lebar dan aman untuk semua jenis kendaraan.",
    content: `Pemerintah Kabupaten Garut secara resmi membuka rute baru menuju kawasan wisata Kawah Darajat, Kamis (12/10). Peresmian dilakukan langsung oleh Bupati Garut yang turut didampingi Kepala Dinas Pariwisata dan Budaya.

Rute baru ini telah diperlebar menjadi dua jalur dan dilengkapi dengan rambu-rambu yang jelas serta tempat parkir yang memadai. Langkah ini diharapkan dapat meningkatkan jumlah kunjungan wisatawan ke kawasan tersebut secara signifikan.

"Kami ingin memberikan pengalaman terbaik bagi wisatawan yang datang ke Garut. Kawah Darajat adalah salah satu aset unggulan kami dan aksesibilitas yang baik adalah kunci keberhasilannya," ujar Bupati.

Kawah Darajat sendiri merupakan kawasan wisata geothermal yang menawarkan pemandangan kawah aktif dengan uap belerang yang menjadi daya tarik tersendiri. Kawasan ini juga menjadi sumber energi geothermal yang dimanfaatkan untuk pembangkit listrik.

Selain perbaikan akses, pihak pengelola juga telah menambahkan fasilitas baru seperti pusat informasi wisata, jalur pejalan kaki yang aman, dan area selfie dengan pemandangan kawah.`,
    readTime: "3 menit",
    trending: true,
    breaking: true,
    tags: ["Kawah Darajat", "Infrastruktur", "Wisata Alam", "Pemkab Garut"],
    views: "2,4K",
  },
  {
    id: "2",
    title: "Festival Dodol Garut 2024 Sukses Tarik Ribuan Pengunjung dari Seluruh Nusantara",
    category: "Budaya",
    date: "05 Okt 2024",
    author: "Nempo Organizer News",
    authorRole: "Redaksi",
    source: "Nempo Organizer",
    image: "",
    excerpt: "Acara tahunan Festival Dodol Garut kembali digelar dan berhasil menarik perhatian wisatawan lokal maupun mancanegara.",
    content: `Festival Dodol Garut 2024 sukses digelar selama tiga hari berturut-turut di Alun-Alun Garut. Event tahunan ini kembali memecahkan rekor dengan mencatat lebih dari 50.000 pengunjung sepanjang penyelenggaraannya.

Lebih dari 50 produsen dodol lokal turut berpartisipasi, memamerkan berbagai varian dodol mulai dari yang tradisional hingga kreasi modern dengan rasa buah-buahan tropis.

Kepala Dinas Pariwisata dan Budaya Garut mengungkapkan bahwa festival ini menjadi bagian dari upaya memperkuat identitas kuliner Garut di tingkat nasional maupun internasional.

Salah satu highlight festival tahun ini adalah kompetisi antar produsen dodol yang dinilai dari segi rasa, tekstur, presentasi, dan inovasi. Para pemenang mendapatkan label "Dodol Garut Terbaik 2024" yang dapat digunakan sebagai branding produk.`,
    readTime: "4 menit",
    trending: true,
    tags: ["Dodol Garut", "Festival", "Kuliner Lokal", "Budaya"],
    views: "1,8K",
  },
  {
    id: "3",
    title: "Komunitas Pemuda Lestarikan Pencak Silat Lewat Sanggar Seni Baru",
    category: "Budaya",
    date: "28 Sep 2024",
    author: "Seni Budaya Garut",
    authorRole: "Kontributor",
    source: "Komunitas Budaya Garut",
    image: "",
    excerpt: "Sebuah komunitas pemuda di Garut mendirikan sanggar seni untuk melestarikan kesenian Pencak Silat yang semakin tergerus zaman.",
    content: `Di tengah gempuran budaya modern, sekelompok pemuda di Garut berinisiatif mendirikan sanggar seni yang fokus pada pelestarian Pencak Silat. Sanggar yang diberi nama "Galur Rasa" ini sudah aktif berlatih setiap akhir pekan dan kini memiliki lebih dari 60 anggota aktif.

Pendiri sanggar, Asep Ramdani (26), menuturkan keprihatinannya melihat generasi muda yang semakin jarang mengenal seni bela diri tradisional ini. "Pencak Silat bukan sekadar bela diri, ini adalah warisan leluhur yang mengandung nilai filosofi, seni, dan kearifan lokal," ujarnya.

Sanggar ini tidak hanya mengajarkan teknik bela diri, tetapi juga seni pertunjukan Pencak Silat dengan iringan musik tradisional Sunda. Mereka sudah tampil di beberapa acara budaya di Garut dan mendapat respons positif dari masyarakat.

Program ke depan, komunitas ini berencana membuka kelas reguler untuk pelajar sekolah dasar agar warisan budaya ini tetap hidup di generasi penerus.`,
    readTime: "3 menit",
    tags: ["Pencak Silat", "Seni Tradisional", "Pemuda", "Pelestarian Budaya"],
    views: "943",
  },
  {
    id: "4",
    title: "Cuaca Ekstrem, Pendakian Gunung Papandayan Ditutup Sementara",
    category: "Peringatan",
    date: "20 Sep 2024",
    author: "BKSDA Jabar",
    authorRole: "Instansi Resmi",
    source: "BKSDA Jawa Barat",
    sourceUrl: "https://bksda-jabar.go.id",
    image: "",
    excerpt: "Mengingat kondisi cuaca yang memburuk, jalur pendakian Gunung Papandayan ditutup sementara untuk keselamatan pengunjung.",
    content: `Balai Konservasi Sumber Daya Alam (BKSDA) Jawa Barat mengumumkan penutupan sementara seluruh jalur pendakian di Gunung Papandayan mulai 20 September 2024 hingga batas waktu yang belum ditentukan.

Keputusan ini diambil menyusul adanya potensi cuaca ekstrem berupa hujan lebat disertai angin kencang yang diperkirakan akan terus berlangsung selama beberapa hari ke depan berdasarkan prakiraan BMKG.

"Keselamatan pendaki adalah prioritas utama kami. Kami mohon masyarakat untuk mematuhi aturan ini demi keselamatan bersama," tegas Kepala BKSDA Jabar.

Selama penutupan, seluruh aktivitas pendakian dilarang keras. Bagi wisatawan yang telah memiliki jadwal pendakian, disarankan untuk menghubungi pengelola untuk penjadwalan ulang. Informasi pembukaan kembali akan diumumkan melalui kanal resmi BKSDA dan media sosial.`,
    readTime: "2 menit",
    breaking: true,
    tags: ["Gunung Papandayan", "Peringatan Cuaca", "BKSDA", "Pendakian"],
    views: "3,1K",
  },
  {
    id: "5",
    title: "Garut Siap Jadi Kota Cerdas Pariwisata dengan Teknologi Digital Terkini",
    category: "Teknologi",
    date: "15 Sep 2024",
    author: "Dinas Kominfo Garut",
    authorRole: "Instansi Resmi",
    source: "Diskominfo Garut",
    sourceUrl: "https://kominfo.garutkab.go.id",
    image: "",
    excerpt: "Pemerintah sedang menggodok berbagai inovasi digital untuk mendukung ekosistem pariwisata di Garut.",
    content: `Inovasi teknologi terus digenjot oleh Pemerintah Kabupaten Garut demi mewujudkan visi sebagai Kota Cerdas Pariwisata. Berbagai program digitalisasi sedang disiapkan, mulai dari sistem reservasi wisata terintegrasi, peta wisata interaktif, hingga chatbot informasi berbasis kecerdasan buatan.

Kepala Dinas Kominfo Garut menjelaskan bahwa program ini merupakan bagian dari Rencana Induk Pariwisata Digital Garut 2024-2029. Anggaran senilai Rp 12 miliar telah dialokasikan untuk tahap pertama implementasi.

"Kami ingin wisatawan bisa merencanakan perjalanan ke Garut hanya dari genggaman tangan mereka. Semua informasi, reservasi, hingga pembayaran akan bisa dilakukan melalui satu platform," papar Kepala Dinas.

Salah satu terobosan yang paling dinantikan adalah sistem QR Code di setiap destinasi wisata yang akan memberikan informasi lengkap dan multimedia tentang tempat tersebut kepada pengunjung.`,
    readTime: "5 menit",
    tags: ["Smart City", "Digitalisasi", "Pariwisata Digital", "Inovasi"],
    views: "1,2K",
  },
  {
    id: "6",
    title: "Domba Garut Adu Ketangkasan, Tradisi yang Terus Hidup di Modernisasi",
    category: "Tradisi",
    date: "10 Sep 2024",
    author: "Liputan Khusus",
    authorRole: "Jurnalis Lapangan",
    source: "Nempo Organizer",
    image: "",
    excerpt: "Adu ketangkasan domba Garut masih menjadi atraksi budaya andalan yang menarik ribuan penonton setiap pekannya.",
    content: `Adu ketangkasan domba Garut, tradisi unik yang sudah berlangsung ratusan tahun, tetap eksis dan bahkan semakin berkembang di era modern ini. Setiap Minggu pagi, arena adu domba di berbagai kecamatan di Garut selalu dipenuhi penonton yang antusias.

Berbeda dari adu hewan yang mengandalkan kekuatan semata, adu domba Garut lebih mengutamakan keindahan gerakan, iringan musik degung, dan penampilan domba yang terawat. Domba-domba peserta dirawat dengan penuh kasih sayang dan dilatih khusus oleh para pemiliknya.

Komunitas pecinta domba Garut kini juga aktif menyelenggarakan kompetisi nasional yang menarik peserta dari berbagai provinsi. Hal ini semakin mengangkat nama domba Garut sebagai salah satu ras domba terbaik di Indonesia.

Para pelaku tradisi ini berharap generasi muda dapat terus mewarisi dan mengembangkan tradisi unik ini sebagai bagian dari identitas budaya Garut.`,
    readTime: "4 menit",
    trending: true,
    tags: ["Domba Garut", "Tradisi", "Budaya Lokal", "Atraksi Wisata"],
    views: "890",
  },
  {
    id: "7",
    title: "Kuliner Soto Garut Kini Merambah Pasar Jakarta dan Bandung",
    category: "Kuliner",
    date: "03 Sep 2024",
    author: "Redaksi Nempo",
    authorRole: "Redaksi",
    source: "Nempo Organizer",
    image: "",
    excerpt: "Popularitas soto khas Garut terus meluas, dengan banyak warung baru bermunculan di kota-kota besar Jawa Barat.",
    content: `Soto Garut dengan kuah bening khas rempah Sunda kini makin diminati di berbagai kota besar. Tidak kurang dari 30 warung soto Garut baru telah dibuka di Jakarta dan Bandung sepanjang tahun 2024, menandai ekspansi kuliner khas Garut ke pasar yang lebih luas.

Keunikan Soto Garut terletak pada kuah beningnya yang kaya rempah, disajikan dengan daging sapi empuk dan taburan bawang goreng harum. Cita rasanya yang khas dan tidak ditemukan di soto daerah lain menjadi daya tarik utama.

Salah satu pemilik warung soto Garut di Jakarta, Pak Ujang, mengungkapkan bahwa antrean panjang sudah biasa setiap jam makan siang. "Orang Jakarta sudah kangen masakan yang autentik dan tidak terlalu berminyak," ujarnya.

Melihat tren ini, Dinas Perdagangan Garut berencana memfasilitasi lebih banyak pelaku UMKM kuliner Garut untuk membuka cabang di kota-kota besar sebagai bagian dari program promosi produk unggulan daerah.`,
    readTime: "3 menit",
    tags: ["Soto Garut", "Kuliner Lokal", "UMKM", "Ekspansi"],
    views: "1,5K",
  },
  {
    id: "8",
    title: "Investasi Hotel Bintang Empat Pertama di Pusat Kota Garut Segera Dimulai",
    category: "Ekonomi",
    date: "28 Agu 2024",
    author: "Bisnis Garut",
    authorRole: "Jurnalis Ekonomi",
    source: "Garut Bisnis",
    image: "",
    excerpt: "Sebuah grup hospitality nasional berencana membangun hotel berbintang pertama di pusat Kota Garut senilai Rp 250 miliar.",
    content: `Kabar gembira bagi perkembangan pariwisata Garut. Sebuah grup hotel nasional terkemuka telah menandatangani perjanjian investasi senilai Rp 250 miliar untuk pembangunan hotel bintang empat pertama di pusat Kota Garut.

Hotel yang direncanakan berlantai 12 ini akan memiliki 200 kamar, fasilitas meeting room berkapasitas 500 orang, rooftop restaurant dengan pemandangan Gunung Papandayan, spa, dan kolam renang.

"Ini adalah sinyal kuat bahwa Garut semakin dipercaya sebagai destinasi wisata premium. Investasi ini akan membuka lapangan kerja bagi ratusan warga lokal," ujar Bupati Garut saat penandatanganan MoU.

Pembangunan dijadwalkan dimulai pada kuartal pertama 2025 dan diperkirakan rampung dalam 2,5 tahun. Pihak investor juga berkomitmen untuk memberdayakan produk lokal Garut dalam operasional hotel.`,
    readTime: "4 menit",
    tags: ["Investasi", "Hotel", "Ekonomi Daerah", "Pariwisata Premium"],
    views: "745",
  },
];
