export type SupportedLanguage = 'id' | 'en' | 'ar';

export interface CompleteTranslations {
  // Brand & Nav
  brandTitle: string;
  brandTagline: string;
  homeNav: string;
  archiveNav: string;
  studioNav: string;
  myworksNav: string;
  labNav: string;
  manifestoNav: string;
  terminalNav: string;
  securityNav: string;
  uploadBtn: string;
  settingsBtn: string;
  loginBtn: string;
  logoutBtn: string;

  // Hero Section
  topSectorBar: string;
  classificationRestricted: string;
  protocolSys: string;
  authActive: string;
  estYear: string;
  heroMotto: string;
  heroDescription: string;
  statTotalArchives: string;
  statCoreDiscipline: string;
  statSystemConsole: string;
  searchPlaceholder: string;
  exploreBtn: string;
  registerDossierBtn: string;

  // Akselnetika (Axcelnetics)
  akselHeaderBar: string;
  akselStatusVerified: string;
  akselAuthAston: string;
  akselCategory: string;
  akselTitle: string;
  akselSubtitle: string;
  akselNoMathBadge: string;
  akselDomainBadge: string;
  akselSectorBadge: string;
  akselExecutiveTitle: string;
  akselExecutiveBody: string;
  akselAxiomsTitle: string;
  akselP1Title: string;
  akselP1Desc: string;
  akselP2Title: string;
  akselP2Desc: string;
  akselP3Title: string;
  akselP3Desc: string;
  akselSimTitle: string;
  akselSimSub: string;
  akselSliderSpeed: string;
  akselSliderSpeedDesc: string;
  akselSliderRange: string;
  akselSliderRangeDesc: string;
  akselFooterVerify: string;

  // Terminal Course
  termHeaderBar: string;
  termActiveBadge: string;
  termTitle: string;
  termSubtitle: string;
  termOpenFullBtn: string;
  termModulesTitle: string;
  termLesson1Title: string;
  termLesson1Desc: string;
  termLesson2Title: string;
  termLesson2Desc: string;
  termLesson3Title: string;
  termLesson3Desc: string;
  termLesson4Title: string;
  termLesson4Desc: string;
  termLesson5Title: string;
  termLesson5Desc: string;
  termPromptNotice: string;
  termInputPlaceholder: string;
  termSendBtn: string;

  // Archive & Dossier List
  archiveHeaderTag: string;
  archiveMainTitle: string;
  archiveShowing: string;
  archiveAllClasses: string;
  archiveAllDivisions: string;
  archiveResetBtn: string;
  archiveNoRecords: string;

  // Dossier Detail
  detailBackBtn: string;
  detailPrintBtn: string;
  detailProposeBtn: string;
  detailDeleteBtn: string;
  detailClassifiedTag: string;
  detailLeadResearcher: string;
  detailClassifiedDate: string;
  detailRevisionDate: string;
  detailStatus: string;
  detailTabContainment: string;
  detailTabMath: string;
  detailTabDesc: string;
  detailTabLogs: string;

  // Chaos Lab
  labTag: string;
  labTitle: string;
  labSubtitle: string;
  labAttractorLorenz: string;
  labSimSpeed: string;
  labResetSim: string;

  // Manifesto
  manifestoTag: string;
  manifestoTitle: string;
  manifestoSubtitle: string;
  manifestoArticle1Title: string;
  manifestoArticle1Body: string;
  manifestoArticle2Title: string;
  manifestoArticle2Body: string;
  manifestoArticle3Title: string;
  manifestoArticle3Body: string;

  // Security Center
  secTag: string;
  secTitle: string;
  secSubtitle: string;
  secScanBtn: string;
  secScanningMsg: string;
  secLockdownBtn: string;
  secThreatLevelLabel: string;
  secFirewallLabel: string;
  secHashLabel: string;
  secSessionsLabel: string;
  secAuditFeedTitle: string;

  // Footer & Settings Modal
  footerSector: string;
  footerSession: string;
  footerJsonBtn: string;
  footerPrivacyBtn: string;
  footerTermsBtn: string;
  settingsModalTitle: string;
  settingsModalSubtitle: string;
  tabLanguage: string;
  tabPrivacy: string;
  tabTerms: string;
  tabSystem: string;
  closeBtn: string;
}

