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
t('Muhammad Zahiruddin · Software developer · Petaling Jaya · <span class="eyebrow-open">Open to full-stack roles</span>',
  'Muhammad Zahiruddin · Pembangun perisian · Petaling Jaya · <span class="eyebrow-open">Mencari jawatan full-stack</span>');
t('I build websites and mobile apps that businesses use every day.',
  'Saya membina laman web dan aplikasi mudah alih untuk kegunaan harian perniagaan.');
t('Eight are in use right now, including a map of Malaysia\'s elected representatives, an Android organiser app on Google Play, an AI report writer for PR teams and a conference ticket shop.',
  'Lapan sedang digunakan sekarang, termasuk peta wakil rakyat Malaysia, aplikasi pengurus diri Android di Google Play, penulis laporan AI untuk pasukan perhubungan awam dan kedai tiket persidangan.');
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

t('<p class="contact-open"><span class="contact-open-label">Open to</span>Full-stack developer roles, or other roles that use web and mobile development, in the Klang Valley, hybrid or remote. I also take on freelance projects.</p>',
  '<p class="contact-open"><span class="contact-open-label">Terbuka kepada</span>Jawatan pembangun full-stack, atau jawatan lain yang melibatkan pembangunan web dan aplikasi mudah alih, di Lembah Klang, secara hibrid atau jarak jauh. Saya juga menerima projek kerja bebas.</p>');

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

