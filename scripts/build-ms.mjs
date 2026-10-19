// Builds the Malay page (ms/index.html) from the English page (index.html).
// The structure, images and scripts stay identical; only the text is swapped.
// Every English string must be found, so a change to index.html that is not
// reflected here stops the build instead of leaving English text on the Malay page.
//
// Usage: node scripts/build-ms.mjs

import { readFile, writeFile, mkdir } from 'node:fs/promises';

let s = await readFile('index.html', 'utf8');
const crlf = s.includes('\r\n');
s = s.replace(/\r\n/g, '\n');

const missing = [];
function t(en, ms) {
    if (!s.includes(en)) { missing.push(en); return; }
    s = s.split(en).join(ms);
}

// ---------- Document and paths ----------
t('<html lang="en">', '<html lang="ms">');
t('<title>Zahir | Software developer</title>', '<title>Zahir | Pembangun perisian</title>');
t('content="Muhammad Zahiruddin (Zahir), software developer in Petaling Jaya. Eight web systems and apps in use, from a civic map of Malaysia to an organiser app on Google Play."',
  'content="Muhammad Zahiruddin (Zahir), pembangun perisian di Petaling Jaya. Lapan sistem web dan aplikasi sedang digunakan, daripada peta maklumat awam Malaysia hingga aplikasi pengurus diri di Google Play."');
t('href="style.css', 'href="../style.css');
t('href="images/', 'href="../images/');
t('src="images/', 'src="../images/');
t('href="site.webmanifest"', 'href="../site.webmanifest"');
t('href="file/', 'href="../file/');
t('src="chat.js', 'src="../chat.js');

// ---------- Header ----------
t('<a class="skip-link" href="#work">Skip to projects</a>', '<a class="skip-link" href="#work">Langkau ke projek</a>');
t('<nav aria-label="Main">', '<nav aria-label="Utama">');
t('class="nav-link">Work</a>', 'class="nav-link">Projek</a>');
t('class="nav-link">Capabilities</a>', 'class="nav-link">Keupayaan</a>');
t('class="nav-link">About</a>', 'class="nav-link">Tentang</a>');
t('class="nav-link">Contact</a>', 'class="nav-link">Hubungi</a>');
t('<a class="lang-switch" href="ms/" lang="ms" hreflang="ms" aria-label="Baca dalam Bahasa Melayu">BM</a>',
  '<a class="lang-switch" href="../" lang="en" hreflang="en" aria-label="Read in English">EN</a>');

// ---------- Hero ----------
t('Muhammad Zahiruddin · Software developer · Petaling Jaya', 'Muhammad Zahiruddin · Pembangun perisian · Petaling Jaya');
t('I build websites and mobile apps that businesses use every day.',
  'Saya membina laman web dan aplikasi mudah alih untuk kegunaan harian perniagaan.');
t('Eight are in use right now, including a map that shows Malaysians who their elected representatives are, a personal organiser app for Android on Google Play, an AI tool that writes reports for PR teams, and a ticket shop for a big construction conference.',
  'Lapan sedang digunakan sekarang, termasuk peta wakil rakyat Malaysia, aplikasi pengurus diri untuk Android di Google Play, alat AI yang menulis laporan untuk pasukan perhubungan awam dan kedai tiket persidangan pembinaan.');