export const COMPLETE_TRANSLATIONS: Record<SupportedLanguage, CompleteTranslations> = {
  // 1. BAHASA INDONESIA (PRIMARY DEFAULT)
  id: {
    brandTitle: 'Institut Yaqoob Mosafa',
    brandTagline: 'Keteraturan di Jantung Kekacauan',
    homeNav: 'Portal Utama',
    archiveNav: 'Arsip Terklasifikasi',
    studioNav: 'Studio Riset',
    myworksNav: 'Karya Saya',
    labNav: 'Laboratorium Chaos',
    manifestoNav: 'Manifesto Institut',
    terminalNav: 'Konsol Terminal',
    securityNav: 'Pusat Keamanan & Pengawasan',
    uploadBtn: '+ Daftarkan Dokumen',
    settingsBtn: 'Pengaturan',
    loginBtn: 'Masuk / SSO',
    logoutBtn: 'Selesaikan Sesi',

    topSectorBar: 'PORTAL REPOSITORI ARSIP RESMI - SEKTOR 04-A',
    classificationRestricted: 'KLASIFIKASI: TERBATAS & RAHASIA',
    protocolSys: 'PROTOKOL: YMI-SYS-2026',
    authActive: 'OTORISASI: AKTIF',
    estYear: 'DIBANGUN 1974',
    heroMotto: 'Keteraturan di Jantung Kekacauan',
    heroDescription: 'Repositori pusat untuk rekaman anomali fasa, dinamika penularan resonansi Akselnetika, dan epistemic non-linear di bawah yurisdiksi Institut Yaqoob Mosafa.',
    statTotalArchives: 'Dokumen Terklasifikasi',
    statCoreDiscipline: 'Disiplin Ilmu Utama',
    statSystemConsole: 'Konsol Integritas & Keamanan',
    searchPlaceholder: 'Cari anomali, kode protokol, eksponen Lyapunov, peneliti utama...',
    exploreBtn: 'Jelajahi Arsip',
    registerDossierBtn: '+ Buat Dokumen Baru',

    akselHeaderBar: 'RISALAH RESMI // YMI-DOC-AKSEL-01',
    akselStatusVerified: 'STATUS: TERVERIFIKASI SISTEM',
    akselAuthAston: 'OTORITAS: ASTON MARCHIES',
    akselCategory: 'RISALAH EPISTEMIK TANDATANGAN',
    akselTitle: 'Akselnetika: Dinamika Keacakan & Penularan Resonansi',
    akselSubtitle: 'Paradigma baru dinamika non-linear: Mengurai keteraturan intrinsik di balik fluktuasi stokastik dan penularan getaran pada sistem kompleks tertutup.',
    akselNoMathBadge: 'Sains Terapan Non-Linear',
    akselDomainBadge: 'Domain Lintas Disiplin',
    akselSectorBadge: 'Sektor Kurasi 04-A',
    akselExecutiveTitle: 'Ringkasan Eksekutif & Tesis Utama',
    akselExecutiveBody: 'Akselnetika adalah kerangka matematis dan filosofis yang dirancang untuk menjembatani jurang antara teori kekacauan deterministik dan mekanika stokastik. Alih-alih menganggap keacakan sebagai gangguan, Akselnetika membuktikan bahwa keacakan ber-entropi tinggi berfungsi sebagai pembawa informasi padat yang memicu gelombang resonansi koheren.',
    akselAxiomsTitle: 'Aksioma & Prinsip Operasional Akselnetika',
    akselP1Title: '1. Prinsip Penularan Resonansi (Resonance Contagion)',
    akselP1Desc: 'Pergeseran fasa stokastik mikroskopis pada nodus lokal menular secara koheren ke nodus sekitarnya melalui kopling fasa non-lokal.',
    akselP2Title: '2. Konservasi Fluktuasi Intrinsik',
    akselP2Desc: 'Energi dissipatif dari ketidakteraturan tidak pernah musnah; energi tersebut dipetakan secara sistematis ke dalam manifold attractor berdimensi fraktal.',
    akselP3Title: '3. Transisi Fasa Tunggal',
    akselP3Desc: 'Pada ambang batas entropi kritis (Sc), sistem mengalami lompatan bifurkasi metastabil yang mengorganisir ulang kekacauan menjadi keharmonisan struktur tingkat tinggi.',
    akselSimTitle: 'Simulator Medan Resonansi Akselnetika (Ruang Fasa)',
    akselSimSub: 'Visualisator interaktif untuk gelombang penularan resonansi stokastik. Sesuaikan parameter di bawah.',
    akselSliderSpeed: 'Kecepatan Resonansi (ω)',
    akselSliderSpeedDesc: 'Frekuensi osilasi propagasi medan',
    akselSliderRange: 'Radius Penularan (R_c)',
    akselSliderRangeDesc: 'Jangkauan interaksi kopling stokastik',
    akselFooterVerify: 'Diverifikasi oleh Dewan Epistemik Yaqoob Mosafa · Disetujui oleh Aston Marchies (Principal Architect)',

    termHeaderBar: 'MODUL PELATIHAN OPERATOR // YAQS-DOS v4.1',
    termActiveBadge: 'SESI PELATIHAN AKTIF',
    termTitle: 'Kursus Kilat Sintaks Terminal YAQS-DOS',
    termSubtitle: 'Kuasai sintaks terminal resmi institut untuk kueri dokumen terklasifikasi, eksekusi audit kriptografi SHA-256, dan inspeksi lintasan fasa.',
    termOpenFullBtn: 'Buka Terminal Penuh',
    termModulesTitle: 'Modul Pelatihan Standar & Perintah Utama:',
    termLesson1Title: 'Inspeksi Direktori & Berkas',
    termLesson1Desc: 'Gunakan `list` atau `ls` untuk menampilkan seluruh rekaman anomali terklasifikasi dalam arsip.',
    termLesson2Title: 'Membaca Rekaman Dokumen Terklasifikasi',
    termLesson2Desc: 'Ketik `view [nomor-protokol]` (contoh: `view ymi-chaos-014`) untuk mendagrasikan dan membaca isi dokumen.',
    termLesson3Title: 'Penyaringan Kata Kunci Cepat',
    termLesson3Desc: 'Jalankan `search [kata-kunci]` untuk menyaring dokumen berdasarkan disiplin riset atau peneliti.',
    termLesson4Title: 'Audit Integritas Kriptografi SHA-256',
    termLesson4Desc: 'Jalankan `scan` untuk memverifikasi checksum kriptografi di seluruh basis data.',
    termLesson5Title: 'Status Sistem & Telemetri Keamanan',
    termLesson5Desc: 'Ketik `status` untuk memeriksa barikade pertahanan Sektor 04-A dan identitas peneliti aktif.',
    termPromptNotice: 'Ketik perintah di bawah atau klik modul pelatihan di atas:',
    termInputPlaceholder: 'Masukkan perintah (contoh: list, scan, view ymi-chaos-014)...',
    termSendBtn: 'Eksekusi',

    archiveHeaderTag: 'DIREKTORI BRANKAS TERKLASIFIKASI // YMI-VAULT-04',
    archiveMainTitle: 'Arsip Rekaman Anomali & Ruang Fasa Terklasifikasi',
    archiveShowing: 'Menampilkan',
    archiveAllClasses: 'Semua Kelas Attractor',
    archiveAllDivisions: 'Semua Divisi Riset',
    archiveResetBtn: 'Pulihkan Default',
    archiveNoRecords: 'Tidak ada rekaman terklasifikasi yang cocok dengan parameter pencarian.',

    detailBackBtn: 'Kembali ke Arsip',
    detailPrintBtn: 'Cetak Rekaman Resmi (PDF)',
    detailProposeBtn: 'Ajukan Errata / Revisi',
    detailDeleteBtn: 'Hapus Rekaman',
    detailClassifiedTag: 'DOKUMEN RAHASIA // YURISDIKSI RESMI YMI',
    detailLeadResearcher: 'Peneliti Utama:',
    detailClassifiedDate: 'Tanggal Klasifikasi:',
    detailRevisionDate: 'Revisi Terakhir:',
    detailStatus: 'Status Kurasi:',
    detailTabContainment: 'Protokol Penahanan',
    detailTabMath: 'Formulasi Matematika',
    detailTabDesc: 'Deskripsi Fenomena',
    detailTabLogs: 'Log Pengamatan',

    labTag: 'SIMULASI NUMERIK RUANG FASA // LAB CHAOS',
    labTitle: 'Laboratorium Attractor Lorenz & Chaos Dinamis',
    labSubtitle: 'Jalankan integrasi 3D dinamis dari sistem diferensial non-linear dan amati lintasan strange attractor.',
    labAttractorLorenz: 'Attractor Lorenz Klasik',
    labSimSpeed: 'Kecepatan Evolusi Simulasi:',
    labResetSim: 'Reset Ruang Fasa',

    manifestoTag: 'DEKRIT UTAMA // PIAGAM KONSTITUSIONAL',
    manifestoTitle: 'Manifesto Institut Yaqoob Mosafa',
    manifestoSubtitle: 'Konstitusi epistemologis dan prinsip panduan sains non-linear.',
    manifestoArticle1Title: 'Pasal I: Aksioma Supremasi Non-Linear',
    manifestoArticle1Body: 'Sebab-akibat linear adalah pendekatan persepsi manusia, bukan hukum mutlak alam semesta. Realitas sejati bersemayam dalam ketergantungan sensitif pada kondisi awal.',
    manifestoArticle2Title: 'Pasal II: Kesucian Data Fenomenologis Mentah',
    manifestoArticle2Body: 'Tidak ada lintasan anomali yang boleh dibuang hanya karena menentang dogma yang ada. Kejujuran ilmiah menuntut pelestarian anomali dalam kemurnian matematisnya.',
    manifestoArticle3Title: 'Pasal III: Pengelolaan Berdaulat atas Tatanan Epistemik',
    manifestoArticle3Body: 'Pengetahuan tentang resonansi non-linear harus dijaga dari eksploitasi yang merusak. Institut berdiri sebagai penjaga abadi keteraturan di jantung kekacauan.',

    secTag: 'PENGAWASAN & PERLINDUNGAN AKSES // SEKTOR 04-A',
    secTitle: 'Pusat Keamanan & Pengawasan Epistemik',
    secSubtitle: 'Audit checksum rekaman real-time, log akses peneliti, firewall kausal, dan deteksi intrusi anomali.',
    secScanBtn: 'Audit Integritas SHA-256',
    secScanningMsg: 'Menaudit blok memori arsip...',
    secLockdownBtn: 'Protokol Karantina Darurat',
    secThreatLevelLabel: 'Tingkat Ancaman',
    secFirewallLabel: 'Firewall Kausal',
    secHashLabel: 'Hash Kriptografi',
    secSessionsLabel: 'Sesi Diaudit Aktif',
    secAuditFeedTitle: 'LOG AUDIT KEAMANAN & AKSES REAL-TIME',

    footerSector: 'Registri Arsip Sektor 04-A',
    footerSession: 'Sesi Aktif',
    footerJsonBtn: 'Basis Data JSON',
    footerPrivacyBtn: 'Kebijakan Privasi',
    footerTermsBtn: 'Syarat Akses',
    settingsModalTitle: 'Pengaturan & Tata Kelola Institut',
    settingsModalSubtitle: 'Institut Yaqoob Mosafa · Repositori Pusat Sektor 04-A',
    tabLanguage: 'Bahasa',
    tabPrivacy: 'Kebijakan Privasi',
    tabTerms: 'Syarat Akses',
    tabSystem: 'Sistem & Memori',
    closeBtn: 'Tutup',
  },

  // 2. GLOBAL (ENGLISH)
  en: {
    brandTitle: 'Yaqoob Mosafa Institute',
    brandTagline: 'Order at the Heart of Chaos',
    homeNav: 'Home Portal',
    archiveNav: 'Classified Archive',
    studioNav: 'Research Studio',
    myworksNav: 'My Works',
    labNav: 'Chaos Lab',
    manifestoNav: 'Institute Manifesto',
    terminalNav: 'Terminal Console',
    securityNav: 'Security & Surveillance',
    uploadBtn: '+ Register Dossier',
    settingsBtn: 'Settings',
    loginBtn: 'Sign In / SSO',
    logoutBtn: 'End Session',

    topSectorBar: 'OFFICIAL ARCHIVAL REPOSITORY PORTAL - SECTOR 04-A',
    classificationRestricted: 'CLASSIFICATION: RESTRICTED',
    protocolSys: 'PROTOCOL: YMI-SYS-2026',
    authActive: 'AUTH: ACTIVE',
    estYear: 'EST. 1974',
    heroMotto: 'Order at the Heart of Chaos',
    heroDescription: 'Central repository for declassified phase-space anomalies, Axcelnetics resonance contagion dynamics, and non-linear epistemics under the jurisdiction of Yaqoob Mosafa Institute.',
    statTotalArchives: 'Classified Dossiers Vault',
    statCoreDiscipline: 'Core Epistemic Disciplines',
    statSystemConsole: 'Integrity & Security Console',
    searchPlaceholder: 'Search anomalies, protocol codes, Lyapunov exponents, lead researcher...',
    exploreBtn: 'Explore Archives',
    registerDossierBtn: '+ Submit New Dossier',

    akselHeaderBar: 'DECLASSIFIED TREATISE // YMI-DOC-AKSEL-01',
    akselStatusVerified: 'STATUS: SYSTEM VERIFIED',
    akselAuthAston: 'AUTHORITY: ASTON MARCHIES',
    akselCategory: 'FOUNDATIONAL EPISTEMIC TREATISE',
    akselTitle: 'Axcelnetics: Randomness Dynamics & Resonance Contagion',
    akselSubtitle: 'A breakthrough non-linear dynamics paradigm: Deciphering the intrinsic order behind stochastic fluctuations and vibration contagion across closed complex systems.',
    akselNoMathBadge: 'Applied Non-Linear Science',
    akselDomainBadge: 'Trans-Disciplinary Domain',
    akselSectorBadge: 'Curation Sector 04-A',
    akselExecutiveTitle: 'Executive Summary & Core Epistemic Thesis',
    akselExecutiveBody: 'Axcelnetics is a rigorous mathematical and philosophical framework formulated to bridge the vacuum between deterministic chaos theory and stochastic mechanics. Rather than treating random noise as interference, Axcelnetics proves that high-entropy randomness acts as a dense information carrier triggering coherent resonance avalanches.',
    akselAxiomsTitle: 'Axcelnetics Axioms & Operational Principles',
    akselP1Title: '1. Principle of Resonance Contagion',
    akselP1Desc: 'Microscopic stochastic phase shifts on a local node propagate contagiously to surrounding nodes through non-local phase coupling, inducing spontaneous coherence clusters.',
    akselP2Title: '2. Conservation of Intrinsic Fluctuation',
    akselP2Desc: 'Dissipative energy from disorder is never extinguished; it is systematically mapped into fractional-dimension attractor manifolds.',
    akselP3Title: '3. Singular Phase Transition',
    akselP3Desc: 'At a critical entropy threshold (Sc), the system undergoes a metastable bifurcation jump that reorganizes chaos into higher-order structural harmony.',
    akselSimTitle: 'Axcelnetics Resonance Field Simulator (Phase Space)',
    akselSimSub: 'Interactive canvas visualizer for stochastic resonance contagion wavefronts. Adjust coupling parameters below.',
    akselSliderSpeed: 'Resonance Velocity (ω)',
    akselSliderSpeedDesc: 'Field propagation oscillation frequency',
    akselSliderRange: 'Contagion Radius (R_c)',
    akselSliderRangeDesc: 'Stochastic coupling interaction reach',
    akselFooterVerify: 'Validated by Yaqoob Mosafa Epistemic Council · Approved by Aston Marchies (Principal Architect)',

    termHeaderBar: 'OPERATOR TRAINING MODULE // YAQS-DOS v4.1',
    termActiveBadge: 'TRAINING SESSION ACTIVE',
    termTitle: 'YAQS-DOS Command Line Quickstart & Mastery Course',
    termSubtitle: 'Master official institute terminal syntax to query classified dossiers, execute SHA-256 cryptographic audits, and inspect phase-space trajectories.',
    termOpenFullBtn: 'Launch Full Terminal',
    termModulesTitle: 'Standard Training Modules & Core Command Set:',
    termLesson1Title: 'Directory & File Inspection',
    termLesson1Desc: 'Use `list` or `ls` to query all classified anomaly records currently preserved in the archive.',
    termLesson2Title: 'Reading Classified Dossier Records',
    termLesson2Desc: 'Type `view [protocol-number]` (e.g. `view ymi-chaos-014`) to declassify and read complete dossier records.',
    termLesson3Title: 'Rapid Keyword Filtering',
    termLesson3Desc: 'Execute `search [keyword]` to filter documents by research discipline, attractor class, or researcher.',
    termLesson4Title: 'Cryptographic SHA-256 Integrity Audit',
    termLesson4Desc: 'Execute `scan` to verify tamper-proof cryptographic checksums across the entire database.',
    termLesson5Title: 'System Status & Security Telemetry',
    termLesson5Desc: 'Type `status` to inspect Sector 04-A defense barriers and the active researcher identity.',
    termPromptNotice: 'Type command below or click standard training modules above:',
    termInputPlaceholder: 'Enter command (e.g., list, scan, view ymi-chaos-014)...',
    termSendBtn: 'Execute',

    archiveHeaderTag: 'CLASSIFIED VAULT DIRECTORY // YMI-VAULT-04',
    archiveMainTitle: 'Classified Anomaly Records & Phase-Space Archive',
    archiveShowing: 'Displaying',
    archiveAllClasses: 'All Attractor Classes',
    archiveAllDivisions: 'All Research Divisions',
    archiveResetBtn: 'Restore Default',
    archiveNoRecords: 'No classified records match the specified search parameters.',

    detailBackBtn: 'Back to Archive',
    detailPrintBtn: 'Print Official Record (PDF)',
    detailProposeBtn: 'Submit Errata / Revision',
    detailDeleteBtn: 'Delete Record',
    detailClassifiedTag: 'CLASSIFIED DOCUMENT // OFFICIAL YMI JURISDICTION',
    detailLeadResearcher: 'Lead Researcher:',
    detailClassifiedDate: 'Classified Date:',
    detailRevisionDate: 'Last Revision:',
    detailStatus: 'Curation Status:',
    detailTabContainment: 'Containment Protocols',
    detailTabMath: 'Mathematical Formulation',
    detailTabDesc: 'Phenomena Description',
    detailTabLogs: 'Observation Logs',

    labTag: 'NUMERICAL PHASE-SPACE SIMULATION // CHAOS LAB',
    labTitle: 'Lorenz Attractor & Dynamic Chaos Laboratory',
    labSubtitle: 'Run dynamic 3D integrations of non-linear differential systems and observe strange attractor trajectories.',
    labAttractorLorenz: 'Lorenz Classical Attractor',
    labSimSpeed: 'Simulation Evolution Speed:',
    labResetSim: 'Reset Phase Space',

    manifestoTag: 'FOUNDATIONAL DECREE // CONSTITUTIONAL CHARTER',
    manifestoTitle: 'The Manifesto of Yaqoob Mosafa Institute',
    manifestoSubtitle: 'The epistemological constitution and guiding principles of non-linear science.',
    manifestoArticle1Title: 'Article I: The Axiom of Non-Linear Supremacy',
    manifestoArticle1Body: 'Linear causality is a convenient approximation of human perception, not an intrinsic law of the cosmos. True reality resides within sensitive dependence on initial conditions.',
    manifestoArticle2Title: 'Article II: The Inviolability of Raw Phenomenological Data',
    manifestoArticle2Body: 'No anomalous trajectory shall be discarded merely because it defies existing dogma. Epistemic honesty demands preserving anomalies in their unredacted mathematical purity.',
    manifestoArticle3Title: 'Article III: Sovereign Stewardship of Epistemic Order',
    manifestoArticle3Body: 'Knowledge of non-linear resonance must be guarded against destabilizing exploitation. The institute stands as the eternal sentry of order at the heart of chaos.',

    secTag: 'SURVEILLANCE & ACCESS PROTECTION // SECTOR 04-A',
    secTitle: 'Epistemic Security & Surveillance Center',
    secSubtitle: 'Real-time record checksum audits, researcher access logs, causal firewalls, and anomaly intrusion detection.',
    secScanBtn: 'Audit SHA-256 Integrity',
    secScanningMsg: 'Auditing archive memory blocks...',
    secLockdownBtn: 'Emergency Quarantine Protocol',
    secThreatLevelLabel: 'Threat Level',
    secFirewallLabel: 'Causal Firewall',
    secHashLabel: 'Cryptographic Hash',
    secSessionsLabel: 'Active Audited Sessions',
    secAuditFeedTitle: 'REAL-TIME SECURITY & ACCESS AUDIT LOG',

    footerSector: 'Sector 04-A Archival Registry',
    footerSession: 'Active Session',
    footerJsonBtn: 'JSON Database',
    footerPrivacyBtn: 'Privacy Policy',
    footerTermsBtn: 'Access Terms',
    settingsModalTitle: 'Institute Settings & Governance',
    settingsModalSubtitle: 'Yaqoob Mosafa Institute · Sector 04-A Central Repository',
    tabLanguage: 'Language',
    tabPrivacy: 'Privacy Policy',
    tabTerms: 'Access Terms',
    tabSystem: 'System & Memory',
    closeBtn: 'Close',
  },

  // 3. ARABIC (العربية)
  ar: {
    brandTitle: 'معهد يعقوب مصافا',
    brandTagline: 'النظام في قلب الفوضى',
    homeNav: 'الرئيسية',
    archiveNav: 'أرشيف الوثائق',
    studioNav: 'استوديو الأبحاث',
    myworksNav: 'أعمالي',
    labNav: 'محاكاة الفوضى',
    manifestoNav: 'ميثاق المعهد',
    terminalNav: 'موجه الأوامر',
    securityNav: 'الأمان والرقابة',
    uploadBtn: '+ رفع وثيقة',
    settingsBtn: 'الإعدادات',
    loginBtn: 'تسجيل الدخول المؤسسي',
    logoutBtn: 'إنهاء الجلسة',

    topSectorBar: 'البوابة الرئيسية للأرشيف الرسمي - القطاع 04-أ',
    classificationRestricted: 'التصنيف: سري ومقيد',
    protocolSys: 'البروتوكول: YMI-SYS-2026',
    authActive: 'المصادقة: نشطة',
    estYear: 'تأسس عام 1974',
    heroMotto: 'النظام في قلب الفوضى',
    heroDescription: 'المستودع المركزي لرفع السرية عن شواذ فضاء الطور، وديناميكيات انتشار عدوى الرنين في الأكسيلنيتيكا، والديناميكيات غير الخطية تحت إشراف معهد يعقوب مصافا.',
    statTotalArchives: 'سجلات الوثائق السرية',
    statCoreDiscipline: 'التخصصات المعرفية الأساسية',
    statSystemConsole: 'وحدة النزاهة والأمان',
    searchPlaceholder: 'البحث عن الشواذ، ورموز البروتوكولات، وأس الباحث الرئيسي...',
    exploreBtn: 'استكشاف الأرشيف',
    registerDossierBtn: '+ تسجيل وثيقة جديدة',

    akselHeaderBar: 'وثيقة رفعت عنها السرية // YMI-DOC-AKSEL-01',
    akselStatusVerified: 'الحالة: تم التحقق منها نظامياً',
    akselAuthAston: 'السلطة: أستون مارشيز',
    akselCategory: 'أطروحة تأسيسية معرفية',
    akselTitle: 'الأكسيلنيتيكا: ديناميكيات العشوائية وعدوى الرنين',
    akselSubtitle: 'نموذج جديد في الديناميكيات غير الخطية: استكشاف النظام الجوهري خلف التقلبات العشوائية وانتقال الاهتزاز في الأنظمة المعقدة المغلقة.',
    akselNoMathBadge: 'العلوم التجريبية غير الخطية',
    akselDomainBadge: 'مجال عابر للتخصصات',
    akselSectorBadge: 'قطاع الإشراف 04-أ',
    akselExecutiveTitle: 'الملخص التنفيذي والفرضية المركزية',
    akselExecutiveBody: 'الأكسيلنيتيكا (Axcelnetics) هي إطار نظري تأسس لردم الفجوة بين نظرية الفوضى الحتمية والميكانيكا العشوائية. على عكس النظرة الكلاسيكية التي تعتبر الضوضاء تشويشاً، تثبت الأكسيلنيتيكا أن العشوائية هي حامل معلومات عالي الكثافة يحفز رنيناً متسلسلاً بين كيانات فضاء الطور.',
    akselAxiomsTitle: 'بديهيات الأكسيلنيتيكا والمبادئ التشغيلية',
    akselP1Title: '1. مبدأ عدوى الرنين (Resonance Contagion)',
    akselP1Desc: 'تنتقل التقلبات العشوائية الدقيقة في أي عقدة محلية إلى العقد المحيطة بها عبر اقتران طوري غير مرئي، مما يخلق تجمعات متماسكة تلقائية.',
    akselP2Title: '2. حفظ التقلبات الجوهرية',
    akselP2Desc: 'لا تفنى الطاقة التبديدية الناتجة عن اللانظام، بل تتحول بنيوياً إلى متعددات شعب لجواذب ذات أبعاد كسرية.',
    akselP3Title: '3. انتقال الطور الأحادي',
    akselP3Desc: 'عند الوصول إلى العتبة الحرجة للاعتلاج (Sc)، يمر النظام بقفزة تشعبية شبه مستقرة تعيد تنظيم الفوضى في تناغم هيكلي أسمى.',
    akselSimTitle: 'محاكي حقل رنين الأكسيلنيتيكا (فضاء الحالة)',
    akselSimSub: 'محاكاة بصرية تفاعلية لانتشار موجات عدوى الرنين العشوائي. استخدم عناصر التحكم لضبط معلمات الاقتران.',
    akselSliderSpeed: 'سرعة الرنين (ω)',
    akselSliderSpeedDesc: 'تردد تذبذب انتشار الحقل',
    akselSliderRange: 'نطاق العدوى (R_c)',
    akselSliderRangeDesc: 'مدى تفاعل الاقتران العشوائي',
    akselFooterVerify: 'تم التحقق من قبل المجلس المعرفي لمعهد يعقوب مصافا · معتمد من أستون مارشيز (المهندس المعماري الرئيسي)',

    termHeaderBar: 'وحدة تدريب المشغلين // YAQS-DOS v4.1',
    termActiveBadge: 'جلسة التدريب نشطة',
    termTitle: 'دليل أوامر YAQS-DOS والدورة السريعة',
    termSubtitle: 'أتقن بناء جمل سطر الأوامر الرسمي للمعهد لاستخراج الوثائق السرية، وفحص سلامة التشفير SHA-256، وتحليل مسارات فضاء الطور.',
    termOpenFullBtn: 'فتح موجه الأوامر الكامل',
    termModulesTitle: 'وحدات التدريب القياسية ومجموعة الأوامر:',
    termLesson1Title: 'فحص المجلدات والملفات',
    termLesson1Desc: 'استخدم الأمر `list` أو `ls` للاطلاع على قائمة كافة وثائق الشواذ المحفوظة في الأرشيف.',
    termLesson2Title: 'قراءة الوثائق السرية',
    termLesson2Desc: 'اكتب `view [رقم-البروتوكول]` (مثال: `view ymi-chaos-014`) لعرض تفاصيل الوثيقة بالكامل.',
    termLesson3Title: 'البحث السريع بالكلمات المفتاحية',
    termLesson3Desc: 'استخدم `search [الكلمة]` لفرز الأرشيف بناءً على معايير وتصنيفات محددة.',
    termLesson4Title: 'تدقيق سلامة التشفير SHA-256',
    termLesson4Desc: 'نفّذ الأمر `scan` للتحقق من البصمات المشفرة لقاعدة البيانات بالكامل.',
    termLesson5Title: 'حالة النظام ومعلومات الصلاحيات',
    termLesson5Desc: 'اكتب `status` لعرض حالة حواجز الأمان للقطاع 04-أ وهوية الحساب النشط.',
    termPromptNotice: 'اكتب الأمر أدناه أو انقر على النماذج التدريبية أعلاه:',
    termInputPlaceholder: 'اكتب الأمر (مثال: list, scan, view ymi-chaos-014)...',
    termSendBtn: 'تنفيذ',

    archiveHeaderTag: 'دليل الخزائن السرية // YMI-VAULT-04',
    archiveMainTitle: 'أرشيف وثائق الشواذ وفضاء الحالة',
    archiveShowing: 'عرض',
    archiveAllClasses: 'كافة فئات الجواذب',
    archiveAllDivisions: 'كافة أقسام الأبحاث',
    archiveResetBtn: 'استعادة الافتراضي',
    archiveNoRecords: 'لا توجد وثائق مطابقة لمعايير البحث المحددة.',

    detailBackBtn: 'العودة إلى الأرشيف',
    detailPrintBtn: 'طباعة الوثيقة الرسمية (PDF)',
    detailProposeBtn: 'تقديم استدراك / تعديل بيانات',
    detailDeleteBtn: 'حذف الوثيقة',
    detailClassifiedTag: 'وثيقة مصنفة سرية // الولاية الرسمية لمعهد يعقوب مصافا',
    detailLeadResearcher: 'رئيس الباحثين:',
    detailClassifiedDate: 'تاريخ التصنيف:',
    detailRevisionDate: 'آخر مراجعة:',
    detailStatus: 'حالة الاعتماد:',
    detailTabContainment: 'بروتوكولات الاحتواء',
    detailTabMath: 'الصياغة الرياضية',
    detailTabDesc: 'توصيف الظاهرة',
    detailTabLogs: 'سجلات الملاحظة',

    labTag: 'المحاكاة العددية لفضاء الطور // مختبر الفوضى',
    labTitle: 'مختبر جاذب لورينز والديناميكيات الفوضوية',
    labSubtitle: 'تنفيذ عمليات التكامل ثلاثية الأبعاد للأنظمة التفاضلية غير الخطية وتتبع مسارات الجواذب الغريبة.',
    labAttractorLorenz: 'جاذب لورينز الكلاسيكي',
    labSimSpeed: 'سرعة تطور المحاكاة:',
    labResetSim: 'إعادة ضبط الإحداثيات',

    manifestoTag: 'المرسوم التأسيسي // الميثاق الدستوري',
    manifestoTitle: 'ميثاق معهد يعقوب مصافا',
    manifestoSubtitle: 'الدستور المعرفي والمبادئ الموجهة للعلوم غير الخطية.',
    manifestoArticle1Title: 'المادة الأولى: بديهية السيادة غير الخطية',
    manifestoArticle1Body: 'السببية الخطية هي تقريب بشري مناسب للإدراك الحسي وليست قانوناً جوهرياً في الكون. الحقيقة تكمن في الاعتماد الحساس على الشروط الأولية.',
    manifestoArticle2Title: 'المادة الثانية: قدسية البيانات الظاهراتية المجردة',
    manifestoArticle2Body: 'لا يجوز استبعاد أي مسار شاذ لمجرد مخالفته للعقائد السائدة. الأمانة المعرفية تقتضي حفظ الشواذ بنقائها الرياضي الأصيل.',
    manifestoArticle3Title: 'المادة الثالثة: الرعاية السيادية للنظام المعرفي',
    manifestoArticle3Body: 'يجب حماية معرفة الرنين غير الخطي من الاستغلال المزعزع للاستقرار. يقف المعهد حارساً أبدياً للنظام في قلب الفوضى.',

    secTag: 'الرقابة وحماية الوصول // القطاع 04-أ',
    secTitle: 'مركز الأمان والرقابة الإبستيمولوجية',
    secSubtitle: 'التدقيق الفوري لسلامة الوثائق، وسجلات وصول الباحثين، وجدار الحماية السببي، وكواشف الاختراق.',
    secScanBtn: 'فحص سلامة البيانات SHA-256',
    secScanningMsg: 'جارٍ فحص كتل ذاكرة الأرشيف...',
    secLockdownBtn: 'بروتوكول الحجر الصحي الطارئ',
    secThreatLevelLabel: 'مستوى التهديد',
    secFirewallLabel: 'الجدار السببي',
    secHashLabel: 'البصمة المشفرة',
    secSessionsLabel: 'الجلسات والتدقيق النشط',
    secAuditFeedTitle: 'سجل تدقيق الأمان والوصول الفوري',

    footerSector: 'سجل أرشيف القطاع 04-أ',
    footerSession: 'الجلسة النشطة',
    footerJsonBtn: 'قاعدة بيانات JSON',
    footerPrivacyBtn: 'سياسة الخصوصية',
    footerTermsBtn: 'شروط الوصول',
    settingsModalTitle: 'إعدادات وسياسات المعهد',
    settingsModalSubtitle: 'معهد يعقوب مصافا · المستودع المركزي للقطاع 04-أ',
    tabLanguage: 'اللغة',
    tabPrivacy: 'سياسة الخصوصية',
    tabTerms: 'شروط الاستخدام',
    tabSystem: 'النظام والذاكرة',
    closeBtn: 'إغلاق',
  },
};