// mySekilas: how it works
t("                        <details class=\"how-it-works\">\n                            <summary>How it works <span class=\"how-note\">(for technical readers)</span></summary>\n                            <ul>\n                                <li><strong>Collecting news.</strong> A Laravel scheduler job reads the RSS feeds of 21 Malaysian news portals every five minutes. Articles are kept for 14 days; the site shows the last 72 hours through a JSON endpoint that browsers poll every minute.</li>\n                                <li><strong>Grouping the same story.</strong> Headlines are grouped in two passes: shared words (at least three, covering 60% of the shorter headline, within 48 hours), then meaning, using Gemini text embeddings to join reports worded differently or written in another language. An issue is marked “hot” when three or more independent portals cover it; state-government media are not counted.</li>\n                                <li><strong>State and topic.</strong> Each story is tagged with states and constituencies from state names, seat names and an index of place names (GeoNames). The place a report was filed from is used only when the headline and text name no state. Topics come from the portal’s section and topic keywords.</li>\n                                <li><strong>Summaries.</strong> For issues covered by three or more portals, Google Gemini writes a short summary from the reports’ text, where portals allow it to be read (at most 20 an hour). Daily, weekly and monthly round-ups are generated each morning.</li>\n                                <li><strong>The map.</strong> Leaflet with GeoJSON boundaries. The 16 states load first (89 KB compressed). The parliamentary (268 KB) and state-seat (414 KB) layers load only when opened, so the first visit stays light.</li>\n                                <li><strong>“Who is my YB?”</strong> Finds the constituency by checking the user’s location against the boundaries in the browser (point-in-polygon), so the location never reaches the server.</li>\n                                <li><strong>Official data.</strong> Representatives are taken from the official Parliament portal and state assembly websites. Heads of state governments are verified against official portals where available, otherwise against recent news reports, and the page shows which, with the date checked.</li>\n                            </ul>\n                            <h4>Hardest problem</h4>\n                            <p>Grouping the same story across portals. Twenty-one portals word the same event differently, sometimes in another language, and the “hot” score depends entirely on getting this right: too loose merges unrelated stories, too strict counts one story several times. Word matching alone missed paraphrases and English reports, so a second pass compares the meaning of headlines using embeddings. The threshold (0.95) was set by checking real headline pairs; at 0.94, different Budget announcements began to merge. The free embedding quota (1,000 headlines a day) was smaller than the ~1,300 articles a day, so only one representative per word-group is sent, usage is capped at 950 in any rolling 24 hours, and articles older than 12 hours no longer use quota. Two limits remain: only headlines are compared, and the word pass can still join two reports from the same portal about different places.</p>\n                        </details>",
  "                        <details class=\"how-it-works\">\n                            <summary>Cara ia berfungsi <span class=\"how-note\">(untuk pembaca teknikal)</span></summary>\n                            <ul>\n                                <li><strong>Mengumpul berita.</strong> Tugas berjadual Laravel membaca suapan RSS daripada 21 portal berita Malaysia setiap lima minit. Artikel disimpan selama 14 hari; laman memaparkan berita 72 jam terakhir melalui titik akhir JSON yang ditinjau oleh pelayar setiap minit.</li>\n                                <li><strong>Menggabungkan berita yang sama.</strong> Tajuk digabungkan dalam dua peringkat: perkataan yang dikongsi (sekurang-kurangnya tiga, meliputi 60% tajuk yang lebih pendek, dalam tempoh 48 jam), kemudian maksud, menggunakan embedding teks Gemini untuk menyatukan laporan yang berbeza susunan katanya atau ditulis dalam bahasa lain. Sesuatu isu ditanda “hangat” apabila tiga atau lebih portal bebas melaporkannya; media kerajaan negeri tidak dikira.</li>\n                                <li><strong>Negeri dan topik.</strong> Setiap berita ditag dengan negeri dan kawasan berdasarkan nama negeri, nama kerusi dan indeks nama tempat (GeoNames). Lokasi laporan itu dihantar hanya digunakan apabila tajuk dan teks tidak menyebut mana-mana negeri. Topik diambil daripada seksyen portal dan kata kunci topik.</li>\n                                <li><strong>Ringkasan.</strong> Bagi isu yang dilaporkan oleh tiga atau lebih portal, Google Gemini menulis ringkasan pendek berdasarkan teks laporan, sekiranya portal membenarkannya dibaca (maksimum 20 sejam). Rumusan harian, mingguan dan bulanan dijana setiap pagi.</li>\n                                <li><strong>Peta.</strong> Leaflet dengan sempadan GeoJSON. Sempadan 16 negeri dimuatkan dahulu (89 KB dimampatkan). Lapisan Parlimen (268 KB) dan DUN (414 KB) hanya dimuatkan apabila dibuka, supaya lawatan pertama kekal ringan.</li>\n                                <li><strong>“Siapa YB saya?”</strong> Mencari kawasan dengan menyemak lokasi pengguna berbanding sempadan di dalam pelayar (point-in-polygon), jadi lokasi tidak sampai ke pelayan.</li>\n                                <li><strong>Data rasmi.</strong> Wakil rakyat diambil daripada portal rasmi Parlimen dan laman web Dewan Undangan Negeri. Ketua kerajaan negeri disahkan dengan portal rasmi jika ada, jika tidak dengan laporan berita terkini, dan halaman menunjukkan sumber yang digunakan berserta tarikh semakan.</li>\n                            </ul>\n                            <h4>Masalah paling sukar</h4>\n                            <p>Menggabungkan berita yang sama merentas portal. Dua puluh satu portal melaporkan peristiwa yang sama dengan susunan kata yang berbeza, kadangkala dalam bahasa lain, dan skor “hangat” bergantung sepenuhnya pada ketepatan penggabungan ini: terlalu longgar akan menggabungkan berita yang tidak berkaitan, terlalu ketat akan mengira satu berita beberapa kali. Padanan perkataan sahaja terlepas parafrasa dan laporan bahasa Inggeris, jadi peringkat kedua membandingkan maksud tajuk menggunakan embedding. Ambang (0.95) ditetapkan dengan menyemak pasangan tajuk sebenar; pada 0.94, pengumuman Belanjawan yang berbeza mula bergabung. Kuota embedding percuma (1,000 tajuk sehari) lebih kecil daripada kira-kira 1,300 artikel sehari, jadi hanya satu wakil bagi setiap kumpulan perkataan dihantar, penggunaan dihadkan kepada 950 dalam mana-mana tempoh 24 jam bergerak, dan artikel yang berusia lebih 12 jam tidak lagi menggunakan kuota. Dua had masih wujud: hanya tajuk yang dibandingkan, dan peringkat padanan perkataan masih boleh menggabungkan dua laporan daripada portal yang sama tentang tempat yang berbeza.</p>\n                        </details>");