t('class="btn btn-primary">See the projects</a>', 'class="btn btn-primary">Lihat projek</a>');
t('>Download résumé (PDF)</a>', '>Muat turun resume (PDF)</a>');
t('<nav class="hero-index" aria-label="Projects">', '<nav class="hero-index" aria-label="Projek">');
t('<p class="hero-index-title">Live now</p>', '<p class="hero-index-title">Sedang digunakan</p>');
t('<span class="hero-index-kind">Who is my MP map</span>', '<span class="hero-index-kind">Peta wakil rakyat</span>');
t('<span class="hero-index-kind">Android app, Google Play</span>', '<span class="hero-index-kind">Aplikasi Android, Google Play</span>');
t('<span class="hero-index-kind">AI report writer</span>', '<span class="hero-index-kind">Penulis laporan AI</span>');
t('<span class="hero-index-kind">Conference tickets</span>', '<span class="hero-index-kind">Tiket persidangan</span>');
t('<span class="hero-index-kind">Shipping company site</span>', '<span class="hero-index-kind">Laman syarikat perkapalan</span>');
t('>Also live: MyGooners, EST Group, SMK Seremban 3</a>', '>Turut digunakan: MyGooners, EST Group, SMK Seremban 3</a>');
t('<dt>Full-time experience</dt>', '<dt>Pengalaman sepenuh masa</dt>');
t('<span id="statExperience">1 yr 6 mo</span>', '<span id="statExperience">1 tahun 6 bulan</span>');
t('<span class="fact-note">+ 6 mo internship</span>', '<span class="fact-note">+ 6 bulan latihan industri</span>');
t('<dt>Projects in use</dt>', '<dt>Projek yang digunakan</dt>');
t('<span class="fact-note">Including 1 freelance and 2 of my own</span>', '<span class="fact-note">Termasuk 1 kerja bebas dan 2 projek sendiri</span>');
t('<dt>Main tools</dt>', '<dt>Alat utama</dt>');

// ---------- Plain words ----------
t('<h2 id="plainTitle" class="plain-title">How I work</h2>', '<h2 id="plainTitle" class="plain-title">Cara saya bekerja</h2>');
t('<h3>I find out what the business needs</h3>', '<h3>Saya mengenal pasti keperluan perniagaan</h3>');
t('<p>Selling tickets online, taking orders, letting staff update their own website. I talk to the people involved until the problem is clear.</p>',
  '<p>Menjual tiket dalam talian, menerima pesanan atau membolehkan kakitangan mengemas kini laman web sendiri. Saya berbincang dengan pihak yang terlibat sehingga masalahnya jelas.</p>');
t('<h3>I build the website, app or system</h3>', '<h3>Saya membina laman web, aplikasi atau sistem</h3>');
t('<p>The screens people use on their computer or phone, and the parts behind the scenes that store information, take payments and send emails.</p>',
  '<p>Skrin yang digunakan orang ramai di komputer atau telefon, serta bahagian di sebalik tabir yang menyimpan maklumat, menerima bayaran dan menghantar e-mel.</p>');
t('<h3>I put it online and keep it running</h3>', '<h3>Saya melancarkan dan memastikan sistem terus berjalan</h3>');
t('<p>I launch it, fix problems when they come up, add new features, and show staff how to use it.</p>',
  '<p>Saya melancarkannya, membaiki masalah apabila timbul, menambah ciri baharu dan mengajar kakitangan cara menggunakannya.</p>');

// ---------- Work ----------
t('<p class="eyebrow">Selected work</p>', '<p class="eyebrow">Projek pilihan</p>');
t('Eight projects, all in use today.', 'Lapan projek, semuanya sedang digunakan.');
t('Every one of these is real and running. Click a picture to open the actual site.',
  'Setiap projek ini nyata dan sedang beroperasi. Klik gambar untuk membuka laman yang sebenar.');
t('<h4>The problem</h4>', '<h4>Masalah</h4>');
t('<h4>What I built</h4>', '<h4>Apa yang saya bina</h4>');
t('<h4>The result</h4>', '<h4>Hasil</h4>');
t('<dt>Client</dt>', '<dt>Klien</dt>');
t('<h3 class="more-title" id="more">Also live</h3>', '<h3 class="more-title" id="more">Turut digunakan</h3>');
s = s.replace(/<p class="project-stack">Built with /g, '<p class="project-stack">Dibina dengan ');
s = s.replace(/>Visit ([^<]+) <span aria-hidden="true">↗<\/span>/g, '>Lawati $1 <span aria-hidden="true">↗</span>');
s = s.replace(/aria-label="Open ([^"]+) live site"/g, 'aria-label="Buka laman $1"');

// mySekilas
t('alt="mySekilas map of Malaysia with state governments and live news"', 'alt="Peta Malaysia mySekilas dengan kerajaan negeri dan berita terkini"');
t('<p class="project-kind">My own project · Public information</p>', '<p class="project-kind">Projek sendiri · Maklumat awam</p>');
t('A free website where anyone in Malaysia can find out who their elected representatives are, which party runs their state, and what is in the news there. In Malay and English.',
  'Laman web percuma yang membolehkan sesiapa sahaja di Malaysia mengetahui siapa wakil rakyat mereka, parti yang memerintah negeri mereka dan berita terkini di negeri itu. Dalam bahasa Melayu dan bahasa Inggeris.');