export const TRANSLATIONS = COMPLETE_TRANSLATIONS;

const LANG_STORAGE_KEY = 'ymi_language_preference';

export const getStoredLanguage = (): SupportedLanguage => {
  try {
    const val = localStorage.getItem(LANG_STORAGE_KEY);
    if (val === 'id' || val === 'ar' || val === 'en') return val;
    return 'id'; // Indonesian language default
  } catch {
    return 'id';
  }
};

export const setStoredLanguage = (lang: SupportedLanguage): void => {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (e) {
    console.error('Failed to save language preference', e);
  }
};

export interface CompleteTranslations {
  // Brand & Nav
  brandTitle: string;
  brandTagline: string;
  homeNav: string;
  archiveNav: string;
  studioNav: string;
  labNav: string;
  manifestoNav: string;
  terminalNav: string;
  securityNav: string;
  uploadBtn: string;
  settingsBtn: string;
  loginBtn: string;
  logoutBtn: string;

  // Hero Section
  topSectorBar: string;
  classificationRestricted: string;
  protocolSys: string;
  authActive: string;
  estYear: string;
  heroMotto: string;
  heroDescription: string;
  statTotalArchives: string;
  statCoreDiscipline: string;
  statSystemConsole: string;
  searchPlaceholder: string;
  exploreBtn: string;
  registerDossierBtn: string;

