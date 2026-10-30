import { useMemo, useState } from "react";
import { Link, useRoute } from "@/lib/wouter";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  ChevronDown,
  Clock3,
  Feather,
  MapPin,
  Search,
  X,
} from "lucide-react";
import "./cerita-rakyat.css";

type Story = {
  id: string;
  title: string;
  place: string;
  area: string;
  category: string;
  duration: string;
  excerpt: string;
  lesson: string;
  color: string;
  mark: string;
  body: string[];
};

const stories: Story[] = [
  {
    id: "situ-bagendit",
    title: "Legenda Situ Bagendit",
    place: "Garut",
    area: "Garut",
    category: "Legenda tempat",
    duration: "6 menit",
    excerpt: "Kisah tentang keserakahan, kepedulian, dan asal mula danau yang kini menjadi salah satu ikon Garut.",
    lesson: "Harta tidak berarti jika membuat kita lupa pada sesama.",
    color: "#0f766e",
    mark: "SB",
    body: [
      "Di sebuah kampung yang subur, hiduplah seorang janda kaya bernama Nyai Endit. Ia memiliki banyak harta, tetapi terkenal pelit dan tidak mau menolong warga yang sedang kesusahan.",
      "Lumbung Nyai Endit selalu penuh, sementara sebagian warga harus menghemat makanan dari hari ke hari. Ketika ada tetangga yang meminjam beras atau meminta bantuan, ia lebih sering menutup pintu dan menyuruh mereka pergi.",
      "Suatu hari, seorang pengembara tua datang meminta sedikit makanan. Nyai Endit menolaknya dengan kasar. Tak lama kemudian, air memancar dari tanah dan terus membesar. Warga berusaha menyelamatkan diri, sementara rumah dan harta Nyai Endit ikut tersapu air.",
      "Warga berlari menuju tempat yang lebih tinggi sambil menyelamatkan anak-anak dan orang tua. Nyai Endit berusaha membawa peti hartanya, tetapi air terus naik dan tidak memberi kesempatan untuk menyelamatkan apa pun yang ia kumpulkan.",
      "Tempat itu kemudian dikenal sebagai Situ Bagendit. Cerita ini diwariskan sebagai pengingat bahwa rezeki akan lebih berarti jika dibagikan dan lingkungan harus dijaga bersama.",
    ],
  },
  {
    id: "lutung-kasarung",
    title: "Lutung Kasarung",
    place: "Tatar Sunda",
    area: "Tatar Sunda",
    category: "Kisah kerajaan",
    duration: "8 menit",
    excerpt: "Perjalanan Purbasari menemukan keberanian, ketulusan, dan cinta yang tidak diukur dari rupa.",
    lesson: "Ketulusan dan kebaikan akan menemukan jalannya sendiri.",
    color: "#7c3aed",
    mark: "LK",
    body: [
      "Purbasari adalah putri bungsu yang lembut hati. Kakaknya, Purbararang, merasa iri ketika Purbasari dipilih untuk memimpin kerajaan. Berbagai cara dilakukan agar Purbasari terlihat tidak layak.",
      "Purbasari tidak membalas iri hati itu dengan kemarahan. Ia tetap dekat dengan rakyat dan dikenal suka mendengar keluhan mereka. Justru sikap itulah yang membuat keputusan untuk menjadikannya penerus kerajaan semakin kuat.",
      "Dalam pengasingan, Purbasari bertemu seekor lutung yang selalu menolongnya. Lutung itu sebenarnya Guruminda, seorang pangeran yang sedang menjalani hukuman. Ia membantu Purbasari membangun kehidupan baru dengan penuh kesabaran.",
      "Di tempat yang jauh dari istana, Purbasari belajar merawat kebun, mengenali tumbuhan, dan bekerja bersama orang-orang yang menemaninya. Lutung Kasarung tidak banyak bicara, tetapi selalu hadir ketika Purbasari menghadapi kesulitan.",
      "Ketika tiba waktunya kembali ke istana, Purbasari menghadapi ujian yang dibuat oleh Purbararang. Kebaikan orang-orang yang pernah ia tolong akhirnya menjadi kekuatan yang membantunya melewati ujian tersebut.",
      "Pada akhirnya, kebenaran terungkap. Purbasari kembali ke kerajaan dan membuktikan bahwa pemimpin yang baik lahir dari hati yang tulus, bukan dari penampilan atau ambisi.",
    ],
  },
  {
    id: "nyi-pohaci",
    title: "Nyi Pohaci Sanghyang Asri",
    place: "Tanah Sunda",
    area: "Tatar Sunda",
    category: "Asal-usul",
    duration: "7 menit",
    excerpt: "Cerita tentang sosok yang dipercaya menjadi sumber kesuburan dan pangan bagi masyarakat Sunda.",
    lesson: "Alam adalah titipan yang perlu dirawat dan dihormati.",
    color: "#b45309",
    mark: "NP",
    body: [
      "Nyi Pohaci Sanghyang Asri dikenal dalam kepercayaan Sunda sebagai sosok yang membawa kehidupan dan kesuburan. Kisahnya menyatukan manusia, tanah, air, dan tumbuhan dalam satu hubungan yang saling menjaga.",
      "Dalam beberapa versi, kelahirannya dikaitkan dengan harapan para dewa dan manusia untuk menghadirkan keseimbangan di dunia. Ia bukan hanya dipandang sebagai tokoh, tetapi juga sebagai lambang kehidupan yang harus dipelihara bersama.",
      "Dari pengorbanan dan perjalanan Nyi Pohaci, tumbuh berbagai tanaman yang bermanfaat bagi kehidupan. Padi menjadi lambang utama kesejahteraan karena memberi makan banyak orang.",
      "Ketika sawah mulai menghijau, masyarakat melihat pertumbuhan padi sebagai tanda bahwa tanah masih memberi kehidupan. Karena itu, pekerjaan menanam dan memanen dilakukan dengan rasa hormat, doa, serta gotong royong.",
      "Pesan cerita ini terasa dalam kebiasaan untuk tidak menyia-nyiakan nasi, merawat saluran air, dan menghargai kerja panjang para petani. Setiap butir pangan mengingatkan manusia pada hubungan yang panjang antara alam dan kehidupan.",
      "Bagi masyarakat Sunda, kisah ini bukan hanya cerita asal-usul. Ia juga menjadi ajakan untuk menghargai petani, menjaga tanah, dan tidak mengambil alam secara berlebihan.",
    ],
  },
  {
    id: "sangkuriang",
    title: "Sangkuriang",
    place: "Jawa Barat",
    area: "Bandung Raya",
    category: "Legenda alam",
    duration: "8 menit",
    excerpt: "Legenda tentang asal mula Tangkuban Parahu dan akibat dari keputusan yang diambil tanpa mengenal kebenaran.",
    lesson: "Kenali kebenaran sebelum bertindak dalam amarah.",
    color: "#1d4ed8",
    mark: "SK",
    body: [
      "Sangkuriang tumbuh sebagai pemuda pemberani yang gemar berburu. Dalam sebuah perjalanan, ia tidak sengaja membunuh Tumang, anjing yang sebenarnya adalah ayahnya sendiri. Peristiwa itu membuatnya pergi jauh dari rumah.",
      "Dayang Sumbi sangat berduka ketika mengetahui apa yang terjadi. Sangkuriang meninggalkan rumah dan menjalani perjalanan panjang hingga tumbuh menjadi pemuda yang kuat. Ia membawa ingatan yang tidak lengkap tentang masa kecilnya.",
      "Bertahun-tahun kemudian, Sangkuriang kembali dan bertemu Dayang Sumbi tanpa menyadari bahwa perempuan itu adalah ibunya. Mereka saling menyukai, sampai sebuah tanda membuat Dayang Sumbi mengenali anaknya.",
      "Dayang Sumbi melihat tanda pada kepala Sangkuriang dan menyadari bahwa pemuda itu adalah anaknya. Ia berusaha mencegah pernikahan tanpa membuka seluruh rahasia secara terburu-buru, karena tahu Sangkuriang mudah tersulut oleh emosi.",
      "Dayang Sumbi meminta Sangkuriang membuat danau serta perahu dalam satu malam. Saat usaha itu hampir berhasil, ia menggagalkannya dengan membuat suasana seolah-olah pagi telah tiba. Perahu yang ditendang kemudian dipercaya menjadi Tangkuban Parahu.",
      "Sangkuriang marah karena merasa usahanya digagalkan. Dalam kemarahannya, ia menendang perahu yang hampir selesai itu hingga terbalik. Bentuk perahu tersebut kemudian dipercaya menjadi gunung yang tampak di kawasan Bandung.",
    ],
  },
  {
    id: "mundinglaya",
    title: "Mundinglaya Dikusumah",
    place: "Tatar Sunda",
    area: "Tatar Sunda",
    category: "Kepahlawanan",
    duration: "9 menit",
    excerpt: "Kisah kepahlawanan seorang putra kerajaan yang menempuh perjalanan jauh demi menyelamatkan negerinya.",
    lesson: "Keberanian menjadi berarti saat digunakan untuk melindungi orang lain.",
    color: "#be123c",
    mark: "MD",
    body: [
      "Mundinglaya Dikusumah adalah putra kerajaan yang dikenal tenang dan berani. Ia mendapat tugas mencari Layang Salaka Domas, benda pusaka yang dipercaya dapat membawa keselamatan bagi negeri.",
      "Negeri sedang menghadapi masa yang tidak mudah. Para pemimpin membutuhkan tanda harapan, tetapi pusaka itu berada jauh dan tidak bisa diperoleh hanya dengan kekuatan pasukan. Mundinglaya menerima tugas tersebut karena memahami keselamatan rakyat lebih penting daripada kenyamanan dirinya.",
      "Perjalanannya penuh rintangan. Ia harus melewati tempat-tempat asing dan menghadapi kekuatan besar dengan akal, kesetiaan, dan keberanian. Ia tidak berangkat untuk mencari kemuliaan pribadi.",
      "Dalam perjalanan, ia belajar membedakan keberanian dari kesombongan. Ia menghormati orang-orang yang ditemuinya, menepati janji, dan memilih jalan yang paling sedikit merugikan orang lain ketika menghadapi bahaya.",
      "Setelah melalui berbagai ujian, Mundinglaya berhasil membawa pusaka itu pulang. Kepulangannya disambut bukan hanya sebagai kemenangan seorang pangeran, melainkan sebagai kabar bahwa harapan bagi seluruh negeri masih terjaga.",
      "Setelah pusaka berhasil dibawa pulang, kedamaian kembali hadir. Kisah Mundinglaya terus diceritakan sebagai teladan tentang tanggung jawab seorang pemimpin.",
    ],
  },
  {
    id: "situ-cangkuang",
    title: "Legenda Situ Cangkuang",
    place: "Leles, Garut",
    area: "Garut",
    category: "Legenda tempat",
    duration: "6 menit",
    excerpt: "Kisah tentang kesetiaan, sebuah danau yang tenang, dan jejak kehidupan lama di sekitar Candi Cangkuang.",
    lesson: "Warisan masa lalu perlu dirawat agar tetap bercerita.",
    color: "#0369a1",
    mark: "SC",
    body: [
      "Di sekitar sebuah danau yang dikelilingi perbukitan, masyarakat hidup berdampingan dengan alam dan peninggalan leluhur. Nama Cangkuang dihubungkan dengan tanaman yang banyak tumbuh di kawasan itu.",
      "Air danau menjadi bagian dari kehidupan sehari-hari. Warga memanfaatkannya dengan hati-hati, sementara perbukitan dan pepohonan di sekelilingnya menjadi penanda arah bagi orang-orang yang bepergian dari satu kampung ke kampung lain.",
      "Dari generasi ke generasi, kisah Situ Cangkuang diceritakan bersama cerita tentang kampung, makam leluhur, dan candi yang menjadi pengingat bahwa kehidupan hari ini berdiri di atas jejak masa lalu.",
      "Bagi masyarakat, candi dan makam bukan sekadar bangunan lama. Keduanya menjadi ruang untuk mengingat orang-orang terdahulu, memahami perubahan zaman, dan mengenali bagaimana berbagai tradisi pernah hidup berdampingan.",
      "Ketika pengunjung datang, cerita tentang danau biasanya berjalan bersama ajakan untuk bersikap tenang dan menghormati tempat. Alam, situs, dan kehidupan warga setempat tidak dapat dipisahkan dari makna kawasan tersebut.",
      "Legenda ini mengajak kita menjaga danau, situs budaya, dan lingkungan agar semuanya tetap bisa dipelajari oleh generasi berikutnya.",
    ],
  },
  {
    id: "nyi-anteh",
    title: "Nyi Anteh Sang Penunggu Bulan",
    place: "Bandung Raya",
    area: "Bandung Raya",
    category: "Legenda langit",
    duration: "7 menit",
    excerpt: "Kisah seorang perempuan yang dipercaya menjahit di bulan dan menjadi bagian dari imajinasi masyarakat Sunda.",
    lesson: "Kasih sayang dan ketekunan dapat hidup dalam cerita lintas generasi.",
    color: "#4338ca",
    mark: "NA",
    body: [
      "Nyi Anteh dikenal sebagai sosok perempuan yang tekun menenun dan menjahit. Dalam versi cerita yang berkembang di masyarakat Sunda, ia memiliki kucing kesayangan bernama Candramawat.",
      "Hari-harinya diisi dengan pekerjaan yang membutuhkan kesabaran. Ia menjahit pakaian, memperbaiki kain, dan menyelesaikan tugas-tugas kecil yang sering tidak terlihat, tetapi penting bagi kehidupan di sekitarnya.",
      "Karena sebuah peristiwa, Nyi Anteh dipercaya terangkat ke bulan. Dari bumi, bayangannya tampak sedang duduk dan bekerja, ditemani kucing yang setia.",
      "Sejak saat itu, orang-orang memandang permukaan bulan dengan cara berbeda. Bayangan dan bentuk samar di sana dibayangkan sebagai sosok Nyi Anteh yang masih tekun menjahit, sementara Candramawat duduk menemaninya.",
      "Anak-anak mendengar kisah itu dari orang tua ketika malam cerah. Cerita tersebut membuat bulan terasa dekat dan memberi bahasa sederhana untuk membicarakan rindu kepada seseorang yang jauh.",
      "Kisah ini menjadi cara masyarakat dahulu menjelaskan bayangan di bulan sekaligus menyimpan pesan tentang kesetiaan, ketekunan, dan kerinduan.",
    ],
  },
  {
    id: "talaga-warna",
    title: "Sasakala Talaga Warna",
    place: "Puncak, Bogor",
    area: "Bogor Raya",
    category: "Asal-usul danau",
    duration: "6 menit",
    excerpt: "Legenda tentang sebuah telaga yang berubah warna setelah kesombongan dan kesedihan memenuhi istana.",
    lesson: "Rasa syukur lebih berharga daripada kemewahan.",
    color: "#0f766e",
    mark: "TW",
    body: [
      "Di sebuah kerajaan yang makmur, hiduplah seorang putri yang disayangi seluruh rakyat. Pada hari ulang tahunnya, raja dan rakyat menyiapkan hadiah yang sangat indah untuknya.",
      "Hadiah itu dikumpulkan dengan penuh sukacita. Ada yang menyumbangkan hasil kebun, ada yang menyiapkan hiasan, dan ada pula yang membuat perhiasan sebagai tanda kasih kepada putri yang mereka harapkan tumbuh menjadi pribadi bijaksana.",
      "Namun sang putri menolak hadiah itu dengan sikap sombong. Kesedihan rakyat dan tangis raja kemudian dipercaya menggenangi tempat tersebut hingga menjadi telaga.",
      "Istana yang sebelumnya dipenuhi musik berubah menjadi sunyi. Air mata yang jatuh dari banyak hati digambarkan mengalir tanpa henti, menutupi halaman dan membawa warna-warni perhiasan ke permukaan air.",
      "Raja dan sang putri kemudian menyadari bahwa kemewahan tidak dapat menggantikan perasaan orang-orang yang tulus mencintai mereka. Telaga yang terbentuk menjadi pengingat bagi siapa pun yang datang ke tempat itu.",
      "Air telaga tampak berwarna-warni ketika memantulkan cahaya dan pepohonan. Cerita ini mengingatkan bahwa kemewahan tidak boleh membuat hati lupa bersyukur.",
    ],
  },
  {
    id: "prabu-siliwangi",
    title: "Prabu Siliwangi",
    place: "Pajajaran, Bogor",
    area: "Bogor Raya",
    category: "Kisah kerajaan",
    duration: "8 menit",
    excerpt: "Kisah kepemimpinan raja Pajajaran yang hidup dalam ingatan dan berbagai versi tradisi Sunda.",
    lesson: "Pemimpin dikenang karena perlindungan dan kebijaksanaannya.",
    color: "#92400e",
    mark: "PS",
    body: [
      "Prabu Siliwangi merupakan tokoh yang sangat dikenal dalam tradisi lisan Sunda dan sering dihubungkan dengan Kerajaan Pajajaran. Kisahnya berkembang dalam banyak versi di berbagai daerah Jawa Barat.",
      "Dalam carita pantun dan kisah yang dituturkan dari satu generasi ke generasi berikutnya, ia digambarkan sebagai raja yang mampu membaca keadaan. Ia tidak hanya memikirkan perluasan wilayah, tetapi juga ketenteraman kampung dan hubungan manusia dengan alam.",
      "Ia digambarkan sebagai pemimpin yang menjaga rakyat, menghormati alam, dan memiliki hubungan kuat dengan hutan serta gunung. Karena itu, namanya hadir dalam banyak sasakala dan tempat yang dianggap bersejarah.",
      "Banyak cerita tentangnya menempatkan hutan, harimau, dan gunung sebagai bagian dari simbol kepemimpinan. Simbol-simbol itu dapat dibaca sebagai pengingat bahwa seorang pemimpin harus berani, tetapi tetap memahami batas dan keseimbangan.",
      "Di berbagai tempat, nama Prabu Siliwangi hadir melalui petilasan, nama wilayah, dan cerita keluarga. Setiap tempat dapat memiliki penekanan yang berbeda, sehingga pendengar perlu memahami kisahnya sebagai bagian dari tradisi yang terus berkembang.",
      "Cerita Prabu Siliwangi sebaiknya dibaca sebagai warisan tradisi lisan yang memiliki beragam versi, bukan sebagai satu catatan sejarah tunggal.",
    ],
  },
  {
    id: "rara-santang",
    title: "Nyi Mas Rara Santang",
    place: "Cirebon",
    area: "Cirebon Raya",
    category: "Kisah kerajaan",
    duration: "8 menit",
    excerpt: "Perjalanan seorang putri Pajajaran yang menjadi bagian penting dari kisah awal Cirebon.",
    lesson: "Perjalanan hidup dapat mempertemukan berbagai budaya.",
    color: "#be123c",
    mark: "RS",
    body: [
      "Nyi Mas Rara Santang dikenal dalam berbagai babad sebagai putri Pajajaran yang melakukan perjalanan jauh. Di sepanjang perjalanan, ia bertemu dengan tokoh-tokoh dan tradisi dari berbagai wilayah.",
      "Perjalanan itu tidak selalu mudah. Ia harus meninggalkan lingkungan yang dikenalnya dan belajar memahami kebiasaan masyarakat di tempat-tempat baru. Pengalaman tersebut membuat pandangannya tentang keluarga, keyakinan, dan masa depan semakin luas.",
      "Kisahnya kemudian terhubung dengan perkembangan Cirebon dan hubungan keluarga yang melahirkan tokoh-tokoh penting dalam sejarah kawasan pesisir utara Jawa Barat.",
      "Dalam sejumlah versi, perjumpaan dengan dunia pesisir mempertemukannya dengan jaringan perdagangan, ilmu pengetahuan, dan ajaran yang datang dari berbagai arah. Cirebon kemudian dikenang sebagai ruang pertemuan budaya daratan Sunda dan dunia maritim.",
      "Nama Rara Santang terus hadir dalam babad, cerita keluarga, dan kisah tentang asal-usul tokoh-tokoh Cirebon. Perbedaan versi menunjukkan bahwa perjalanan seorang tokoh dapat diingat dengan cara yang beragam oleh masyarakat.",
      "Cerita ini memperlihatkan bagaimana budaya Sunda, pesisir, dan Islam bertemu dalam ingatan masyarakat Cirebon.",
    ],
  },
  {
    id: "nyi-mas-gandasari",
    title: "Nyi Mas Gandasari",
    place: "Cirebon",
    area: "Cirebon Raya",
    category: "Kisah kepahlawanan",
    duration: "7 menit",
    excerpt: "Cerita tentang seorang perempuan tangguh yang dikenang karena ilmu, keberanian, dan pengabdiannya.",
    lesson: "Keberanian tidak ditentukan oleh jenis kelamin.",
    color: "#7c2d12",
    mark: "NG",
    body: [
      "Nyi Mas Gandasari dikenal dalam tradisi Cirebon sebagai sosok perempuan yang cerdas, berani, dan memiliki kemampuan bela diri. Ia tumbuh dalam lingkungan yang mempertemukan banyak kebudayaan.",
      "Sejak muda, ia tidak hanya belajar menjaga diri, tetapi juga belajar membaca situasi dan mengambil keputusan. Kecerdasan itu membuatnya mampu menghadapi persoalan tanpa mengandalkan kekuatan semata.",
      "Dalam sejumlah versi cerita, ia menjalani ujian dan pertarungan untuk membuktikan keteguhan hati serta kemampuannya. Ia tidak hanya dikenang karena kecantikan, tetapi juga karena keberanian.",
      "Ujian yang dihadapinya sering menjadi lambang perjalanan seseorang untuk mendapatkan kepercayaan. Ia harus menunjukkan disiplin, keberanian, dan kesediaan melindungi orang lain sebelum diakui oleh lingkungannya.",
      "Setelah melewati berbagai rintangan, kemampuan Nyi Mas Gandasari dipandang sebagai anugerah yang harus digunakan dengan tanggung jawab. Ia tidak menjadikan ilmu sebagai alasan untuk merendahkan orang lain.",
      "Kisah Nyi Mas Gandasari menjadi teladan bahwa perempuan dapat mengambil peran penting dalam menjaga masyarakat dan menyebarkan kebaikan.",
    ],
  },
  {
    id: "ciung-wanara",
    title: "Ciung Wanara",
    place: "Galuh, Ciamis",
    area: "Priangan Timur",
    category: "Kisah kerajaan",
    duration: "8 menit",
    excerpt: "Legenda Kerajaan Galuh tentang asal-usul seorang pemimpin yang harus menemukan identitas dan haknya.",
    lesson: "Kebenaran akan menemukan jalannya meski sempat disembunyikan.",
    color: "#166534",
    mark: "CW",
    body: [
      "Ciung Wanara adalah tokoh dalam legenda Kerajaan Galuh. Sejak kecil ia terpisah dari lingkungan istana dan tumbuh tanpa mengetahui asal-usulnya.",
      "Ia dibesarkan oleh orang-orang yang sederhana, tetapi mengajarinya bekerja keras dan memperlakukan siapa pun dengan hormat. Walaupun hidup jauh dari istana, ia memiliki keberanian dan kecerdasan yang perlahan menarik perhatian banyak orang.",
      "Dengan kecerdasan, keberanian, dan bantuan orang-orang yang tulus, ia akhirnya mengetahui jati dirinya. Pertemuannya dengan lingkungan kerajaan membuka kembali kebenaran yang lama disembunyikan.",
      "Kepulangannya ke lingkungan kerajaan tidak langsung menyelesaikan semua masalah. Ia harus berhadapan dengan orang-orang yang takut kehilangan kedudukan dan membuktikan bahwa hak tidak boleh ditentukan oleh tipu daya.",
      "Pertentangan itu akhirnya membuka kembali kisah lama tentang keluarga dan pergantian kekuasaan. Ciung Wanara memilih jalan yang mengembalikan keteraturan tanpa melupakan rakyat yang telah membantunya.",
      "Cerita ini mengajarkan bahwa kekuasaan tidak boleh dibangun di atas tipu daya dan bahwa rakyat berhak mendapatkan pemimpin yang adil.",
    ],
  },
  {
    id: "situ-lengkong-panjalu",
    title: "Sasakala Situ Lengkong Panjalu",
    place: "Panjalu, Ciamis",
    area: "Priangan Timur",
    category: "Legenda tempat",
    duration: "6 menit",
    excerpt: "Kisah telaga dan pulau kecil yang menjadi bagian dari warisan budaya Panjalu.",
    lesson: "Tempat yang dijaga bersama akan menjadi sumber ingatan bersama.",
    color: "#0369a1",
    mark: "SL",
    body: [
      "Situ Lengkong Panjalu dikelilingi oleh kisah tentang kerajaan, tokoh leluhur, dan perjalanan yang membawa benda pusaka ke kawasan Panjalu.",
      "Dalam berbagai versi, perjalanan menuju Panjalu dilakukan untuk mencari sumber air, ilmu, atau keselamatan bagi masyarakat. Perjalanan itu menghubungkan tokoh kerajaan dengan tempat-tempat yang kemudian dianggap penting oleh warga.",
      "Pulau kecil di tengah situ dan lingkungan sekitarnya kemudian menjadi bagian penting dari tradisi masyarakat. Cerita yang menyertainya diwariskan bersama penghormatan kepada leluhur dan alam.",
      "Air yang tenang, pepohonan, dan pulau di tengah danau membentuk ruang yang berbeda dari kampung di sekitarnya. Karena itu, kawasan tersebut tidak hanya dilihat sebagai pemandangan, tetapi juga sebagai tempat untuk mengingat asal-usul dan hubungan antargenerasi.",
      "Orang-orang yang datang untuk berziarah atau berkunjung diajak menjaga sikap dan kebersihan. Menghormati tempat berarti merawat air, tidak mengganggu lingkungan, dan mendengarkan cerita warga setempat.",
      "Sasakala ini mengajak kita melihat danau bukan hanya sebagai tempat wisata, tetapi juga sebagai ruang budaya yang perlu dirawat.",
    ],
  },
  {
    id: "karang-nini",
    title: "Legenda Karang Nini",
    place: "Pangandaran",
    area: "Priangan Timur",
    category: "Legenda pantai",
    duration: "6 menit",
    excerpt: "Kisah sepasang suami istri yang dipercaya berubah menjadi batu karena kesetiaan dan penantian panjang.",
    lesson: "Kesetiaan adalah janji yang dijaga dalam suka dan duka.",
    color: "#0f766e",
    mark: "KN",
    body: [
      "Di pesisir Pangandaran, masyarakat mengenal kisah sepasang suami istri yang hidup sederhana sebagai nelayan. Suatu hari, sang suami pergi melaut dan tak kunjung kembali.",
      "Sebelum berangkat, mereka berjanji untuk saling menunggu. Sang istri percaya bahwa suaminya akan kembali bersama perahu dan hasil tangkapan, sementara sang suami berharap menemukan jalan pulang meski laut sedang berubah.",
      "Sang istri terus menunggu di tepi pantai. Karena penantian yang sangat panjang, keduanya dipercaya berubah menjadi batu yang saling berhadapan.",
      "Hari berganti bulan, dan warga melihat sosok itu tetap berada di tempatnya. Batu-batu yang tampak seperti dua orang yang saling menanti kemudian menjadi bagian dari cerita tentang janji yang tidak dilupakan.",
      "Bagi masyarakat pesisir, kisah tersebut juga menyimpan kesadaran bahwa laut tidak selalu bisa ditebak. Orang yang pergi melaut harus menghormati cuaca, membaca tanda alam, dan tidak menganggap remeh kekuatan ombak.",
      "Karang Nini kemudian menjadi simbol kesetiaan dan pengingat agar manusia menghormati laut serta tidak melupakan orang-orang yang menunggu di rumah.",
    ],
  },
  {
    id: "talaga-manggung",
    title: "Sasakala Talaga Manggung",
    place: "Talaga, Majalengka",
    area: "Sumedang-Majalengka",
    category: "Legenda tempat",
    duration: "6 menit",
    excerpt: "Cerita tentang telaga, keluarga kerajaan, dan pesan untuk menjaga keselarasan dengan alam.",
    lesson: "Keserakahan dapat merusak rumah yang dibangun bersama.",
    color: "#a16207",
    mark: "TM",
    body: [
      "Talaga Manggung dikenal melalui cerita yang menghubungkan sebuah telaga dengan keluarga kerajaan dan perjalanan leluhur masyarakat setempat.",
      "Keluarga yang tinggal di kawasan itu digambarkan memiliki kedudukan dan tanggung jawab besar. Mereka harus menjaga hubungan dengan warga, merawat sumber air, dan memastikan keputusan kerajaan tidak merusak kehidupan bersama.",
      "Dalam berbagai versi, muncul konflik tentang harta, kekuasaan, dan janji yang dilanggar. Peristiwa besar kemudian mengubah tempat tinggal mereka dan membentuk telaga yang dikenang hingga kini.",
      "Konflik tersebut membuat keluarga yang sebelumnya hidup dalam kemewahan harus berhadapan dengan akibat dari pilihannya sendiri. Tempat tinggal, harta, dan nama baik tidak dapat dipertahankan ketika amanah diabaikan.",
      "Seiring waktu, masyarakat menghubungkan bentang telaga dengan kisah itu. Air dan lingkungan sekitarnya menjadi pengingat bahwa alam dapat menyimpan jejak dari keputusan manusia.",
      "Sasakala ini diwariskan sebagai pengingat untuk menjaga hubungan keluarga, lingkungan, dan amanah dari para pendahulu.",
    ],
  },
  {
    id: "prabu-geusan-ulun",
    title: "Prabu Geusan Ulun",
    place: "Sumedang Larang",
    area: "Sumedang-Majalengka",
    category: "Kisah kerajaan",
    duration: "8 menit",
    excerpt: "Kisah kepemimpinan Sumedang Larang dan pusaka yang menjadi lambang identitas masyarakat Sumedang.",
    lesson: "Identitas tumbuh dari keberanian menjaga nilai dan amanah.",
    color: "#9f1239",
    mark: "GU",
    body: [
      "Prabu Geusan Ulun dikenal sebagai salah satu tokoh penting dalam kisah Sumedang Larang. Cerita tentangnya berkaitan dengan kepemimpinan, hubungan antarwilayah, dan perjalanan pusaka kerajaan.",
      "Sebagai pemimpin, ia harus menghadapi perubahan zaman dan menjaga agar kerajaan tetap memiliki arah. Keputusan yang diambil di lingkungan istana selalu berhubungan dengan kehidupan petani, penjaga wilayah, dan keluarga-keluarga yang berada jauh dari pusat kekuasaan.",
      "Dalam tradisi Sumedang, pusaka dan kisah kerajaan tidak hanya menyimpan kebanggaan, tetapi juga tanggung jawab untuk menjaga martabat serta kesejahteraan masyarakat.",
      "Pusaka menjadi lambang amanah karena tidak boleh diperlakukan sebagai benda biasa. Orang yang menjaganya diharapkan mampu menjaga ucapan, menepati janji, dan memikirkan akibat dari setiap tindakan.",
      "Kisah kepemimpinan Prabu Geusan Ulun kemudian terus dihubungkan dengan identitas Sumedang. Ia mengingatkan bahwa kebesaran sebuah daerah tidak hanya terlihat dari sejarah kerajaannya, tetapi juga dari cara masyarakat merawat nilai yang diwariskan.",
      "Kisah ini mengajak pembaca memahami bahwa warisan budaya hidup melalui perawatan, penghormatan, dan pengetahuan yang diteruskan.",
    ],
  },
  {
    id: "ratu-laut-selatan",
    title: "Ratu Laut Selatan",
    place: "Pelabuhan Ratu, Sukabumi",
    area: "Sukabumi-Cianjur",
    category: "Legenda pesisir",
    duration: "7 menit",
    excerpt: "Legenda pesisir selatan yang mengajarkan penghormatan kepada laut dan kekuatan alam.",
    lesson: "Alam memiliki kekuatan yang harus dihormati, bukan ditantang.",
    color: "#1e3a8a",
    mark: "RL",
    body: [
      "Masyarakat pesisir selatan Jawa mengenal berbagai versi cerita tentang Ratu Laut Selatan, sosok yang dipercaya menjaga keseimbangan dan kekuatan laut.",
      "Dalam sebagian versi, tokoh ini digambarkan sebagai seorang perempuan dari lingkungan kerajaan yang mengalami perubahan besar dalam hidupnya. Ia kemudian dikaitkan dengan laut dan dipercaya memiliki hubungan dengan wilayah pesisir yang luas.",
      "Kisah ini hidup bersama aturan, pantangan, dan nasihat bagi orang yang beraktivitas di pantai. Laut dipandang sebagai ruang yang indah sekaligus memiliki bahaya.",
      "Para nelayan dan warga pesisir membaca cerita tersebut bersama pengalaman sehari-hari: perubahan angin, gelombang tinggi, dan musim yang menentukan keselamatan. Pantangan yang menyertainya sering berfungsi sebagai pengingat untuk tidak bertindak ceroboh.",
      "Karena berkembang melalui tradisi lisan, nama, asal-usul, dan peristiwa dalam kisah ini dapat berbeda antara satu daerah dengan daerah lain. Yang tetap bertahan adalah penghormatan terhadap laut dan batas kemampuan manusia.",
      "Terlepas dari versinya, pesan yang paling penting adalah menjaga keselamatan, menghormati alam, dan tidak merusak kawasan pesisir.",
    ],
  },
  {
    id: "gunung-padang",
    title: "Sasakala Gunung Padang",
    place: "Cianjur",
    area: "Sukabumi-Cianjur",
    category: "Legenda pegunungan",
    duration: "7 menit",
    excerpt: "Cerita tentang teras batu, leluhur, dan hubungan masyarakat dengan lanskap pegunungan Cianjur.",
    lesson: "Tempat tua perlu dipelajari dengan hormat dan kehati-hatian.",
    color: "#475569",
    mark: "GP",
    body: [
      "Gunung Padang dikelilingi oleh cerita tentang leluhur, bangunan batu, dan tempat yang dianggap istimewa oleh masyarakat sekitar. Kisah-kisahnya berkembang dalam banyak versi.",
      "Orang-orang yang datang ke kawasan itu sering mendengar cerita tentang perjalanan para pendahulu menuju puncak dan teras-teras yang disusun dengan tenaga besar. Bagi warga, bukit dan batu tidak terpisah dari ingatan tentang leluhur.",
      "Sebagian cerita menghubungkan susunan teras batu dengan perjalanan para pendahulu dan ritual penghormatan kepada alam. Pengetahuan lokal tersebut hidup berdampingan dengan penelitian arkeologi.",
      "Ketika berada di sana, pengunjung diajak memperhatikan bentuk lereng, susunan batu, dan suasana hening di sekitar situs. Semua itu membuat tempat tersebut terasa seperti ruang untuk belajar, bukan sekadar latar untuk berfoto.",
      "Cerita warga dan hasil penelitian dapat saling melengkapi, tetapi tidak boleh dicampur sebagai satu kesimpulan. Masing-masing memiliki cara sendiri dalam menjelaskan hubungan manusia dengan tempat yang telah lama dihuni.",
      "Legenda ini mengajak kita menjaga situs, mendengar cerita warga, dan membedakan antara tradisi lisan dengan kesimpulan ilmiah.",
    ],
  },
  {
    id: "situ-wanayasa",
    title: "Legenda Situ Wanayasa",
    place: "Wanayasa, Purwakarta",
    area: "Purwakarta-Subang",
    category: "Legenda tempat",
    duration: "6 menit",
    excerpt: "Kisah telaga di kaki pegunungan yang menyimpan pesan tentang keselarasan manusia dan alam.",
    lesson: "Air dan tanah adalah titipan yang harus dijaga bersama.",
    color: "#047857",
    mark: "SW",
    body: [
      "Situ Wanayasa berada di kawasan yang dikelilingi perbukitan dan perkebunan. Masyarakat setempat menyimpan cerita tentang asal-usul telaga dan hubungan manusia dengan mata air.",
      "Air dari kawasan tersebut membantu kehidupan warga, mulai dari kebutuhan rumah tangga hingga kebun dan sawah. Karena itu, keberadaan telaga tidak hanya dipandang sebagai pemandangan, tetapi juga sebagai bagian dari keseharian.",
      "Dalam berbagai versi sasakala, telaga menjadi pengingat bahwa keserakahan dan kelalaian dapat mengganggu keseimbangan alam.",
      "Ketika pepohonan ditebang dan sumber air tidak dijaga, kehidupan di sekitar danau ikut berubah. Cerita asal-usul kemudian menjadi cara masyarakat menyampaikan akibat dari tindakan yang dilakukan tanpa memikirkan generasi berikutnya.",
      "Orang-orang yang datang ke Situ Wanayasa diharapkan menjaga tepian air, membawa pulang sampah, dan tidak merusak tanaman. Perawatan kecil yang dilakukan bersama membuat telaga tetap menjadi ruang hidup, bukan hanya tempat singgah.",
      "Kisah ini relevan untuk dibaca kembali saat kita menjaga sumber air, pepohonan, dan ruang hidup di sekitar danau.",
    ],
  },
  {
    id: "nyi-endang-darma-ayu",
    title: "Nyi Endang Darma Ayu",
    place: "Indramayu",
    area: "Pantura Jawa Barat",
    category: "Asal-usul daerah",
    duration: "7 menit",
    excerpt: "Kisah tokoh perempuan yang namanya dipercaya menjadi asal-usul nama Indramayu.",
    lesson: "Sebuah daerah dibentuk oleh perjalanan dan keberanian banyak orang.",
    color: "#c2410c",
    mark: "ED",
    body: [
      "Dalam cerita yang berkembang di Indramayu, Nyi Endang Darma Ayu adalah tokoh perempuan yang melakukan perjalanan dan membuka hubungan dengan masyarakat di wilayah pesisir.",
      "Ia digambarkan sebagai sosok yang berani mengambil keputusan dan mampu menyesuaikan diri dengan lingkungan baru. Perjalanan yang dilakukan bukan hanya perpindahan tempat, tetapi juga proses membangun kepercayaan dengan orang-orang yang ditemuinya.",
      "Nama dan kisahnya kemudian dihubungkan dengan asal-usul Indramayu. Seperti banyak cerita asal-usul daerah, terdapat beberapa versi yang diwariskan oleh masyarakat.",
      "Dalam satu versi, pertemuan antarkelompok dan pembukaan tempat tinggal menjadi bagian penting dari cerita. Dalam versi lain, penekanan diberikan pada tokoh dan hubungan keluarga yang kemudian membentuk nama daerah.",
      "Perbedaan tersebut menunjukkan bahwa sebuah nama dapat menyimpan banyak lapisan ingatan. Di balik cerita asal-usul, ada kisah tentang perjalanan, kerja, sungai, dan masyarakat yang berusaha membangun kehidupan di pesisir.",
      "Cerita ini mengingatkan bahwa identitas pesisir terbentuk dari pertemuan, perjalanan, dan kerja bersama.",
    ],
  },
  {
    id: "asal-usul-karawang",
    title: "Sasakala Asal-usul Karawang",
    place: "Karawang",
    area: "Pantura Jawa Barat",
    category: "Asal-usul daerah",
    duration: "6 menit",
    excerpt: "Kisah tentang bentang sawah dan perjalanan masyarakat yang membentuk nama serta identitas Karawang.",
    lesson: "Tanah yang subur membawa tanggung jawab untuk dirawat.",
    color: "#15803d",
    mark: "KR",
    body: [
      "Karawang dikenal sebagai wilayah sawah yang luas. Masyarakat menyimpan beragam cerita tentang asal nama daerah dan pembukaan lahan yang kemudian menjadi sumber pangan.",
      "Para pendahulu harus membaca arah sungai, mengatur air, dan mengolah tanah yang kadang tergenang. Pekerjaan itu dilakukan bersama karena satu petak sawah tidak dapat berdiri sendiri tanpa saluran dan kerja tetangga.",
      "Dalam sasakala yang berkembang, perjalanan tokoh dan perubahan bentang alam menjadi bagian dari penjelasan tentang kehidupan masyarakat di sepanjang sungai dan pesisir.",
      "Nama tempat, pematang, dan aliran air kemudian menjadi penanda bagi cerita keluarga. Dari sana, anak-anak belajar bahwa sawah yang terlihat luas adalah hasil dari pengetahuan, ketekunan, dan perawatan yang berlangsung lama.",
      "Ketika panen tiba, kegembiraan tidak hanya dirasakan oleh pemilik lahan. Banyak orang terlibat di dalamnya, mulai dari penggarap, penjaga air, hingga warga yang membantu membawa hasil panen pulang.",
      "Cerita ini mengajak kita menghargai petani, irigasi, dan tanah yang selama berabad-abad menopang kehidupan.",
    ],
  },
  {
    id: "batu-hiu",
    title: "Legenda Batu Hiu",
    place: "Pangandaran",
    area: "Priangan Timur",
    category: "Legenda pantai",
    duration: "6 menit",
    excerpt: "Kisah batu karang berbentuk sirip hiu yang menjadi salah satu penanda pesisir selatan Pangandaran.",
    lesson: "Keindahan alam perlu dinikmati tanpa merusaknya.",
    color: "#0e7490",
    mark: "BH",
    body: [
      "Di pesisir Pangandaran, terdapat batu karang yang dari kejauhan tampak seperti sirip hiu. Masyarakat kemudian mengaitkan bentuknya dengan berbagai cerita tentang laut.",
      "Dalam beberapa versi, kisahnya berkaitan dengan rombongan yang datang ke pesisir dan menghadapi tanda-tanda alam yang tidak biasa. Bentuk batu tersebut kemudian dibaca sebagai pengingat agar manusia tidak meremehkan laut.",
      "Legenda Batu Hiu hidup sebagai cerita wisata sekaligus pengingat bahwa pantai menyimpan kekuatan, keindahan, dan bahaya yang perlu dihormati.",
      "Dari atas tebing, garis pantai terlihat luas dan ombak terus berubah mengikuti angin. Pemandangan itu membuat cerita terasa dekat: apa yang tampak indah tetap membutuhkan jarak, kehati-hatian, dan penghormatan.",
      "Masyarakat mewariskan kisah tersebut bersama aturan sederhana untuk pengunjung. Tidak mendekati batas berbahaya, tidak mengambil bagian karang, dan tetap menjaga pantai adalah cara untuk menghormati tempatnya.",
      "Saat berkunjung, menjaga kebersihan, mengikuti petunjuk keselamatan, dan tidak merusak karang adalah cara terbaik menghormati kisahnya.",
    ],
  },
];