t('To find out who represents you and what is happening in your state, you would have to dig through government websites, election results and many news sites.',
  'Untuk mengetahui siapa wakil rakyat anda dan apa yang berlaku di negeri anda, anda terpaksa menyemak laman web kerajaan, keputusan pilihan raya dan banyak laman berita.');
t('<li>A map of Malaysia you can search by area, postcode or name</li>', '<li>Peta Malaysia yang boleh dicari mengikut kawasan, poskod atau nama</li>');
t('<li>A "Who is my YB?" button that finds your representatives from your location, without your location ever leaving your phone or computer</li>',
  '<li>Butang "Siapa YB saya?" yang mencari wakil rakyat anda berdasarkan lokasi, tanpa lokasi itu keluar dari telefon atau komputer anda</li>');
t('<li>How many seats each party holds in Parliament, and who runs each state, checked against official government sites</li>',
  '<li>Bilangan kerusi setiap parti di Parlimen dan kerajaan setiap negeri, disemak dengan laman rasmi kerajaan</li>');
t('<li>News collected automatically from many Malaysian news sites, with the same story from different sites shown together and sorted by state and topic</li>',
  '<li>Berita yang dikumpulkan secara automatik daripada banyak laman berita Malaysia; berita yang sama daripada laman berlainan dipaparkan bersama dan disusun mengikut negeri dan topik</li>');
t('<li>Short AI-written summaries of big stories, and a daily round-up</li>', '<li>Ringkasan berita utama yang ditulis oleh AI, dan rumusan harian</li>');
t('<li>A guide to who to contact about a problem, and a short political history</li>', '<li>Panduan tentang pihak yang patut dihubungi bagi sesuatu masalah, dan sejarah politik ringkas</li>');

// Uros
t('alt="Uros dashboard with finance, notes and diary"', 'alt="Papan pemuka Uros dengan kewangan, nota dan diari"');
t('alt="Uros spending by category chart"', 'alt="Carta perbelanjaan mengikut kategori dalam Uros"');
t('alt="Uros diary calendar"', 'alt="Kalendar diari Uros"');
t('<p class="project-kind">My own app · Personal organiser</p>', '<p class="project-kind">Aplikasi sendiri · Pengurus diri</p>');
t('A private personal organiser: track spending against a monthly budget, keep notes and write a diary, all in one app. Published on Google Play, with a web version too, in English and Malay.',
  'Aplikasi pengurus diri yang peribadi: menjejak perbelanjaan berbanding bajet bulanan, menyimpan nota dan menulis diari dalam satu aplikasi. Diterbitkan di Google Play, turut tersedia dalam versi web, dalam bahasa Inggeris dan bahasa Melayu.');
t('<dt>Available on</dt><dd>Google Play and the web</dd>', '<dt>Tersedia di</dt><dd>Google Play dan web</dd>');
t('<li>Spending tracked by category, monthly budgets, charts and PDF reports</li>', '<li>Perbelanjaan dijejak mengikut kategori, bajet bulanan, carta dan laporan PDF</li>');
t('<li>Notes you can pin and search, with a private PIN for sensitive ones</li>', '<li>Nota yang boleh disemat dan dicari, dengan PIN peribadi bagi nota sulit</li>');
t('<li>A daily diary with a calendar view</li>', '<li>Diari harian dengan paparan kalendar</li>');
t('<li>Sign-in with Google or email, optional two-step verification, and a list of signed-in devices you can sign out remotely</li>',
  '<li>Log masuk dengan Google atau e-mel, pengesahan dua langkah pilihan, dan senarai peranti yang sedang log masuk yang boleh dilog keluar dari jauh</li>');
t('<li>Optional spending alerts on Telegram, plus light and dark themes</li>', '<li>Makluman perbelanjaan melalui Telegram (pilihan), serta tema cerah dan gelap</li>');
t('<li>An Android app made with Flutter and published on Google Play, and a web version made with React, both running on a Spring Boot backend</li>',
  '<li>Aplikasi Android yang dibina dengan Flutter dan diterbitkan di Google Play, serta versi web yang dibina dengan React; kedua-duanya menggunakan sistem belakang Spring Boot</li>');