  // Akselnetika (Axcelnetics)
  akselHeaderBar: string;
  akselStatusVerified: string;
  akselAuthAston: string;
  akselCategory: string;
  akselTitle: string;
  akselSubtitle: string;
  akselNoMathBadge: string;
  akselDomainBadge: string;
  akselSectorBadge: string;
  akselExecutiveTitle: string;
  akselExecutiveBody: string;
  akselAxiomsTitle: string;
  akselP1Title: string;
  akselP1Desc: string;
  akselP2Title: string;
  akselP2Desc: string;
  akselP3Title: string;
  akselP3Desc: string;
  akselSimTitle: string;
  akselSimSub: string;
  akselSliderSpeed: string;
  akselSliderSpeedDesc: string;
  akselSliderRange: string;
  akselSliderRangeDesc: string;
  akselFooterVerify: string;

  // Terminal Course
  termHeaderBar: string;
  termActiveBadge: string;
  termTitle: string;
  termSubtitle: string;
  termOpenFullBtn: string;
  termModulesTitle: string;
  termLesson1Title: string;
  termLesson1Desc: string;
  termLesson2Title: string;
  termLesson2Desc: string;
  termLesson3Title: string;
  termLesson3Desc: string;
  termLesson4Title: string;
  termLesson4Desc: string;
  termLesson5Title: string;
  termLesson5Desc: string;
  termPromptNotice: string;
  termInputPlaceholder: string;
  termSendBtn: string;