// Uros: how it works
t("                        <details class=\"how-it-works\">\n                            <summary>How it works <span class=\"how-note\">(for technical readers)</span></summary>\n                            <ul>\n                                <li><strong>One API, two apps.</strong> A Spring Boot REST API on Render serves both the Flutter Android app and the React web app (Vite, on Vercel), so finance, notes and diary data stay the same on phone and computer. Data lives in PostgreSQL (Supabase), with optional Redis (Upstash) for sessions. Vercel forwards <code>/api</code> to Render, so the browser treats the API as the same site.</li>\n                                <li><strong>Sign-in and sessions.</strong> Access tokens are short-lived JWTs (15 minutes). Refresh tokens rotate on every use and are stored only as SHA-256 hashes. The web app also uses a CSRF token. No token is ever handed to the app code: both travel as httpOnly, Secure cookies. On Android those cookies are kept encrypted with <code>flutter_secure_storage</code>. Every signed-in device is listed as a session, and the user can sign out of all the others from one place.</li>\n                                <li><strong>Two-step verification.</strong> Optional TOTP (authenticator app) with a guided setup, its own sign-in step and 8 backup codes. Google sign-in can create an account or link to an existing one. If the email already belongs to an account, nothing is linked until the user confirms.</li>\n                                <li><strong>Private PIN.</strong> Sensitive notes and diary entries stay locked behind a 6-digit PIN, stored only as a BCrypt hash. Unlocking gives a signed token in its own httpOnly cookie, valid for 5, 10, 15 or 30 minutes, and the user can lock again at once. After 5 wrong tries the PIN is locked for 15 minutes.</li>\n                                <li><strong>Finance.</strong> Expenses by category against a monthly budget, charts (Recharts on the web), and PDF reports. The PDFs are built on the device: jsPDF on the web, the <code>pdf</code> package in Flutter. The server only supplies the data.</li>\n                                <li><strong>Telegram bot.</strong> To link an account, the user gets a 6-digit code in the app that expires after 10 minutes and sends it to the bot. One Telegram chat links to one account. The bot then answers questions about spending in English or Malay, such as today, this month, by category or budget status. In production it receives messages through a secret webhook. When the server wakes from sleep, it first handles any messages that arrived while it was down.</li>\n                                <li><strong>Two languages and currencies.</strong> English and Malay (i18next on the web, easy_localization in Flutter), with the currency set per user from 19 supported currencies. Currency only changes how amounts are shown; nothing is converted.</li>\n                            </ul>\n                            <h4>Hardest problem</h4>\n                            <p>Keeping users signed in without opening a security hole. Each refresh token works only once, and reusing an old one is treated as theft, so every session for that user is signed out. But the Flutter app often sends several requests at once. When the access token expired, each of them tried to refresh with the same token, and the second attempt looked like theft and signed the user out. The fix is a 60-second grace window: an old token reused within 60 seconds gets a fresh token instead of a sign-out, and only reuse after that is treated as an attack. The web app also shares a single refresh between all waiting requests.</p>\n                        </details>",
  "                        <details class=\"how-it-works\">\n                            <summary>Cara ia berfungsi <span class=\"how-note\">(untuk pembaca teknikal)</span></summary>\n                            <ul>\n                                <li><strong>Satu API, dua aplikasi.</strong> API REST Spring Boot di Render melayani aplikasi Android Flutter dan aplikasi web React (Vite, di Vercel), jadi data kewangan, nota dan diari kekal sama di telefon dan komputer. Data disimpan dalam PostgreSQL (Supabase), dengan Redis (Upstash) sebagai pilihan untuk sesi. Vercel memajukan <code>/api</code> ke Render, jadi pelayar menganggap API berada di laman yang sama.</li>\n                                <li><strong>Log masuk dan sesi.</strong> Token akses ialah JWT jangka pendek (15 minit). Token muat semula ditukar setiap kali digunakan dan disimpan hanya sebagai cincangan SHA-256. Aplikasi web turut menggunakan token CSRF. Tiada token yang diserahkan kepada kod aplikasi: kedua-duanya dihantar sebagai kuki httpOnly dan Secure. Di Android, kuki tersebut disimpan secara tersulit dengan <code>flutter_secure_storage</code>. Setiap peranti yang log masuk disenaraikan sebagai sesi, dan pengguna boleh log keluar daripada semua sesi lain dari satu tempat.</li>\n                                <li><strong>Pengesahan dua langkah.</strong> TOTP pilihan (aplikasi pengesah) dengan persediaan berpandu, langkah log masuk tersendiri dan 8 kod sandaran. Log masuk Google boleh mencipta akaun atau memautkannya kepada akaun sedia ada. Jika e-mel itu sudah dimiliki oleh sesuatu akaun, tiada apa-apa yang dipautkan sehingga pengguna mengesahkannya.</li>\n                                <li><strong>PIN peribadi.</strong> Nota dan catatan diari yang sensitif dikunci dengan PIN 6 digit yang disimpan hanya sebagai cincangan BCrypt. Membuka kunci memberikan token bertandatangan dalam kuki httpOnly tersendiri, sah selama 5, 10, 15 atau 30 minit, dan pengguna boleh menguncinya semula serta-merta. Selepas 5 cubaan salah, PIN dikunci selama 15 minit.</li>\n                                <li><strong>Kewangan.</strong> Perbelanjaan mengikut kategori berbanding bajet bulanan, carta (Recharts di web) dan laporan PDF. PDF dibina di peranti: jsPDF di web dan pakej <code>pdf</code> dalam Flutter. Pelayan hanya membekalkan data.</li>\n                                <li><strong>Bot Telegram.</strong> Untuk memautkan akaun, pengguna mendapat kod 6 digit dalam aplikasi yang tamat tempoh selepas 10 minit, lalu menghantarnya kepada bot. Satu sembang Telegram dipautkan kepada satu akaun sahaja. Bot kemudian menjawab soalan tentang perbelanjaan dalam bahasa Inggeris atau bahasa Melayu, seperti perbelanjaan hari ini, bulan ini, mengikut kategori atau status bajet. Dalam sistem sebenar, bot menerima mesej melalui webhook rahsia. Apabila pelayan bangun daripada tidur, ia terlebih dahulu memproses mesej yang tiba semasa ia tidak aktif.</li>\n                                <li><strong>Dua bahasa dan mata wang.</strong> Bahasa Inggeris dan bahasa Melayu (i18next di web, easy_localization dalam Flutter), dengan mata wang ditetapkan bagi setiap pengguna daripada 19 mata wang yang disokong. Mata wang hanya mengubah cara amaun dipaparkan; tiada penukaran dibuat.</li>\n                            </ul>\n                            <h4>Masalah paling sukar</h4>\n                            <p>Memastikan pengguna kekal log masuk tanpa membuka ruang keselamatan. Setiap token muat semula hanya boleh digunakan sekali, dan penggunaan semula token lama dianggap sebagai kecurian, jadi semua sesi pengguna itu dilog keluar. Namun, aplikasi Flutter sering menghantar beberapa permintaan serentak. Apabila token akses tamat tempoh, setiap permintaan cuba memuat semula dengan token yang sama, dan cubaan kedua kelihatan seperti kecurian lalu melog keluar pengguna. Penyelesaiannya ialah tempoh tenggang 60 saat: token lama yang digunakan semula dalam tempoh 60 saat akan mendapat token baharu dan bukannya dilog keluar, dan hanya penggunaan semula selepas tempoh itu dianggap sebagai serangan. Aplikasi web juga berkongsi satu proses muat semula antara semua permintaan yang menunggu.</p>\n                        </details>");

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
t('<p>Signing up, paying and getting a ticket all happen online now, and organisers manage everything from one place.</p>',
  '<p>Pendaftaran, bayaran dan penerimaan tiket kini dibuat sepenuhnya dalam talian, dan penganjur menguruskan semuanya dari satu tempat.</p>');

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
t('<p class="mini-meta">Built at Intensiti Elemen, my employer</p>', '<p class="mini-meta">Dibina di Intensiti Elemen, majikan saya</p>');
t('<div><dt>Built at</dt><dd>Intensiti Elemen, my employer</dd></div>', '<div><dt>Dibina di</dt><dd>Intensiti Elemen, majikan saya</dd></div>');
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
t('Shipping production software since October 2024.', 'Membina perisian untuk pengguna sebenar sejak Oktober 2024.');
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