t('>Get it on Google Play <span aria-hidden="true">↗</span></a>', '>Dapatkan di Google Play <span aria-hidden="true">↗</span></a>');
t('>Open the web version <span aria-hidden="true">↗</span></a>', '>Buka versi web <span aria-hidden="true">↗</span></a>');
t('aria-label="Open Uros on Google Play"', 'aria-label="Buka Uros di Google Play"');

// NUJUM
t('alt="NUJUM dashboard"', 'alt="Papan pemuka NUJUM"');
t('<p class="project-kind">AI report writer for PR teams</p>', '<p class="project-kind">Penulis laporan AI untuk pasukan perhubungan awam</p>');
t('A tool for public relations and communications teams. Give it a topic or a social media account, answer a few questions, and it writes a report on what people are saying and what may happen next, listing every source it used.',
  'Alat untuk pasukan perhubungan awam dan komunikasi. Berikan topik atau akaun media sosial, jawab beberapa soalan, dan alat ini akan menulis laporan tentang perkara yang diperkatakan dan kemungkinan yang akan berlaku, berserta senarai semua sumber yang digunakan.');
t('Going through news, posts and documents by hand took so long that warnings and advice often came too late.',
  'Menyemak berita, hantaran dan dokumen secara manual mengambil masa yang terlalu lama sehingga amaran dan nasihat sering terlewat.');
t('<li>Six kinds of report, from forecasts and social media account checks to fact-checking a claim</li>',
  '<li>Enam jenis laporan, daripada ramalan dan semakan akaun media sosial hingga semakan fakta bagi sesuatu dakwaan</li>');
t('<li>Teams can upload their own documents and ask questions about them, and each answer shows where the facts came from</li>',
  '<li>Pasukan boleh memuat naik dokumen sendiri dan bertanya tentangnya; setiap jawapan menunjukkan sumber faktanya</li>');
t('<li>A morning briefing and one screen that tracks every issue the team is watching</li>',
  '<li>Taklimat pagi dan satu skrin yang memantau setiap isu yang diikuti oleh pasukan</li>');
t('<li>Reports to download or share by link, with a free trial and paid monthly plans for teams</li>',
  '<li>Laporan yang boleh dimuat turun atau dikongsi melalui pautan, dengan percubaan percuma dan pelan bulanan berbayar untuk pasukan</li>');
t('<p>Work that used to be slow and done by hand now takes minutes, and every report lists the news, posts and files it was based on.</p>',
  '<p>Kerja yang dahulunya lambat dan dibuat secara manual kini siap dalam beberapa minit, dan setiap laporan menyenaraikan berita, hantaran dan fail yang menjadi asasnya.</p>');

// BINA
t('alt="BINA conference ticketing page"', 'alt="Halaman tiket persidangan BINA"');
t('<p class="project-kind">Online ticket sales</p>', '<p class="project-kind">Jualan tiket dalam talian</p>');
t('The website where people sign up and buy tickets for BINA, a construction industry conference for Southeast Asia, held at MITEC in Kuala Lumpur.',
  'Laman web tempat orang ramai mendaftar dan membeli tiket untuk BINA, persidangan industri pembinaan Asia Tenggara yang diadakan di MITEC, Kuala Lumpur.');
t('Sign-ups and payments were handled by hand, which was slow and hard to keep track of with so many attendees.',
  'Pendaftaran dan bayaran diuruskan secara manual, menjadikannya lambat dan sukar dipantau kerana peserta terlalu ramai.');
t('<li>A page for each event in the conference</li>', '<li>Halaman bagi setiap acara dalam persidangan</li>');
t('<li>Online sign-up and payment by online banking or card</li>', '<li>Pendaftaran dan bayaran dalam talian melalui perbankan dalam talian atau kad</li>');
t('<li>Tickets sent to buyers digitally, with a record of what they bought</li>', '<li>Tiket dihantar kepada pembeli secara digital, berserta rekod pembelian</li>');
t('<li>A back office where organisers see every order and ticket</li>', '<li>Ruang pentadbiran tempat penganjur melihat setiap pesanan dan tiket</li>');
t('<p>Signing up, paying and getting a ticket all happen online now, and organisers manage everything from one place. They came back to use it again for the 2026 conference.</p>',
  '<p>Pendaftaran, bayaran dan penerimaan tiket kini dibuat sepenuhnya dalam talian, dan penganjur menguruskan semuanya dari satu tempat. Mereka kembali menggunakannya untuk persidangan 2026.</p>');