  // Archive & Dossier List
  archiveHeaderTag: string;
  archiveMainTitle: string;
  archiveShowing: string;
  archiveAllClasses: string;
  archiveAllDivisions: string;
  archiveResetBtn: string;
  archiveNoRecords: string;

  // Dossier Detail
  detailBackBtn: string;
  detailPrintBtn: string;
  detailProposeBtn: string;
  detailDeleteBtn: string;
  detailClassifiedTag: string;
  detailLeadResearcher: string;
  detailClassifiedDate: string;
  detailRevisionDate: string;
  detailStatus: string;
  detailTabContainment: string;
  detailTabMath: string;
  detailTabDesc: string;
  detailTabLogs: string;

  // Chaos Lab
  labTag: string;
  labTitle: string;
  labSubtitle: string;
  labAttractorLorenz: string;
  labSimSpeed: string;
  labResetSim: string;

  // Manifesto
  manifestoTag: string;
  manifestoTitle: string;
  manifestoSubtitle: string;
  manifestoArticle1Title: string;
  manifestoArticle1Body: string;
  manifestoArticle2Title: string;
  manifestoArticle2Body: string;
  manifestoArticle3Title: string;
  manifestoArticle3Body: string;

  // Security Center
  secTag: string;
  secTitle: string;
  secSubtitle: string;
  secScanBtn: string;
  secScanningMsg: string;
  secLockdownBtn: string;
  secThreatLevelLabel: string;
  secFirewallLabel: string;
  secHashLabel: string;
  secSessionsLabel: string;
  secAuditFeedTitle: string;