const regions = [
  "Semua",
  "Garut",
  "Bandung Raya",
  "Bogor Raya",
  "Cirebon Raya",
  "Priangan Timur",
  "Sumedang-Majalengka",
  "Sukabumi-Cianjur",
  "Purwakarta-Subang",
  "Pantura Jawa Barat",
  "Tatar Sunda",
] as const;

function storyIllustration(storyId: string) {
  return `${import.meta.env.BASE_URL}images/cerita/${storyId}.jpg`;
}

const regionCounts = regions.reduce<Record<string, number>>((counts, region) => {
  counts[region] = region === "Semua" ? stories.length : stories.filter((story) => story.area === region).length;
  return counts;
}, {});

function StoryCard({ story, featured = false }: { story: Story; featured?: boolean }) {
  return (
    <article className={`story-card ${featured ? "story-card-featured" : ""}`}>
      <div className="story-card-image">
        <img
          src={storyIllustration(story.id)}
          alt={`Ilustrasi ${story.title}`}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className="story-card-top">
        <span
          className="story-mark"
          style={{ backgroundColor: `${story.color}18`, color: story.color }}
          aria-hidden="true"
        >
          {story.mark}
        </span>
        <div className="story-card-meta">
          <span>{story.category}</span>
          <span className="story-meta-dot" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" />{story.duration}</span>
        </div>
      </div>
      <h2 className="story-title">{story.title}</h2>
      <div className="story-place">
        <MapPin className="h-3.5 w-3.5 shrink-0" />
        <span>{story.place}</span>
        <span className="story-place-divider" aria-hidden="true">/</span>
        <span>{story.area}</span>
      </div>
      <p className="story-excerpt">{story.excerpt}</p>
      <blockquote className="story-lesson">“{story.lesson}”</blockquote>
      <Link
        href={`/cerita-rakyat/${story.id}`}
        className="story-read-button"
      >
        Baca cerita <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

export function CeritaRakyatDetailPage() {
  const [, params] = useRoute("/cerita-rakyat/:id");
  const story = stories.find((item) => item.id === params?.id);

  if (!story) {
    return (
      <Layout>
        <SEO title="Cerita tidak ditemukan" description="Cerita rakyat yang kamu cari tidak ditemukan." path="/cerita-rakyat" />
        <main className="folklore-page min-h-screen">
          <section className="folklore-detail-missing mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
            <BookOpenText className="mx-auto h-10 w-10" />
            <h1>Cerita belum ditemukan</h1>
            <p>Mungkin tautannya sudah berubah. Kamu bisa kembali ke kumpulan cerita rakyat Jawa Barat.</p>
            <Link href="/cerita-rakyat" className="story-read-button mx-auto">Kembali ke daftar <ArrowRight className="h-4 w-4" /></Link>
          </section>
        </main>
      </Layout>
    );
  }

  const relatedStories = stories
    .filter((item) => item.id !== story.id && item.area === story.area)
    .slice(0, 3);

  return (
    <Layout>
      <SEO
        title={`${story.title} — Cerita Rakyat Jawa Barat`}
        description={story.excerpt}
        keywords={`${story.title}, cerita rakyat Jawa Barat, legenda Sunda, ${story.place}`}
        path={`/cerita-rakyat/${story.id}`}
      />
      <main className="folklore-page folklore-detail-page min-h-screen">
        <header className="folklore-detail-hero">
          <div className="folklore-detail-hero-inner mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <Link href="/cerita-rakyat" className="folklore-back-link">
              <ArrowLeft className="h-4 w-4" /> Semua cerita
            </Link>
            <div className="folklore-detail-heading">
              <div>
                <p className="folklore-kicker">{story.category}</p>
                <h1>{story.title}</h1>
                <div className="folklore-detail-meta">
                  <span><MapPin className="h-4 w-4" />{story.place}</span>
                  <span className="folklore-detail-meta-dot" aria-hidden="true">·</span>
                  <span><Clock3 className="h-4 w-4" />{story.duration} baca</span>
                </div>
              </div>
              <div
                className="folklore-detail-mark"
                style={{ backgroundColor: `${story.color}18`, borderColor: `${story.color}55`, color: story.color }}
                aria-hidden="true"
              >
                {story.mark}
              </div>
            </div>
          </div>
        </header>

        <div className="folklore-detail-layout mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <article className="folklore-reading-card">
            <figure className="folklore-detail-illustration">
              <img
                src={storyIllustration(story.id)}
                alt={`Ilustrasi budaya untuk cerita ${story.title}`}
                loading="eager"
                decoding="async"
              />
              <figcaption>
                <span>{story.place} · Jawa Barat</span>
              </figcaption>
            </figure>
            <div className="folklore-reading-lead">
              <p>{story.excerpt}</p>
              <blockquote>“{story.lesson}”</blockquote>
            </div>
            <div className="folklore-reading-body">
              {story.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className="folklore-reading-note">
              Catatan: cerita rakyat memiliki banyak versi yang berkembang di masyarakat. Ringkasan ini disajikan sebagai pengantar budaya.
            </p>
            <Link href="/cerita-rakyat" className="folklore-reading-back">
              <ArrowLeft className="h-4 w-4" /> Baca cerita lainnya
            </Link>
          </article>

          <aside className="folklore-related">
            <p className="folklore-eyebrow">Dari wilayah yang sama</p>
            <h2>Cerita lainnya</h2>
            {relatedStories.length > 0 ? (
              <div className="folklore-related-list">
                {relatedStories.map((relatedStory) => (
                  <Link key={relatedStory.id} href={`/cerita-rakyat/${relatedStory.id}`} className="folklore-related-item">
                    <span
                      className="folklore-related-mark"
                      style={{ backgroundColor: `${relatedStory.color}18`, color: relatedStory.color }}
                      aria-hidden="true"
                    >
                      {relatedStory.mark}
                    </span>
                    <span>
                      <strong>{relatedStory.title}</strong>
                      <small>{relatedStory.duration} baca</small>
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="folklore-related-empty">Jelajahi cerita dari wilayah Jawa Barat lainnya.</p>
            )}
          </aside>
        </div>
      </main>
    </Layout>
  );
}

export default function CeritaRakyatPage() {
  const [query, setQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<(typeof regions)[number]>("Semua");

  const filteredStories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return stories.filter((story) => {
      const matchesRegion = activeRegion === "Semua" || story.area === activeRegion;
      const matchesQuery = !normalizedQuery
        || `${story.title} ${story.place} ${story.category} ${story.excerpt}`.toLowerCase().includes(normalizedQuery);
      return matchesRegion && matchesQuery;
    });
  }, [activeRegion, query]);

  const folkloreIntro = activeRegion === "Semua"
    ? "Cerita dari berbagai wilayah Jawa Barat, dikisahkan ulang secara ringkas sebagai pengantar untuk mengenal warisan lokal."
    : `Cerita dari wilayah ${activeRegion}, dikisahkan ulang secara ringkas sebagai pengantar untuk mengenal warisan lokal.`;

  return (
    <Layout>
      <SEO
        title="Cerita Rakyat Jawa Barat"
        description="Baca cerita rakyat dari berbagai wilayah Jawa Barat, mulai dari Garut, Bandung, Bogor, Cirebon, Priangan Timur, hingga pesisir Pantura."
        keywords="cerita rakyat Jawa Barat, legenda Sunda, cerita rakyat Garut, Bandung, Bogor, Cirebon, Priangan Timur, budaya Jawa Barat"
        path="/cerita-rakyat"
      />
      <main className="folklore-page min-h-screen">
        <header className="folklore-hero">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[1fr_.88fr] lg:gap-14 lg:px-10 lg:py-9">
            <div>
              <h1 className="folklore-heading">Cerita rakyat<br /><span>Jawa Barat</span></h1>
              <p className="folklore-intro">
                {folkloreIntro}
              </p>
              <div className="folklore-hero-stats" aria-label="Ringkasan koleksi cerita">
                <span><strong>{stories.length}</strong> cerita</span>
                <span className="folklore-hero-stats-divider" aria-hidden="true" />
                <span><strong>{regions.length - 1}</strong> wilayah</span>
                <span className="folklore-hero-stats-divider" aria-hidden="true" />
                <span><strong>6–9</strong> menit baca</span>
              </div>
            </div>
            <figure className="folklore-landscape">
              <img
                src={`${import.meta.env.BASE_URL}images/nempo-folklore-jawa-barat.png`}
                alt="Ilustrasi budaya Jawa Barat dengan perempuan Sunda, danau, sawah, rumah tradisional, dan gunung"
                loading="eager"
                decoding="async"
              />
              <figcaption><span>Cerita rakyat Jawa Barat</span><span>Situ Bagendit · Tatar Sunda</span></figcaption>
            </figure>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:px-10">
          <div className="folklore-section-head">
            <div>
              <p className="folklore-eyebrow">Kumpulan cerita</p>
              <h2 className="folklore-section-title">Pilih cerita untuk dibaca</h2>
              <p className="folklore-section-description">Legenda, sasakala, dan kisah yang tumbuh dari tempat-tempat di Jawa Barat.</p>
            </div>
            <label className="folklore-search">
              <Search className="h-4 w-4 shrink-0" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari judul atau daerah"
                aria-label="Cari cerita rakyat"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Hapus pencarian">
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
          </div>

          <div className="folklore-filter">
            <div className="folklore-filter-head">
              <div>
                <p className="folklore-eyebrow">Jelajahi per wilayah</p>
                <p className="folklore-filter-current">
                  Menampilkan <strong>{activeRegion === "Semua" ? "semua wilayah" : activeRegion}</strong>
                </p>
              </div>
              <span className="folklore-result-count">{filteredStories.length} cerita</span>
            </div>
            <div className="folklore-region-list" role="group" aria-label="Filter cerita berdasarkan wilayah">
              {regions.map((region) => {
                const selected = activeRegion === region;
                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setActiveRegion(region)}
                    aria-pressed={selected}
                    className={`folklore-region ${selected ? "is-selected" : ""}`}
                  >
                    <span>{region === "Semua" ? "Semua wilayah" : region}</span>
                    <span className="folklore-region-count">{regionCounts[region]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {filteredStories.length > 0 ? (
             <div className="folklore-story-grid">
              {filteredStories.map((story, index) => (
                <StoryCard key={story.id} story={story} featured={index === 0} />
              ))}
            </div>
          ) : (
            <div className="folklore-empty">
              <BookOpenText className="mx-auto h-8 w-8" />
              <h3>Cerita belum ditemukan</h3>
              <p>Coba gunakan kata kunci lain atau pilih wilayah yang berbeda.</p>
              <button type="button" onClick={() => { setQuery(""); setActiveRegion("Semua"); }}>
                Tampilkan semua cerita <ChevronDown className="h-4 w-4 -rotate-90" />
              </button>
            </div>
          )}

          <aside className="folklore-share">
            <div className="folklore-share-copy">
              <span className="folklore-share-icon"><Feather className="h-5 w-5" /></span>
              <div>
                <h2>Punya versi cerita dari keluargamu?</h2>
                <p>Cerita rakyat hidup karena terus diceritakan. Bagikan versi lokal yang kamu kenal kepada Nempo.</p>
              </div>
            </div>
            <a href="mailto:halo@nempo.id?subject=Berbagi%20Cerita%20Rakyat" className="folklore-share-button">
              Bagikan cerita <ArrowRight className="h-4 w-4" />
            </a>
          </aside>
        </section>
      </main>
    </Layout>
  );
}