// ENADD
t('alt="ENADD Logistics home page with container port photo"', 'alt="Laman utama ENADD Logistics dengan foto pelabuhan kontena"');
t('<p class="project-kind">Freelance · Company website · Singapore</p>', '<p class="project-kind">Kerja bebas · Laman web syarikat · Singapura</p>');
t('The company website for a Singapore shipping and logistics company: what they move, how they move it, and how to ask for a price.',
  'Laman web korporat sebuah syarikat perkapalan dan logistik di Singapura: barang yang mereka hantar, cara penghantarannya dan cara meminta sebut harga.');
t('<li>The full website, designed from scratch for an overseas client</li>', '<li>Laman web lengkap yang direka bentuk dari awal untuk klien luar negara</li>');
t('<li>A page for each service: air and sea shipping, lorry transport between Malaysia and Singapore, warehousing and marine logistics</li>',
  '<li>Halaman bagi setiap perkhidmatan: penghantaran udara dan laut, pengangkutan lori antara Malaysia dengan Singapura, pergudangan dan logistik marin</li>');
t('<li>A "Get a quote" button on every page, so customers can ask for a price from anywhere on the site</li>',
  '<li>Butang "Get a quote" (minta sebut harga) pada setiap halaman, supaya pelanggan boleh meminta harga dari mana-mana bahagian laman</li>');

// Also live
t('alt="MyGooners fan community home page"', 'alt="Laman utama komuniti peminat MyGooners"');
t('<p class="project-kind">Fan website and online shop</p>', '<p class="project-kind">Laman peminat dan kedai dalam talian</p>');
t('A Malay-language website for Arsenal fans with news, videos, a list of trusted service providers and an online shop. I built the website and the back office the team uses to run it.',
  'Laman web berbahasa Melayu untuk peminat Arsenal yang memaparkan berita, video, senarai penyedia perkhidmatan yang dipercayai dan kedai dalam talian. Saya membina laman web ini serta ruang pentadbiran yang digunakan oleh pasukan untuk mengendalikannya.');
t('<p class="mini-meta">Intensiti Elemen</p>', '<p class="mini-meta">Intensiti Elemen</p>');
t('alt="EST Group website"', 'alt="Laman web EST Group"');
t('<p class="project-kind">Company website</p>', '<p class="project-kind">Laman web syarikat</p>');
t('Website for a company that installs solar panels and electric car chargers. Staff can update the site themselves, and messages from the contact form go straight to their email.',
  'Laman web sebuah syarikat yang memasang panel solar dan pengecas kereta elektrik. Kakitangan boleh mengemas kini laman sendiri, dan mesej daripada borang hubungan terus dihantar ke e-mel mereka.');
t('alt="SMK Seremban 3 school website"', 'alt="Laman web sekolah SMK Seremban 3"');
t('<p class="project-kind">School website</p>', '<p class="project-kind">Laman web sekolah</p>');
t('The official website of a secondary school in Seremban. Teachers log in to post news and update school information, and each unit can only change its own pages.',
  'Laman web rasmi sebuah sekolah menengah di Seremban. Guru log masuk untuk menyiarkan berita dan mengemas kini maklumat sekolah, dan setiap unit hanya boleh mengubah halamannya sendiri.');
t('<p class="mini-meta">SMK Seremban 3</p>', '<p class="mini-meta">SMK Seremban 3</p>');


// ---------- Capabilities ----------
t('<p class="eyebrow">Capabilities</p>', '<p class="eyebrow">Keupayaan</p>');
t('What I can do for a business, and where I have done it.', 'Apa yang boleh saya lakukan untuk perniagaan anda, dan di mana saya pernah melakukannya.');
t('<h3>Take payments online</h3>', '<h3>Menerima bayaran dalam talian</h3>');
t('<p>Customers pay by online banking or card and get a receipt, and the business sees every order. Monthly subscriptions too.</p>',
  '<p>Pelanggan membayar melalui perbankan dalam talian atau kad dan menerima resit, manakala perniagaan dapat melihat setiap pesanan. Langganan bulanan juga boleh disediakan.</p>');