  // Footer & Settings Modal
  footerSector: string;
  footerSession: string;
  footerJsonBtn: string;
  footerPrivacyBtn: string;
  footerTermsBtn: string;
  settingsModalTitle: string;
  settingsModalSubtitle: string;
  tabLanguage: string;
  tabPrivacy: string;
  tabTerms: string;
  tabSystem: string;
  closeBtn: string;
}

export const COMPLETE_TRANSLATIONS: Record<SupportedLanguage, CompleteTranslations> = {
  // 1. GLOBAL (ENGLISH - PRIMARY STANDARD)
  en: {
    brandTitle: 'Yaqoob Mosafa Institute',
    brandTagline: 'Order at the Heart of Chaos',
    homeNav: 'Home Portal',
    archiveNav: 'Classified Archive',
    studioNav: 'Research Studio',
    labNav: 'Chaos Lab',
    manifestoNav: 'Institute Manifesto',
    terminalNav: 'Terminal Console',
    securityNav: 'Security & Surveillance',
    uploadBtn: '+ Register Dossier',
    settingsBtn: 'Settings',
    loginBtn: 'Sign In / SSO',
    logoutBtn: 'End Session',

    topSectorBar: 'OFFICIAL ARCHIVAL REPOSITORY PORTAL - SECTOR 04-A',
    classificationRestricted: 'CLASSIFICATION: RESTRICTED',
    protocolSys: 'PROTOCOL: YMI-SYS-2026',
    authActive: 'AUTH: ACTIVE',
    estYear: 'EST. 1974',
    heroMotto: 'Order at the Heart of Chaos',
    heroDescription: 'Central repository for declassified phase-space anomalies, Axcelnetics resonance contagion dynamics, and non-linear epistemics under the jurisdiction of Yaqoob Mosafa Institute.',
    statTotalArchives: 'Classified Dossiers Vault',
    statCoreDiscipline: 'Core Epistemic Disciplines',
    statSystemConsole: 'Integrity & Security Console',
    searchPlaceholder: 'Search anomalies, protocol codes, Lyapunov exponents, lead researcher...',
    exploreBtn: 'Explore Archives',
    registerDossierBtn: '+ Submit New Dossier',

    akselHeaderBar: 'DECLASSIFIED TREATISE // YMI-DOC-AKSEL-01',
    akselStatusVerified: 'STATUS: SYSTEM VERIFIED',
    akselAuthAston: 'AUTHORITY: ASTON MARCHIES',
    akselCategory: 'FOUNDATIONAL EPISTEMIC TREATISE',
    akselTitle: 'Axcelnetics: Randomness Dynamics & Resonance Contagion',
    akselSubtitle: 'A breakthrough non-linear dynamics paradigm: Deciphering the intrinsic order behind stochastic fluctuations and vibration contagion across closed complex systems.',
    akselNoMathBadge: 'Applied Non-Linear Science',
    akselDomainBadge: 'Trans-Disciplinary Domain',
    akselSectorBadge: 'Curation Sector 04-A',
    akselExecutiveTitle: 'Executive Summary & Core Epistemic Thesis',
    akselExecutiveBody: 'Axcelnetics is a rigorous mathematical and philosophical framework formulated to bridge the vacuum between deterministic chaos theory and stochastic mechanics. Rather than treating random noise as interference, Axcelnetics proves that high-entropy randomness acts as a dense information carrier triggering coherent resonance avalanches.',
    akselAxiomsTitle: 'Axcelnetics Axioms & Operational Principles',
    akselP1Title: '1. Principle of Resonance Contagion',
    akselP1Desc: 'Microscopic stochastic phase shifts on a local node propagate contagiously to surrounding nodes through non-local phase coupling, inducing spontaneous coherence clusters.',
    akselP2Title: '2. Conservation of Intrinsic Fluctuation',
    akselP2Desc: 'Dissipative energy from disorder is never extinguished; it is systematically mapped into fractional-dimension attractor manifolds.',
    akselP3Title: '3. Singular Phase Transition',
    akselP3Desc: 'At a critical entropy threshold (Sc), the system undergoes a metastable bifurcation jump that reorganizes chaos into higher-order structural harmony.',
    akselSimTitle: 'Axcelnetics Resonance Field Simulator (Phase Space)',
    akselSimSub: 'Interactive canvas visualizer for stochastic resonance contagion wavefronts. Adjust coupling parameters below.',
    akselSliderSpeed: 'Resonance Velocity (ω)',
    akselSliderSpeedDesc: 'Field propagation oscillation frequency',
    akselSliderRange: 'Contagion Radius (R_c)',
    akselSliderRangeDesc: 'Stochastic coupling interaction reach',
    akselFooterVerify: 'Validated by Yaqoob Mosafa Epistemic Council · Approved by Aston Marchies (Principal Architect)',

    termHeaderBar: 'OPERATOR TRAINING MODULE // YAQS-DOS v4.1',
    termActiveBadge: 'TRAINING SESSION ACTIVE',
    termTitle: 'YAQS-DOS Command Line Quickstart & Mastery Course',
    termSubtitle: 'Master official institute terminal syntax to query classified dossiers, execute SHA-256 cryptographic audits, and inspect phase-space trajectories.',
    termOpenFullBtn: 'Launch Full Terminal',
    termModulesTitle: 'Standard Training Modules & Core Command Set:',
    termLesson1Title: 'Directory & File Inspection',
    termLesson1Desc: 'Use `list` or `ls` to query all classified anomaly records currently preserved in the archive.',
    termLesson2Title: 'Reading Classified Dossier Records',
    termLesson2Desc: 'Type `view [protocol-number]` (e.g. `view ymi-chaos-014`) to declassify and read complete dossier records.',
    termLesson3Title: 'Rapid Keyword Filtering',
    termLesson3Desc: 'Execute `search [keyword]` to filter documents by research discipline, attractor class, or researcher.',
    termLesson4Title: 'Cryptographic SHA-256 Integrity Audit',
    termLesson4Desc: 'Execute `scan` to verify tamper-proof cryptographic checksums across the entire database.',
    termLesson5Title: 'System Status & Security Telemetry',
    termLesson5Desc: 'Type `status` to inspect Sector 04-A defense barriers and the active researcher identity.',
    termPromptNotice: 'Type command below or click standard training modules above:',
    termInputPlaceholder: 'Enter command (e.g., list, scan, view ymi-chaos-014)...',
    termSendBtn: 'Execute',

    archiveHeaderTag: 'CLASSIFIED VAULT DIRECTORY // YMI-VAULT-04',
    archiveMainTitle: 'Classified Anomaly Records & Phase-Space Archive',
    archiveShowing: 'Displaying',
    archiveAllClasses: 'All Attractor Classes',
    archiveAllDivisions: 'All Research Divisions',
    archiveResetBtn: 'Restore Default',
    archiveNoRecords: 'No classified records match the specified search parameters.',

    detailBackBtn: 'Back to Archive',
    detailPrintBtn: 'Print Official Record (PDF)',
    detailProposeBtn: 'Submit Errata / Revision',
    detailDeleteBtn: 'Delete Record',
    detailClassifiedTag: 'CLASSIFIED DOCUMENT // OFFICIAL YMI JURISDICTION',
    detailLeadResearcher: 'Lead Researcher:',
    detailClassifiedDate: 'Classified Date:',
    detailRevisionDate: 'Last Revision:',
    detailStatus: 'Curation Status:',
    detailTabContainment: 'Containment Protocols',
    detailTabMath: 'Mathematical Formulation',
    detailTabDesc: 'Phenomena Description',
    detailTabLogs: 'Observation Logs',

    labTag: 'NUMERICAL PHASE-SPACE SIMULATION // CHAOS LAB',
    labTitle: 'Lorenz Attractor & Dynamic Chaos Laboratory',
    labSubtitle: 'Run dynamic 3D integrations of non-linear differential systems and observe strange attractor trajectories.',
    labAttractorLorenz: 'Lorenz Classical Attractor',
    labSimSpeed: 'Simulation Evolution Speed:',
    labResetSim: 'Reset Phase Space',

    manifestoTag: 'FOUNDATIONAL DECREE // CONSTITUTIONAL CHARTER',
    manifestoTitle: 'The Manifesto of Yaqoob Mosafa Institute',
    manifestoSubtitle: 'The epistemological constitution and guiding principles of non-linear science.',
    manifestoArticle1Title: 'Article I: The Axiom of Non-Linear Supremacy',
    manifestoArticle1Body: 'Linear causality is a convenient approximation of human perception, not an intrinsic law of the cosmos. True reality resides within sensitive dependence on initial conditions.',
    manifestoArticle2Title: 'Article II: The Inviolability of Raw Phenomenological Data',
    manifestoArticle2Body: 'No anomalous trajectory shall be discarded merely because it defies existing dogma. Epistemic honesty demands preserving anomalies in their unredacted mathematical purity.',
    manifestoArticle3Title: 'Article III: Sovereign Stewardship of Epistemic Order',
    manifestoArticle3Body: 'Knowledge of non-linear resonance must be guarded against destabilizing exploitation. The institute stands as the eternal sentry of order at the heart of chaos.',

    secTag: 'SURVEILLANCE & ACCESS PROTECTION // SECTOR 04-A',
    secTitle: 'Epistemic Security & Surveillance Center',
    secSubtitle: 'Real-time record checksum audits, researcher access logs, causal firewalls, and anomaly intrusion detection.',
    secScanBtn: 'Audit SHA-256 Integrity',
    secScanningMsg: 'Auditing archive memory blocks...',
    secLockdownBtn: 'Emergency Quarantine Protocol',
    secThreatLevelLabel: 'Threat Level',
    secFirewallLabel: 'Causal Firewall',
    secHashLabel: 'Cryptographic Hash',
    secSessionsLabel: 'Active Audited Sessions',
    secAuditFeedTitle: 'REAL-TIME SECURITY & ACCESS AUDIT LOG',

    footerSector: 'Sector 04-A Archival Registry',
    footerSession: 'Active Session',
    footerJsonBtn: 'JSON Database',
    footerPrivacyBtn: 'Privacy Policy',
    footerTermsBtn: 'Access Terms',
    settingsModalTitle: 'Institute Settings & Governance',
    settingsModalSubtitle: 'Yaqoob Mosafa Institute · Sector 04-A Central Repository',
    tabLanguage: 'Language',
    tabPrivacy: 'Privacy Policy',
    tabTerms: 'Access Terms',
    tabSystem: 'System & Memory',
    closeBtn: 'Close',
  },

  // 2. ARABIC (العربية)
  ar: {
    brandTitle: 'معهد يعقوب مصافا',
    brandTagline: 'النظام في قلب الفوضى',
    homeNav: 'الرئيسية',
    archiveNav: 'أرشيف الوثائق',
    studioNav: 'استوديو الأبحاث',
    labNav: 'محاكاة الفوضى',
    manifestoNav: 'ميثاق المعهد',
    terminalNav: 'موجه الأوامر',
    securityNav: 'الأمان والرقابة',
    uploadBtn: '+ رفع وثيقة',
    settingsBtn: 'الإعدادات',
    loginBtn: 'تسجيل الدخول المؤسسي',
    logoutBtn: 'إنهاء الجلسة',

    topSectorBar: 'البوابة الرئيسية للأرشيف الرسمي - القطاع 04-أ',
    classificationRestricted: 'التصنيف: سري ومقيد',
    protocolSys: 'البروتوكول: YMI-SYS-2026',
    authActive: 'المصادقة: نشطة',
    estYear: 'تأسس عام 1974',
    heroMotto: 'النظام في قلب الفوضى',
    heroDescription: 'المستودع المركزي لرفع السرية عن شواذ فضاء الطور، وديناميكيات انتشار عدوى الرنين في الأكسيلنيتيكا، والديناميكيات غير الخطية تحت إشراف معهد يعقوب مصافا.',
    statTotalArchives: 'سجلات الوثائق السرية',
    statCoreDiscipline: 'التخصصات المعرفية الأساسية',
    statSystemConsole: 'وحدة النزاهة والأمان',
    searchPlaceholder: 'البحث عن الشواذ، ورموز البروتوكولات، وأس الباحث الرئيسي...',
    exploreBtn: 'استكشاف الأرشيف',
    registerDossierBtn: '+ تسجيل وثيقة جديدة',

    akselHeaderBar: 'وثيقة رفعت عنها السرية // YMI-DOC-AKSEL-01',
    akselStatusVerified: 'الحالة: تم التحقق منها نظامياً',
    akselAuthAston: 'السلطة: أستون مارشيز',
    akselCategory: 'أطروحة تأسيسية معرفية',
    akselTitle: 'الأكسيلنيتيكا: ديناميكيات العشوائية وعدوى الرنين',
    akselSubtitle: 'نموذج جديد في الديناميكيات غير الخطية: استكشاف النظام الجوهري خلف التقلبات العشوائية وانتقال الاهتزاز في الأنظمة المعقدة المغلقة.',
    akselNoMathBadge: 'العلوم التجريبية غير الخطية',
    akselDomainBadge: 'مجال عابر للتخصصات',
    akselSectorBadge: 'قطاع الإشراف 04-أ',
    akselExecutiveTitle: 'الملخص التنفيذي والفرضية المركزية',
    akselExecutiveBody: 'الأكسيلنيتيكا (Axcelnetics) هي إطار نظري تأسس لردم الفجوة بين نظرية الفوضى الحتمية والميكانيكا العشوائية. على عكس النظرة الكلاسيكية التي تعتبر الضوضاء تشويشاً، تثبت الأكسيلنيتيكا أن العشوائية هي حامل معلومات عالي الكثافة يحفز رنيناً متسلسلاً بين كيانات فضاء الطور.',
    akselAxiomsTitle: 'بديهيات الأكسيلنيتيكا والمبادئ التشغيلية',
    akselP1Title: '1. مبدأ عدوى الرنين (Resonance Contagion)',
    akselP1Desc: 'تنتقل التقلبات العشوائية الدقيقة في أي عقدة محلية إلى العقد المحيطة بها عبر اقتران طوري غير مرئي، مما يخلق تجمعات متماسكة تلقائية.',
    akselP2Title: '2. حفظ التقلبات الجوهرية',
    akselP2Desc: 'لا تفنى الطاقة التبديدية الناتجة عن اللانظام، بل تتحول بنيوياً إلى متعددات شعب لجواذب ذات أبعاد كسرية.',
    akselP3Title: '3. انتقال الطور الأحادي',
    akselP3Desc: 'عند الوصول إلى العتبة الحرجة للاعتلاج (Sc)، يمر النظام بقفزة تشعبية شبه مستقرة تعيد تنظيم الفوضى في تناغم هيكلي أسمى.',
    akselSimTitle: 'محاكي حقل رنين الأكسيلنيتيكا (فضاء الحالة)',
    akselSimSub: 'محاكاة بصرية تفاعلية لانتشار موجات عدوى الرنين العشوائي. استخدم عناصر التحكم لضبط معلمات الاقتران.',
    akselSliderSpeed: 'سرعة الرنين (ω)',
    akselSliderSpeedDesc: 'تردد تذبذب انتشار الحقل',
    akselSliderRange: 'نطاق العدوى (R_c)',
    akselSliderRangeDesc: 'مدى تفاعل الاقتران العشوائي',
    akselFooterVerify: 'تم التحقق من قبل المجلس المعرفي لمعهد يعقوب مصافا · معتمد من أستون مارشيز (المهندس المعماري الرئيسي)',

    termHeaderBar: 'وحدة تدريب المشغلين // YAQS-DOS v4.1',
    termActiveBadge: 'جلسة التدريب نشطة',
    termTitle: 'دليل أوامر YAQS-DOS والدورة السريعة',
    termSubtitle: 'أتقن بناء جمل سطر الأوامر الرسمي للمعهد لاستخراج الوثائق السرية، وفحص سلامة التشفير SHA-256، وتحليل مسارات فضاء الطور.',
    termOpenFullBtn: 'فتح موجه الأوامر الكامل',
    termModulesTitle: 'وحدات التدريب القياسية ومجموعة الأوامر:',
    termLesson1Title: 'فحص المجلدات والملفات',
    termLesson1Desc: 'استخدم الأمر `list` أو `ls` للاطلاع على قائمة كافة وثائق الشواذ المحفوظة في الأرشيف.',
    termLesson2Title: 'قراءة الوثائق السرية',
    termLesson2Desc: 'اكتب `view [رقم-البروتوكول]` (مثال: `view ymi-chaos-014`) لعرض تفاصيل الوثيقة بالكامل.',
    termLesson3Title: 'البحث السريع بالكلمات المفتاحية',
    termLesson3Desc: 'استخدم `search [الكلمة]` لفرز الأرشيف بناءً على معايير وتصنيفات محددة.',
    termLesson4Title: 'تدقيق سلامة التشفير SHA-256',
    termLesson4Desc: 'نفّذ الأمر `scan` للتحقق من البصمات المشفرة لقاعدة البيانات بالكامل.',
    termLesson5Title: 'حالة النظام ومعلومات الصلاحيات',
    termLesson5Desc: 'اكتب `status` لعرض حالة حواجز الأمان للقطاع 04-أ وهوية الحساب النشط.',
    termPromptNotice: 'اكتب الأمر أدناه أو انقر على النماذج التدريبية أعلاه:',
    termInputPlaceholder: 'اكتب الأمر (مثال: list, scan, view ymi-chaos-014)...',
    termSendBtn: 'تنفيذ',

    archiveHeaderTag: 'دليل الخزائن السرية // YMI-VAULT-04',
    archiveMainTitle: 'أرشيف وثائق الشواذ وفضاء الحالة',
    archiveShowing: 'عرض',
    archiveAllClasses: 'كافة فئات الجواذب',
    archiveAllDivisions: 'كافة أقسام الأبحاث',
    archiveResetBtn: 'استعادة الافتراضي',
    archiveNoRecords: 'لا توجد وثائق مطابقة لمعايير البحث المحددة.',

    detailBackBtn: 'العودة إلى الأرشيف',
    detailPrintBtn: 'طباعة الوثيقة الرسمية (PDF)',
    detailProposeBtn: 'تقديم استدراك / تعديل بيانات',
    detailDeleteBtn: 'حذف الوثيقة',
    detailClassifiedTag: 'وثيقة مصنفة سرية // الولاية الرسمية لمعهد يعقوب مصافا',
    detailLeadResearcher: 'رئيس الباحثين:',
    detailClassifiedDate: 'تاريخ التصنيف:',
    detailRevisionDate: 'آخر مراجعة:',
    detailStatus: 'حالة الاعتماد:',
    detailTabContainment: 'بروتوكولات الاحتواء',
    detailTabMath: 'الصياغة الرياضية',
    detailTabDesc: 'توصيف الظاهرة',
    detailTabLogs: 'سجلات الملاحظة',

    labTag: 'المحاكاة العددية لفضاء الطور // مختبر الفوضى',
    labTitle: 'مختبر جاذب لورينز والديناميكيات الفوضوية',
    labSubtitle: 'تنفيذ عمليات التكامل ثلاثية الأبعاد للأنظمة التفاضلية غير الخطية وتتبع مسارات الجواذب الغريبة.',
    labAttractorLorenz: 'جاذب لورينز الكلاسيكي',
    labSimSpeed: 'سرعة تطور المحاكاة:',
    labResetSim: 'إعادة ضبط الإحداثيات',

    manifestoTag: 'المرسوم التأسيسي // الميثاق الدستوري',
    manifestoTitle: 'ميثاق معهد يعقوب مصافا',
    manifestoSubtitle: 'الدستور المعرفي والمبادئ الموجهة للعلوم غير الخطية.',
    manifestoArticle1Title: 'المادة الأولى: بديهية السيادة غير الخطية',
    manifestoArticle1Body: 'السببية الخطية هي تقريب بشري مناسب للإدراك الحسي وليست قانوناً جوهرياً في الكون. الحقيقة تكمن في الاعتماد الحساس على الشروط الأولية.',
    manifestoArticle2Title: 'المادة الثانية: قدسية البيانات الظاهراتية المجردة',
    manifestoArticle2Body: 'لا يجوز استبعاد أي مسار شاذ لمجرد مخالفته للعقائد السائدة. الأمانة المعرفية تقتضي حفظ الشواذ بنقائها الرياضي الأصيل.',
    manifestoArticle3Title: 'المادة الثالثة: الرعاية السيادية للنظام المعرفي',
    manifestoArticle3Body: 'يجب حماية معرفة الرنين غير الخطي من الاستغلال المزعزع للاستقرار. يقف المعهد حارساً أبدياً للنظام في قلب الفوضى.',

    secTag: 'الرقابة وحماية الوصول // القطاع 04-أ',
    secTitle: 'مركز الأمان والرقابة الإبستيمولوجية',
    secSubtitle: 'التدقيق الفوري لسلامة الوثائق، وسجلات وصول الباحثين، وجدار الحماية السببي، وكواشف الاختراق.',
    secScanBtn: 'فحص سلامة البيانات SHA-256',
    secScanningMsg: 'جارٍ فحص كتل ذاكرة الأرشيف...',
    secLockdownBtn: 'بروتوكول الحجر الصحي الطارئ',
    secThreatLevelLabel: 'مستوى التهديد',
    secFirewallLabel: 'الجدار السببي',
    secHashLabel: 'البصمة المشفرة',
    secSessionsLabel: 'الجلسات والتدقيق النشط',
    secAuditFeedTitle: 'سجل تدقيق الأمان والوصول الفوري',

    footerSector: 'سجل أرشيف القطاع 04-أ',
    footerSession: 'الجلسة النشطة',
    footerJsonBtn: 'قاعدة بيانات JSON',
    footerPrivacyBtn: 'سياسة الخصوصية',
    footerTermsBtn: 'شروط الوصول',
    settingsModalTitle: 'إعدادات وسياسات المعهد',
    settingsModalSubtitle: 'معهد يعقوب مصافا · المستودع المركزي للقطاع 04-أ',
    tabLanguage: 'اللغة',
    tabPrivacy: 'سياسة الخصوصية',
    tabTerms: 'شروط الاستخدام',
    tabSystem: 'النظام والذاكرة',
    closeBtn: 'إغلاق',
  },
};

export const TRANSLATIONS = COMPLETE_TRANSLATIONS;

const LANG_STORAGE_KEY = 'ymi_language_preference';

export const getStoredLanguage = (): SupportedLanguage => {
  try {
    const val = localStorage.getItem(LANG_STORAGE_KEY);
    if (val === 'ar' || val === 'en') return val;
    return 'en'; // Global language default
  } catch {
    return 'en';
  }
};

export const setStoredLanguage = (lang: SupportedLanguage): void => {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (e) {
    console.error('Failed to save language preference', e);
  }
};