t('Used in BINA, MyGooners, NUJUM · ToyyibPay, Stripe', 'Digunakan dalam BINA, MyGooners, NUJUM · ToyyibPay, Stripe');
t('<h3>Put AI to useful work</h3>', '<h3>Menggunakan AI untuk kerja yang berfaedah</h3>');
t('<p>AI that writes reports from real sources, answers questions from a company\'s own documents, and summarises the news. The "Ask my AI" button on this page is another example.</p>',
  '<p>AI yang menulis laporan berdasarkan sumber sebenar, menjawab soalan berdasarkan dokumen syarikat sendiri dan meringkaskan berita. Butang "Tanya AI saya" pada halaman ini ialah satu lagi contoh.</p>');
t('Used in NUJUM, mySekilas, this site · Google Gemini, OpenAI', 'Digunakan dalam NUJUM, mySekilas, laman ini · Google Gemini, OpenAI');
t('<h3>Phone apps on Google Play</h3>', '<h3>Aplikasi telefon di Google Play</h3>');
t('<p>An Android app published on Google Play, with a matching web version, so people can use it on their phone or computer.</p>',
  '<p>Aplikasi Android yang diterbitkan di Google Play, berserta versi web yang sepadan, supaya pengguna boleh menggunakannya di telefon atau komputer.</p>');
t('<p class="cap-proof">Used in Uros · Flutter, React, Spring Boot</p>', '<p class="cap-proof">Digunakan dalam Uros · Flutter, React, Spring Boot</p>');
t('<h3>Maps and up-to-date information</h3>', '<h3>Peta dan maklumat terkini</h3>');
t('<p>An interactive map, official figures checked against their source, and news gathered from many sites automatically.</p>',
  '<p>Peta interaktif, angka rasmi yang disemak dengan sumbernya, dan berita yang dikumpulkan secara automatik daripada banyak laman.</p>');
t('<p class="cap-proof">Used in mySekilas</p>', '<p class="cap-proof">Digunakan dalam mySekilas</p>');
t('<h3>Let staff update their own site</h3>', '<h3>Kakitangan boleh mengemas kini laman sendiri</h3>');
t('<p>A simple back office where staff without IT skills post news and change details themselves, and each team can only change its own pages.</p>',
  '<p>Ruang pentadbiran ringkas yang membolehkan kakitangan tanpa kemahiran IT menyiarkan berita dan menukar maklumat sendiri, dan setiap pasukan hanya boleh mengubah halamannya sendiri.</p>');
t('Used in MyGooners, SMK Seremban 3, EST Group', 'Digunakan dalam MyGooners, SMK Seremban 3, EST Group');
t('<h3>Keep it running after launch</h3>', '<h3>Memastikan sistem terus berjalan selepas dilancarkan</h3>');
t('<p>Putting systems online, updating them safely, backing up data, fixing problems quickly and training the people who use them.</p>',
  '<p>Melancarkan sistem, mengemas kininya dengan selamat, membuat sandaran data, membaiki masalah dengan cepat dan melatih pengguna.</p>');
t('Day to day at Intensiti Elemen · Linux, cPanel, GitHub Actions', 'Kerja harian di Intensiti Elemen · Linux, cPanel, GitHub Actions');
t('For technical readers: the tools behind the work.', 'Untuk pembaca teknikal: alat yang digunakan dalam kerja saya.');
t('<h3>Core, used in production</h3>', '<h3>Teras, digunakan dalam sistem sebenar</h3>');
t('<h3>Integrations</h3>', '<h3>Integrasi</h3>');
t('Google Gemini and OpenAI APIs', 'API Google Gemini dan OpenAI');
t('SMTP email', 'e-mel SMTP');
t('<h3>Familiar, from side projects and testing</h3>', '<h3>Biasa digunakan, daripada projek sampingan dan pengujian</h3>');
t('<h3>Languages</h3>', '<h3>Bahasa</h3>');
t('<p>Malay, English</p>', '<p>Bahasa Melayu, bahasa Inggeris</p>');

// ---------- About ----------
t('alt="Portrait of Zahir"', 'alt="Potret Zahir"');
t('<p class="eyebrow">About</p>', '<p class="eyebrow">Tentang</p>');
t("Hi, I'm Zahir.", 'Hai, saya Zahir.');
t('<p>I studied software development at UTeM and went straight into production work: six months as an intern at VX Ventures, then full-time at Intensiti Elemen since May 2025.</p>',
  '<p>Saya mempelajari pembangunan perisian di UTeM dan terus bekerja dengan sistem sebenar: enam bulan sebagai pelatih di VX Ventures, kemudian bekerja sepenuh masa di Intensiti Elemen sejak Mei 2025.</p>');
t('<p>I also take freelance work, most recently the website for ENADD Logistics in Singapore, and I build my own products like mySekilas and Uros.</p>',
  '<p>Saya juga menerima kerja bebas, yang terbaharu ialah laman web ENADD Logistics di Singapura, dan membina produk sendiri seperti mySekilas dan Uros.</p>');
t('<p>I handle the whole job, not just the code: I find out what is needed, build it, put it online, and teach people to use it. When something stops working, I am the one who fixes it.</p>',
  '<p>Saya mengendalikan keseluruhan kerja, bukan sekadar menulis kod: mengenal pasti keperluan, membinanya, melancarkannya dan mengajar pengguna. Apabila sesuatu tidak berfungsi, sayalah yang membaikinya.</p>');
t('<p>I am not tied to one tool. I use whatever fits the project, and pick up new ones when it needs them.</p>',
  '<p>Saya tidak terikat pada satu alat sahaja. Saya menggunakan apa-apa yang sesuai dengan projek, dan mempelajari alat baharu apabila diperlukan.</p>');
t('<h3 class="history-title">Experience</h3>', '<h3 class="history-title">Pengalaman</h3>');
t('<p class="history-when">May 2025 to now</p>', '<p class="history-when">Mei 2025 hingga kini</p>');
t('<p class="history-what">Software developer (full-stack), Intensiti Elemen</p>', '<p class="history-what">Pembangun perisian (full-stack), Intensiti Elemen</p>');
t("<p class=\"history-detail\">Build and maintain the company's web products in Laravel, PHP, MySQL and PostgreSQL. Handle payments, AI features, automated builds with GitHub Actions, deploys, migrations, production support and the team's NAS backups.</p>",
  '<p class="history-detail">Membina dan menyelenggara produk web syarikat menggunakan Laravel, PHP, MySQL dan PostgreSQL. Mengendalikan sistem pembayaran, ciri AI, binaan automatik dengan GitHub Actions, pelancaran, migrasi pangkalan data, sokongan sistem dan sandaran NAS pasukan.</p>');
t('<p class="history-when">Oct 2024 to Mar 2025</p>', '<p class="history-when">Oktober 2024 hingga Mac 2025</p>');
t('<p class="history-what">Web developer intern, VX Ventures</p>', '<p class="history-what">Pelatih pembangun web, VX Ventures</p>');
t('<p class="history-detail">Fixed bugs and tested live Laravel products for community, school and cooperative platforms, tested the Flutter app, and helped with deploys and database migrations.</p>',
  '<p class="history-detail">Membaiki pepijat dan menguji produk Laravel yang sedang digunakan bagi platform komuniti, sekolah dan koperasi, menguji aplikasi Flutter, serta membantu pelancaran dan migrasi pangkalan data.</p>');
t('<h3 class="history-title">Education</h3>', '<h3 class="history-title">Pendidikan</h3>');
t('<p class="history-when">2021 to 2025</p>', '<p class="history-when">2021 hingga 2025</p>');
t('<p class="history-what">BSc Computer Science (Software Development), UTeM</p>', '<p class="history-what">Ijazah Sarjana Muda Sains Komputer (Pembangunan Perisian), UTeM</p>');
t('<p class="history-detail">Honours, CGPA 3.68</p>', '<p class="history-detail">Dengan Kepujian, PNGK 3.68</p>');
t('<p class="history-what">Meta Front-End Developer and Meta Back-End Developer certificates</p>', '<p class="history-what">Sijil Meta Front-End Developer dan Meta Back-End Developer</p>');
t('>Download the full résumé (PDF)</a>', '>Muat turun resume penuh (PDF)</a>');

// ---------- Contact ----------
t('<p class="eyebrow">Contact</p>', '<p class="eyebrow">Hubungi</p>');
t('Need a website or mobile app built, or hiring a developer?', 'Perlukan laman web atau aplikasi mudah alih, atau sedang mencari pembangun?');
t('<p>Email is the fastest way to reach me. Messages from this form go to the same inbox.</p>',
  '<p>E-mel ialah cara paling cepat untuk menghubungi saya. Mesej daripada borang ini dihantar ke peti masuk yang sama.</p>');
t('<p class="contact-place">Based in Petaling Jaya, Selangor</p>', '<p class="contact-place">Berpangkalan di Petaling Jaya, Selangor</p>');
t('<label for="name">Your name</label>', '<label for="name">Nama anda</label>');
t('<label for="email">Your email</label>', '<label for="email">E-mel anda</label>');
t('<label for="subject">Subject</label>', '<label for="subject">Subjek</label>');
t('<label for="message">Message</label>', '<label for="message">Mesej</label>');
t('class="btn btn-primary">Send the message</button>', 'class="btn btn-primary">Hantar mesej</button>');

// ---------- Chatbot ----------
t('<h2 class="chatbot-title" id="chatbotTitle">Ask about my work</h2>', '<h2 class="chatbot-title" id="chatbotTitle">Tanya tentang kerja saya</h2>');
t('<p class="chatbot-kicker">AI assistant trained on this site</p>', '<p class="chatbot-kicker">Pembantu AI berdasarkan kandungan laman ini</p>');
t('aria-label="Close chat"', 'aria-label="Tutup sembang"');
t("Hi, I'm an AI version of Zahir. Ask me about my projects, the stack I use, or how to reach me.",
  'Hai, saya versi AI Zahir. Tanyalah tentang projek saya, alat yang saya gunakan atau cara menghubungi saya.');
t('<button type="button" data-chat-prompt="What projects have you built?">Which projects did you build?</button>',
  '<button type="button" data-chat-prompt="Apakah projek yang pernah anda bina?">Projek apa yang anda bina?</button>');
t('<button type="button" data-chat-prompt="What tech stack do you use?">What stack do you use?</button>',
  '<button type="button" data-chat-prompt="Apakah teknologi yang anda gunakan?">Teknologi apa yang anda guna?</button>');
t('<button type="button" data-chat-prompt="How can someone reach you for work?">How do I hire you?</button>',
  '<button type="button" data-chat-prompt="Bagaimanakah cara menghubungi anda untuk urusan kerja?">Bagaimana hendak mengupah anda?</button>');
t('<label class="visually-hidden" for="chatbotInput">Your message</label>', '<label class="visually-hidden" for="chatbotInput">Mesej anda</label>');
t('placeholder="Type a question"', 'placeholder="Taip soalan"');
t('<button type="submit" class="chatbot-send">Send</button>', '<button type="submit" class="chatbot-send">Hantar</button>');
t('<span class="chatbot-toggle-open">Ask my AI</span>', '<span class="chatbot-toggle-open">Tanya AI saya</span>');
t('<span class="chatbot-toggle-close">Close</span>', '<span class="chatbot-toggle-close">Tutup</span>');

// ---------- Script: experience in Malay ----------
t('if (years === 0) return `${rem} mo`;', 'if (years === 0) return `${rem} bulan`;');
t('if (rem === 0) return `${years} yr`;', 'if (rem === 0) return `${years} tahun`;');
t('return `${years} yr ${rem} mo`;', 'return `${years} tahun ${rem} bulan`;');

if (missing.length) {
    console.error('English text not found in index.html (update scripts/build-ms.mjs):');
    for (const m of missing) console.error('  - ' + m.slice(0, 100));
    process.exit(1);
}

await mkdir('ms', { recursive: true });
await writeFile('ms/index.html', crlf ? s.replace(/\n/g, '\r\n') : s);
console.log('ms/index.html written');
