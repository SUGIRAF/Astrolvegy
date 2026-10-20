export interface ZodiacRomanceProfile {
  sign: string;
  symbol: string;
  element: 'Api' | 'Tanah' | 'Udara' | 'Air';
  quality: string;
  rulingPlanet: string;
  dateRange: string;
  tagline: string;
  romanticPersonality: {
    overview: string;
    whenInLove: string[];
    greenFlags: string[];
    flirtingStyle: string;
    kissingVibe: string;
  };
  datePreferences: {
    idealDates: string[];
    romanticHobbies: string[];
    atmosphere: string;
  };
  culinaryLove: {
    favoriteDateFood: string[];
    romanticDrinks: string[];
    diningStyle: string;
  };
  loveLanguage: {
    primary: string;
    secondary: string;
    howTheyShowLove: string;
    howToMakeThemFeelLoved: string;
  };
  idealGifts: string[];
  communicationTips: {
    topicsToSparkInterest: string[];
    whatToAvoid: string[];
    bestFirstDateConversation: string;
  };
  soulmateCompatibility: {
    bestMatches: string[];
    challengingMatches: string[];
    twinFlameInsight: string;
  };
}

export const ZODIAC_ROMANCE_DATA: Record<string, ZodiacRomanceProfile> = {
  Aries: {
    sign: 'Aries',
    symbol: '♈',
    element: 'Api',
    quality: 'Kardinal',
    rulingPlanet: 'Mars',
    dateRange: '21 Mar - 19 Apr',
    tagline: 'Pemberani yang mencintai dengan kobaran gairah spontan dan inisiatif tinggi.',
    romanticPersonality: {
      overview: 'Aries adalah pemburu cinta sejati yang tak kenal takut. Jika mereka menyukaimu, kamu tidak perlu menebak-nebak—mereka akan menunjukkannya dengan jelas dan penuh semangat.',
      whenInLove: [
        'Sangat protektif dan bangga memperlihatkan pasangannya ke teman-temannya',
        'Mengambil inisiatif pertama untuk mengajak kencan dan merencanakan petualangan',
        'Menyukai tatap mata intens dan sentuhan spontan yang penuh energi',
        'Cepat memaafkan dan tidak suka memendam rasa dongkol lama-lama'
      ],
      greenFlags: ['Jujur tanpa sandiwara', 'Setia saat menemukan pasangan yang dihormatinya', 'Selalu mendukung impianmu dengan gigih'],
      flirtingStyle: 'Tatap mata langsung, lelucon menggoda, dan sentuhan lengan spontan.',
      kissingVibe: 'Gairah yang membara, impulsif, dan penuh antusiasme.'
    },
    datePreferences: {
      idealDates: [
        'Gokart atau arena permainan interaktif seru',
        'Konser musik live dengan energi tinggi',
        'Kuliner malam street food keliling kota',
        'Hiking bukit saat fajar untuk melihat sunrise bersama'
      ],
      romanticHobbies: ['Olahraga bersama', 'Road trip spontan tanpa rencana rumit', 'Menonton pertandingan seru', 'Arcade game battle'],
      atmosphere: 'Dinamis, menyenangkan, penuh tawa, dan sedikit memicu adrenalin.'
    },
    culinaryLove: {
      favoriteDateFood: ['Ayam geprek pedas gurih', 'Barbeque / Korean BBQ panggang', 'Steak daging tenderloin dengan saus lada hitam'],
      romanticDrinks: ['Espresso double shot', 'Mocktail citrus soda segar', 'Ice spiced chai latte'],
      diningStyle: 'Makan santai yang seru dengan porsi mengenyangkan dan aroma menggugah selera.'
    },
    loveLanguage: {
      primary: 'Physical Touch',
      secondary: 'Words of Affirmation',
      howTheyShowLove: 'Menggenggam tangan di tempat umum, mencuri ciuman pipi, dan membela pasangan saat ada masalah.',
      howToMakeThemFeelLoved: 'Pujilah keberanian dan pencapaian mereka. Berikan apresiasi saat mereka mengambil inisiatif kencan.'
    },
    idealGifts: [
      'Jaket sporty atau sneakers stylish',
      'Tiket konser artis favorit berdua',
      'Parfum aroma woody segar yang memikat',
      'Jam tangan sporty tahan air'
    ],
    communicationTips: {
      topicsToSparkInterest: ['Tujuan hidup ambisius', 'Petualangan traveling paling gila', 'Olahraga dan hobi favorit'],
      whatToAvoid: ['Bersikap pasif-agresif atau kode-kode rumit', 'Terlalu lambat merespons pesan tanpa alasan'],
      bestFirstDateConversation: '"Kalau besok kamu punya tiket ke mana saja tanpa batas, tempat apa yang langsung kamu datangi bersamaku?"'
    },
    soulmateCompatibility: {
      bestMatches: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
      challengingMatches: ['Cancer', 'Capricorn'],
      twinFlameInsight: 'Leo menyalakan api kebanggaan Aries, sementara Sagittarius memberikan ruang petualangan tanpa batas.'
    }
  },

  Taurus: {
    sign: 'Taurus',
    symbol: '♉',
    element: 'Tanah',
    quality: 'Tetap',
    rulingPlanet: 'Venus',
    dateRange: '20 Apr - 20 Mei',
    tagline: 'Sang kekasih setia yang memanjakan indra dengan kehangatan dan kenyamanan.',
    romanticPersonality: {
      overview: 'Dinaungi oleh Venus—dewi cinta dan keindahan—Taurus adalah pasangan paling dapat diandalkan, sensual, dan menghargai kenyamanan fisik.',
      whenInLove: [
        'Memperhatikan kenyamanan pasangan dari hal kecil (suhu ruangan, makanan enak)',
        'Kesetiaan mutlak—begitu mereka berkomitmen, mereka ada untuk jangka panjang',
        'Menyukai pelukan hangat berlama-lama di sofa empuk',
        'Mengingat detail makanan favoritmu hingga ke topping-toppingnya'
      ],
      greenFlags: ['Sangat konsisten', 'Pendengar yang sabar dan tenang', 'Bisa diandalkan saat masa sulit'],
      flirtingStyle: 'Tatapan teduh yang dalam, wewangian memikat, dan gestur membetulkan rambutmu.',
      kissingVibe: 'Lembut, perlahan, sensual, dan penuh kenikmatan mendalam.'
    },
    datePreferences: {
      idealDates: [
        'Fine dining santai di restoran berpemandangan indah',
        'Piknik sore di taman rindang dengan keranjang keju & buah',
        'Memasak pasta rumahan bersama sambil menyetel piringan hitam',
        'Kencan spa relaksasi atau foot reflexology berdua'
      ],
      romanticHobbies: ['Memasak & baking', 'Merawat tanaman hias', 'Mendengarkan musik akustik berkualitas tinggi', 'Membeli lilin aromaterapi'],
      atmosphere: 'Mewah nan nyaman, tenang, beraroma harum vanila/kayu manis, dan privat.'
    },
    culinaryLove: {
      favoriteDateFood: ['Truffle mushroom pasta creamy', 'Wagyu ribeye steak panggang mentega', 'Gelato artisan Italia', 'Pastry croissant mentega hangat'],
      romanticDrinks: ['Red wine kualitas bagus', 'Matcha latte hangat dengan oat milk', 'Hot chocolate pekat'],
      diningStyle: 'Makan malam mewah tanpa terburu-buru, menikmati setiap suapan dengan obrolan intim.'
    },
    loveLanguage: {
      primary: 'Receiving Gifts',
      secondary: 'Physical Touch',
      howTheyShowLove: 'Membelikan makanan kesukaanmu saat kamu lelah, memeluk erat, dan memberi rasa aman finansial & emosi.',
      howToMakeThemFeelLoved: 'Beri mereka hadiah berkualitas tinggi yang berwujud nyata, peluk erat, dan jangan pernah mengingkari janji kencan.'
    },
    idealGifts: [
      'Syal wol kasmir lembut atau selimut empuk',
      'Lilin aromaterapi mewah beraroma sandalwood',
      'Cokelat praline artisan buatan tangan',
      'Dompet kulit asli berkualitas tinggi'
    ],
    communicationTips: {
      topicsToSparkInterest: ['Rekomendasi kuliner terenak di kota', 'Rencana masa depan yang stabil', 'Musik, seni, dan kenyamanan hidup'],
      whatToAvoid: ['Memaksa mereka mengubah keputusan secara mendadak', 'Buru-buru dan tidak sabaran'],
      bestFirstDateConversation: '"Makanan atau tempat kencan apa yang paling bikin kamu merasa seperti pulang ke rumah?"'
    },
    soulmateCompatibility: {
      bestMatches: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
      challengingMatches: ['Leo', 'Aquarius'],
      twinFlameInsight: 'Cancer memberikan kedalaman rasa aman yang dicari Taurus, sedangkan Capricorn membangun masa depan yang kokoh.'
    }
  },

  Gemini: {
    sign: 'Gemini',
    symbol: '♊',
    element: 'Udara',
    quality: 'Dapat Berubah',
    rulingPlanet: 'Merkurius',
    dateRange: '21 Mei - 20 Jun',
    tagline: 'Pesonawan cerdas yang jatuh cinta lewat obrolan mendalam dan humor jenaka.',
    romanticPersonality: {
      overview: 'Gemini mencintai lewat otak dan rasa penasaran. Bagi mereka, ketertarikan seksual dan romantis berawal dari getaran intelektual yang memikat.',
      whenInLove: [
        'Mengirim pesan teks lucu, meme, dan artikel menarik sepanjang hari',
        'Bisa diajak mengobrol berjam-jam dari topik gosip hingga konspirasi galaksi',
        'Suka mengajak kencan ke tempat-tempat unik yang belum pernah didatangi',
        'Memperkenalkan pasangan ke lingkaran pertemanan yang luas'
      ],
      greenFlags: ['Komunikatif tiada henti', 'Selalu punya ide segar agar hubungan tak membosankan', 'Sangat fleksibel'],
      flirtingStyle: 'Bantahan jenaka (banter), lelucon cerdas berbobot, dan kedipan mata menggoda.',
      kissingVibe: 'Ceria, diselingi tawa kecil, cepat, dan penasaran mencoba berbagai ritme.'
    },
    datePreferences: {
      idealDates: [
        'Eksplorasi pasar buku antik atau galeri seni kontemporer',
        'Bar arcade dengan kompetisi game interaktif',
        'Workshop keramik / melukis sambil minum wine',
        'Nonton stand-up comedy live dilanjutkan ngopi larut malam'
      ],
      romanticHobbies: ['Podcast listening', 'Traveling keliling kota naik transportasi umum', 'Membaca buku dan berdiskusi', 'Karaoke lagu pop ceria'],
      atmosphere: 'Ramai, seru, merangsang rasa ingin tahu, dan penuh dinamika percakapan.'
    },
    culinaryLove: {
      favoriteDateFood: ['Tapas Spanyol beragam jenis piring kecil', 'Dimsum kukus aneka rasa', 'Sushi fusion modern', 'Tacos street style Meksiko'],
      romanticDrinks: ['Boba tea aneka rasa', 'Cocktail gin tonic dengan irisan timun', 'Cold brew coffee berbuih'],
      diningStyle: 'Makan piring kecil sharing yang bisa dicicipi berdua sambil terus mengobrol santai.'
    },
    loveLanguage: {
      primary: 'Words of Affirmation',
      secondary: 'Quality Time',
      howTheyShowLove: 'Memuji kecerdasanmu, mendengarkan celotehmu, dan mengirim pesan "aku kepikiran kamu waktu baca ini".',
      howToMakeThemFeelLoved: 'Pujilah ide-ide mereka, jadilah rekan debat yang cerdas, dan jangan pernah mengekang rasa ingin tahu mereka.'
    },
    idealGifts: [
      'Buku best-seller dengan catatan tulisan tangan di halaman depan',
      'Earphone nirkabel stylish untuk mendengarkan lagu bersama',
      'Board game dua orang yang mengasah otak',
      'Aksesoris gadget unik yang fungsional'
    ],
    communicationTips: {
      topicsToSparkInterest: ['Tren viral terbaru & teori di baliknya', 'Rekomendasi film plot-twist terbaik', 'Ide bisnis gila'],
      whatToAvoid: ['Monoton, pendiam berlebihan, atau membalas pesan hanya dengan satu kata'],
      bestFirstDateConversation: '"Kalau kamu bisa tahu rahasia terbesar siapa pun di dunia ini, rahasia siapa yang bakal kamu pilih?"'
    },
    soulmateCompatibility: {
      bestMatches: ['Libra', 'Aquarius', 'Aries', 'Leo'],
      challengingMatches: ['Virgo', 'Pisces'],
      twinFlameInsight: 'Libra memberikan keharmonisan estetika yang memukau Gemini, sementara Aquarius memahami kebebasan berpikirnya.'
    }
  },

  Cancer: {
    sign: 'Cancer',
    symbol: '♋',
    element: 'Air',
    quality: 'Kardinal',
    rulingPlanet: 'Bulan',
    dateRange: '21 Jun - 22 Jul',
    tagline: 'Pencinta batiniah yang membungkus pasangan dengan kehangatan dan ketulusan jiwa.',
    romanticPersonality: {
      overview: 'Dikuasai oleh Bulan, Cancer memiliki hati yang luar biasa lembut dan intuitif. Bagi Cancer, cinta adalah tempat berteduh teraman di dunia.',
      whenInLove: [
        'Memasak makanan kesukaanmu saat kamu sedang sedih atau sakit',
        'Mengingat setiap tanggal penting, momen pertama kali bertemu, dan lagu kenangan',
        'Menciptakan suasana rumah yang sangat nyaman dan hangat untuk berdua',
        'Sangat setia dan menganggap pasangan sebagai bagian keluarga inti'
      ],
      greenFlags: ['Sangat empatis dan tulus', 'Pendengar emosional nomor satu', 'Protektif dan penuh kasih sayang'],
      flirtingStyle: 'Senyum malu-malu manis, tatapan mata berbinar penuh kelembutan, dan perhatian kecil.',
      kissingVibe: 'Sangat emosional, lembut, penuh perasaan batin, dan menghanyutkan jiwa.'
    },
    datePreferences: {
      idealDates: [
        'Menyaksikan sunset di tepi pantai sambil duduk beralas selimut',
        'Malam bioskop mini di rumah dengan popcorn dan lilin vanila',
        'Kencan memasak sup hangat atau memanggang kue bersama',
        'Jalan-jalan santai di akuarium raksasa melihat ubur-ubur bercahaya'
      ],
      romanticHobbies: ['Baking kue kering', 'Menulis jurnal cinta / scrapbook foto berdua', 'Menata dekorasi kamar estetik', 'Stargazing malam'],
      atmosphere: 'Intim, redup, hangat, aman, dan jauh dari kebisingan orang banyak.'
    },
    culinaryLove: {
      favoriteDateFood: ['Sup krim jagung & roti panggang hangat', 'Pasta carbonara rumahan', 'Ramen kuah kaldu kental gurih', 'Kue bolu kayu manis hangat'],
      romanticDrinks: ['Teh chamomile madu hangat', 'Susu hangat berbusa kayu manis', 'Jus mangga manis segar'],
      diningStyle: 'Comfort food yang disajikan dengan kasih sayang dan kehangatan rumahan.'
    },
    loveLanguage: {
      primary: 'Acts of Service',
      secondary: 'Quality Time',
      howTheyShowLove: 'Merawat pasangan saat lelah, menyiapkan bekal cinta, dan memberikan pelukan paling menenangkan.',
      howToMakeThemFeelLoved: 'Berikan rasa aman emosional, hargai kepekaan hatinya, dan jangan pernah mengabaikan perasaannya.'
    },
    idealGifts: [
      'Bingkai foto polaroid kenangan kencan pertama',
      'Piyama tidur katun lembut bermotif manis',
      'Cangkir keramik buatan tangan dengan teh organik',
      'Surat cinta tulisan tangan yang menyentuh hati'
    ],
    communicationTips: {
      topicsToSparkInterest: ['Kenangan masa kecil yang berkesan', 'Impian tentang rumah impian bersama', 'Perasaan dan isi hati yang jujur'],
      whatToAvoid: ['Kritik yang kasar atau meremehkan perasaan sensitif mereka'],
      bestFirstDateConversation: '"Hal apa yang paling cepat bikin kamu ngerasa nyaman dan aman saat bersama seseorang?"'
    },
    soulmateCompatibility: {
      bestMatches: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
      challengingMatches: ['Aries', 'Libra'],
      twinFlameInsight: 'Pisces dan Scorpio memahami kedalaman samudra emosi Cancer tanpa perlu penjelasan berbelit-belit.'
    }
  },

  Leo: {
    sign: 'Leo',
    symbol: '♌',
    element: 'Api',
    quality: 'Tetap',
    rulingPlanet: 'Matahari',
    dateRange: '23 Jul - 22 Agu',
    tagline: 'Raja/Ratu romansa yang memperlakukan pasangannya bak harta paling berharga di dunia.',
    romanticPersonality: {
      overview: 'Dinaungi oleh Matahari, Leo mencintai dengan megah, hangat, dan murah hati. Mereka ingin pasangannya merasa seperti orang paling istimewa di muka bumi.',
      whenInLove: [
        'Membanggakan pasangan di depan semua orang dan di media sosial',
        'Memberikan kejutan kencan romantis yang mewah dan tak terlupakan',
        'Sangat setia, protektif, dan rela berkorban demi kebahagiaan pasangan',
        'Penuh afeksi fisik yang hangat dan pelukan erat seperti singa'
      ],
      greenFlags: ['Sangat dermawan', 'Membela pasangannya tanpa ragu', 'Memberikan cinta tanpa setengah-setengah'],
      flirtingStyle: 'Pujian langsung yang memikat, senyum mempesona, dan aura karisma magnetis.',
      kissingVibe: 'Megah, dramatis, penuh gairah yang membuncah, dan meninggalkan kesan mendalam.'
    },
    datePreferences: {
      idealDates: [
        'Dinner di restoran rooftop mewah saat golden hour sunset',
        'Menonton premiere film VIP dengan sofa recliner berdua',
        'Piknik glamor (glamping) di bawah langit berbintang',
        'Kencan berdandan elegan di teater musikal atau konser megah'
      ],
      romanticHobbies: ['Foto sesi kencan estetik', 'Wisata kuliner tempat-tempat viral berkelas', 'Karaoke lagu cinta dengan penuh penghayatan', 'Fashion styling'],
      atmosphere: 'Gemerlap, elegan, ceria, hangat, dan penuh perayaan cinta.'
    },
    culinaryLove: {
      favoriteDateFood: ['Salmon panggang saus lemon butter', 'Steak tomahawk premium', 'Dessert lava cake cokelat keemasan', 'Pizza artisan panggang kayu'],
      romanticDrinks: ['Champagne berkilau', 'Mocktail strawberry sunrise dengan hiasan bunga edible', 'Caramel macchiato manis'],
      diningStyle: 'Pengalaman bersantap yang cantik difoto, berkelas, dan penuh kehangatan interaksi.'
    },
    loveLanguage: {
      primary: 'Words of Affirmation',
      secondary: 'Receiving Gifts',
      howTheyShowLove: 'Membanjiri pasangan dengan hadiah indah, pujian manis, dan perlakuan bak pangeran/putri dongeng.',
      howToMakeThemFeelLoved: 'Pujilah ketulusan hatinya, apresiasi usahanya dalam merencanakan kencan, dan jadilah penggemar nomor satunya.'
    },
    idealGifts: [
      'Perhiasan emas atau perak dengan inisial nama',
      'Parfum niche dengan wangi amber & vanila mewah',
      'Buket bunga matahari besar yang mekar sempurna',
      'Kacamata hitam desainer stylish'
    ],
    communicationTips: {
      topicsToSparkInterest: ['Karya kreatif & pencapaian membanggakan', 'Hal-hal yang membuat mereka merasa bersemangat hidup', 'Rencana liburan impian'],
      whatToAvoid: ['Membanding-bandingkan mereka dengan orang lain atau bersikap dingin mengabaikan'],
      bestFirstDateConversation: '"Apa hal paling gila dan membanggakan yang pernah kamu lakuin demi cinta?"'
    },
    soulmateCompatibility: {
      bestMatches: ['Aries', 'Sagittarius', 'Libra', 'Gemini'],
      challengingMatches: ['Taurus', 'Scorpio'],
      twinFlameInsight: 'Aries membakar semangat Leo, sementara Libra memberikan kekaguman estetik dan keanggunan yang selaras.'
    }
  },

  Virgo: {
    sign: 'Virgo',
    symbol: '♍',
    element: 'Tanah',
    quality: 'Dapat Berubah',
    rulingPlanet: 'Merkurius',
    dateRange: '23 Agu - 22 Sep',
    tagline: 'Pencinta tulus yang membuktikan kasih melalui tindakan nyata dan perhatian detail sempurna.',
    romanticPersonality: {
      overview: 'Virgo mungkin tidak suka mengumbar gombalan murahan, tapi cinta mereka adalah yang paling nyata. Mereka mengingat caramu meminum kopi dan siap membantumu kapan pun dibutuhkan.',
      whenInLove: [
        'Membantu menyelesaikan masalahmu dan merapikan hal-hal yang membuatmu stres',
        'Memperhatikan perubahan suasana hatimu meski kamu bilang "aku nggak apa-apa"',
        'Merencanakan kencan dengan detail sempurna tanpa ada yang terlewat',
        'Menjadi tempat curhat paling logis, bijak, dan menenangkan'
      ],
      greenFlags: ['Sangat dapat dipercaya', 'Rela berkorban dalam tindakan nyata', 'Setia dan terus berusaha memperbaiki diri'],
      flirtingStyle: 'Tatapan pengamat yang cerdas, gestur membawakan barangmu, dan senyum malu yang tulus.',
      kissingVibe: 'Sangat rapi, lembut, penuh perhatian pada respons pasangan, dan semakin intens seiring waktu.'
    },
    datePreferences: {
      idealDates: [
        'Kencan sore di museum sains atau galeri arsitektur tenang',
        'Menemukan kafe tersembunyi (hidden gem) dengan kopi artisan berkualitas tinggi',
        'Merakit puzzle 1000 keping bersama sambil mendengarkan musik lo-fi',
        'Workshop kerajinan tangan kulit atau merajut berdua'
      ],
      romanticHobbies: ['Membaca dan bertukar buku', 'Menjelajahi toko barang antik yang rapi', 'Merawat kesehatan & jalan pagi santai', 'Bermain catur atau sudoku'],
      atmosphere: 'Tenang, rapi, higienis, berestetika minimalis, dan minim keributan.'
    },
    culinaryLove: {
      favoriteDateFood: ['Salad bowl organik dengan saus wijen sangrai', 'Sushi autentik segar berkualitas tinggi', 'Sop buntut bening rempah harum', 'Smoothie bowl buah naga'],
      romanticDrinks: ['Green tea matcha murni tanpa gula', 'Kopi pour over V60 single origin', 'Air lemon madu segar'],
      diningStyle: 'Makanan sehat, bersih, diolah dengan bahan organik berkualitas dan disajikan estetik.'
    },
    loveLanguage: {
      primary: 'Acts of Service',
      secondary: 'Quality Time',
      howTheyShowLove: 'Memperbaiki barangmu yang rusak, membawakan obat saat kamu flu, dan selalu ada di sampingmu saat kamu butuh sandaran.',
      howToMakeThemFeelLoved: 'Ucapkan terima kasih tulus atas bantuan kecil mereka, perhatikan detail kesukaan mereka, dan tepati janji tepat waktu.'
    },
    idealGifts: [
      'Buku agenda kulit minimalis dengan pulpen elegan',
      'Set aromaterapi lavender untuk tidur nyenyak',
      'Termos kopi stainless steel tahan panas berdesain elegan',
      'Alat pembuat kopi manual brewing'
    ],
    communicationTips: {
      topicsToSparkInterest: ['Buku atau film bermakna mendalam', 'Kiat hidup sehat dan produktivitas', 'Analisis karakter orang dan psikologi'],
      whatToAvoid: ['Keterlambatan tanpa kabar atau kencan yang tidak teratur dan jorok'],
      bestFirstDateConversation: '"Kira-kira kebiasaan kecil apa dari seseorang yang paling gampang bikin kamu respek dan jatuh hati?"'
    },
    soulmateCompatibility: {
      bestMatches: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
      challengingMatches: ['Gemini', 'Sagittarius'],
      twinFlameInsight: 'Taurus memberikan ketenangan sensual yang meredakan kecemasan Virgo, sementara Scorpio menawarkan ikatan batin yang tak tergoyahkan.'
    }
  },

  Libra: {
    sign: 'Libra',
    symbol: '♎',
    element: 'Udara',
    quality: 'Kardinal',
    rulingPlanet: 'Venus',
    dateRange: '23 Sep - 22 Okt',
    tagline: 'Pujangga estetik yang mendambakan keharmonisan, keadilan hati, dan kencan romantis sempurna.',
    romanticPersonality: {
      overview: 'Dinaungi oleh Venus, Libra dilahirkan untuk mencintai. Mereka adalah lambang keanggunan, rayuan manis berkelas, dan kemitraan hidup yang setara.',
      whenInLove: [
        'Selalu ingin menghabiskan waktu bersama dan melibatkanmu dalam setiap keputusan',
        'Berdandan dengan penampilan terbaik demi mempesona pasangan',
        'Sangat menghindari pertengkaran kasar dan selalu mencari jalan tengah yang damai',
        'Membuat playlist lagu cinta khusus yang mendeskripsikan perasaan mereka'
      ],
      greenFlags: ['Sangat adil dan mempertimbangkan perasaan pasangan', 'Penuh pesona manis', 'Ahli menciptakan suasana damai'],
      flirtingStyle: 'Pujian puitis, senyuman memikat berlesung pipi, dan gaya busana modis serasi.',
      kissingVibe: 'Sangat romantis seperti adegan film klasik Hollywood, lembut, dan penuh keindahan.'
    },
    datePreferences: {
      idealDates: [
        'Kencan sore di pameran seni instalasi foto-genik',
        'Makan malam romantis dengan lilin temaram dan musik biola',
        'Menikmati afternoon tea dengan kue-kue estetik di hotel butik',
        'Berburu pakaian vintage bersama di thrift market berkelas'
      ],
      romanticHobbies: ['Menghadiri pameran seni', 'Fotografi pasangan estetik', 'Menata dekorasi interior', 'Menikmati kuliner wine & dine'],
      atmosphere: 'Penuh keindahan visual, harum, selaras, dan memiliki pencahayaan lembut yang flattering.'
    },
    culinaryLove: {
      favoriteDateFood: ['Pasta seafood aglio olio dengan basil segar', 'Macaron aneka warna Prancis', 'Risotto saffron keemasan', 'Dessert tiramisu artisan'],
      romanticDrinks: ['Rose wine manis dingin', 'Cocktail Cosmopolitan dengan garnish jeruk', 'Iced peach blossom tea'],
      diningStyle: 'Piring yang disajikan indah (*food styling* sempurna) di tempat dengan musik latar yang merdu.'
    },
    loveLanguage: {
      primary: 'Words of Affirmation',
      secondary: 'Quality Time',
      howTheyShowLove: 'Memberikan pujian tulus setiap hari, selalu ingin menggandeng tanganmu, dan memperlakukanmu dengan santun.',
      howToMakeThemFeelLoved: 'Ajak mereka ke tempat kencan yang estetik, puji penampilan dan kebaikan hatinya, serta berikan kepastian cinta tanpa drama.'
    },
    idealGifts: [
      'Parfum beraroma bunga mawar atau peony yang lembut',
      'Karya seni cetak atau poster film klasik berbingkai indah',
      'Aksesoris kalung perak berdesain minimalis elegan',
      'Lilin aromaterapi berwadah keramik estetik'
    ],
    communicationTips: {
      topicsToSparkInterest: ['Estetika seni & fashion', 'Kisah romansa dalam film favorit', 'Filsafat hubungan yang sehat dan seimbang'],
      whatToAvoid: ['Kekasaran, bentakan, atau memaksa mereka memilih hal sulit di tempat umum'],
      bestFirstDateConversation: '"Menurutmu, kencan romantis yang sempurna itu suasananya harus seperti apa?"'
    },
    soulmateCompatibility: {
      bestMatches: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
      challengingMatches: ['Cancer', 'Capricorn'],
      twinFlameInsight: 'Gemini memikat pikiran Libra dengan percakapan cerdas, sementara Leo memberikan kepastian cinta yang membanggakan.'
    }
  },

  Scorpio: {
    sign: 'Scorpio',
    symbol: '♏',
    element: 'Air',
    quality: 'Tetap',
    rulingPlanet: 'Pluto & Mars',
    dateRange: '23 Okt - 21 Nov',
    tagline: 'Magnet cinta misterius yang memberikan kesetiaan tanpa syarat dan ikatan jiwa terdalam.',
    romanticPersonality: {
      overview: 'Scorpio tidak mengenal cinta setengah hati. Bagi mereka, cinta adalah ikatan batin yang sakral, intens, transformatif, dan abadi.',
      whenInLove: [
        'Membuka sisi terdalam diri dan rahasia yang tidak pernah diceritakan ke orang lain',
        'Kesetiaan mutlak—mereka akan membela pasangannya mati-matian dari siapa pun',
        'Tatapan mata telepati yang bisa membaca isi pikiran pasangan hanya dengan sekali pandang',
        'Menginginkan koneksi intim emosional dan fisik yang sangat menyatu'
      ],
      greenFlags: ['Kesetiaan tak tertandingi', 'Sangat protektif dan menjaga rahasia', 'Tulus tanpa kepalsuan'],
      flirtingStyle: 'Kontak mata intens tanpa berkedip, senyuman misterius, dan bisikan suara lembut.',
      kissingVibe: 'Sangat dalam, intens, menggoda, penuh gairah rahasia, dan tak terlupakan.'
    },
    datePreferences: {
      idealDates: [
        'Bicara dari hati ke hati larut malam di mobil sambil melihat pemandangan lampu kota (*city lights*)',
        'Makan malam di restoran tersembunyi yang remang-remang (*speakeasy bar*)',
        'Menyaksikan film misteri thriller psikologis di bioskop privat',
        'Kencan di pantai terpencil saat malam bulan purnama'
      ],
      romanticHobbies: ['Mendengarkan musik gelap berkarakter mendalam', 'Membaca buku psikologi & misteri', 'Stargazing malam', 'Menjelajahi tempat rahasia'],
      atmosphere: 'Privat, temaram, misterius, intim, dan bebas dari gangguan orang luar.'
    },
    culinaryLove: {
      favoriteDateFood: ['Dark chocolate mousse kaya rasa', 'Daging asap panggang saus barbeque pedas', 'Truffle pizza kaya rempah', 'Seafood panggang bumbu pedas manis'],
      romanticDrinks: ['Espresso pekat', 'Old Fashioned cocktail klasik', 'Teh earl grey hitam dengan madu'],
      diningStyle: 'Makan malam intim dengan meja sudut yang privat dan pencahayaan lilin remang-remang.'
    },
    loveLanguage: {
      primary: 'Physical Touch',
      secondary: 'Quality Time',
      howTheyShowLove: 'Menatap matamu saat berbicara, merengkuh erat pinggangmu, dan setia menjagamu dalam keadaan apa pun.',
      howToMakeThemFeelLoved: 'Jujurlah 100% tanpa menyembunyikan apa pun. Tunjukkan bahwa kamu memilih mereka di atas segalanya.'
    },
    idealGifts: [
      'Parfum bernuansa aroma kayu gelap, oud, atau black vanilla',
      'Gelang kulit hitam atau cincin perak berukir simbol misterius',
      'Buku jurnal dengan kunci gembok vintage',
      'Kotak cokelat hitam Belgia kualitas premium'
    ],
    communicationTips: {
      topicsToSparkInterest: ['Hal-hal yang paling kamu takuti dan harapkan dalam hidup', 'Misteri kehidupan & psikologi manusia', 'Arti kesetiaan sejati'],
      whatToAvoid: ['Bohong sekecil apa pun atau bersikap genit pada orang lain di depan mereka'],
      bestFirstDateConversation: '"Kapan terakhir kali kamu merasa benar-benar dimengerti oleh seseorang tanpa perlu bicara sepatah kata pun?"'
    },
    soulmateCompatibility: {
      bestMatches: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
      challengingMatches: ['Leo', 'Aquarius'],
      twinFlameInsight: 'Cancer dan Pisces mampu menyelami kedalaman samudra Scorpio, menyembuhkan rasa takut terluka dan menyatukan jiwa.'
    }
  },

  Sagittarius: {
    sign: 'Sagittarius',
    symbol: '♐',
    element: 'Api',
    quality: 'Dapat Berubah',
    rulingPlanet: 'Jupiter',
    dateRange: '22 Nov - 21 Des',
    tagline: 'Petualang berjiwa bebas yang mencari belahan jiwa untuk menertawakan dan menjelajahi dunia bersama.',
    romanticPersonality: {
      overview: 'Dinaungi oleh Jupiter—planet keberuntungan dan ekspansi—Sagittarius mencintai dengan ceria, optimis, dan jujur apa adanya. Mereka ingin pasangan yang juga menjadi sahabat petualang terbaiknya.',
      whenInLove: [
        'Mengajakmu menjelajahi tempat baru yang belum pernah kamu bayangkan',
        'Membuatmu tertawa terbahak-bahak bahkan di hari paling menyebalkan',
        'Sangat jujur mengungkapkan apa yang mereka sukai dari dirimu tanpa basa-basi',
        'Memberi inspirasi untuk terus bertumbuh dan mengejar impian besarmu'
      ],
      greenFlags: ['Tidak suka drama berbelit-belit', 'Optimis dan menyebarkan energi positif', 'Memberikan kebebasan yang sehat'],
      flirtingStyle: 'Candaan spontan, tawa lepas, sentuhan bahu yang akrab, dan ajakan petualangan.',
      kissingVibe: 'Spontan, menyenangkan, penuh tawa renyah, dan mengalir bebas tanpa beban.'
    },
    datePreferences: {
      idealDates: [
        'Road trip spontan ke pantai tersembunyi atau puncak pegunungan',
        'Festival kuliner luar ruangan sambil mencoba makanan asing unik',
        'Camping di alam terbuka menyalakan api unggun sambil memetik gitar',
        'Berburu wahana seru di taman hiburan ekstrem (*roller coaster date*)'
      ],
      romanticHobbies: ['Backpacking dan traveling', 'Outdoor camping & hiking', 'Menonton dokumenter alam dan budaya', 'Mencicipi kuliner eksotis'],
      atmosphere: 'Terbuka, berangin segar, luas, menyenangkan, dan dipenuhi tawa lepas.'
    },
    culinaryLove: {
      favoriteDateFood: ['Nasi campur khas daerah rempah kaya', 'Tacos pedas renyah Meksiko', 'Burger daging panggang tebal', 'Kebab daging panggang Timur Tengah'],
      romanticDrinks: ['Kelapa muda dingin segar di pinggir pantai', 'Bir dingin atau cider apel', 'Kopi tubruk rempah hangat'],
      diningStyle: 'Makan outdoor santai sambil menikmati udara terbuka dan obrolan penuh gelak tawa.'
    },
    loveLanguage: {
      primary: 'Quality Time',
      secondary: 'Physical Touch',
      howTheyShowLove: 'Membagikan pengalaman hidup paling berharga, mengajakmu ke tempat rahasianya, dan menjadi pelindung setiamu saat berpetualang.',
      howToMakeThemFeelLoved: 'Beri mereka ruang bernapas dan kebebasan berekspresi. Ikutlah tertawa dalam petualangan mereka dan jangan mengekang.'
    },
    idealGifts: [
      'Paspor cover kulit elegan atau tas ransel traveling stylish',
      'Kamera instan polaroid untuk mendokumentasikan perjalanan berdua',
      'Hammock gantung untuk bersantai di alam',
      'Buku panduan perjalanan petualangan dunia'
    ],
    communicationTips: {
      topicsToSparkInterest: ['Pengalaman konyol saat traveling', 'Pandangan filosofis tentang arti kebebasan', 'Rencana destinasi liburan impian'],
      whatToAvoid: ['Bersikap posesif, cemburu berlebihan, atau membatasi pertemanan mereka'],
      bestFirstDateConversation: '"Kalau sekarang kita bisa langsung kabur ke bandara dan naik pesawat pertama, kamu mau kita mendarat di mana?"'
    },
    soulmateCompatibility: {
      bestMatches: ['Aries', 'Leo', 'Libra', 'Aquarius'],
      challengingMatches: ['Virgo', 'Pisces'],
      twinFlameInsight: 'Aries dan Leo mengimbangi kobaran energi petualangan Sagittarius, sementara Libra memberikan kelembutan yang meluluhkan.'
    }
  },

  Capricorn: {
    sign: 'Capricorn',
    symbol: '♑',
    element: 'Tanah',
    quality: 'Kardinal',
    rulingPlanet: 'Saturnus',
    dateRange: '22 Des - 19 Jan',
    tagline: 'Pembangun komitmen solid yang membuktikan cinta melalui perlindungan dan masa depan yang terjamin.',
    romanticPersonality: {
      overview: 'Dikuasai oleh Saturnus, Capricorn memandang cinta dengan penuh kedewasaan dan rasa hormat. Mereka tidak tertarik pada cinta sesaat—mereka membangun kerajaan cinta yang kokoh untuk selamanya.',
      whenInLove: [
        'Memasukkan pasangan dalam rencana masa depan 5 hingga 10 tahun ke depan',
        'Memberikan dukungan nyata dalam karier, finansial, dan stabilitas hidupmu',
        'Sangat loyal dan menjaga reputasi serta kehormatan pasangan dengan gigih',
        'Menunjukkan sisi lembut, humor kering yang cerdas, dan kerentanan batin hanya padamu'
      ],
      greenFlags: ['Sangat bertanggung jawab', 'Kedewasaan emosional tinggi', 'Penyedia rasa aman masa depan'],
      flirtingStyle: 'Gestur sopan elegan, membukakan pintu, tatapan serius yang teduh, dan perhatian berbobot.',
      kissingVibe: 'Terencana dengan baik, mendalam, berwibawa, dan sarat akan komitmen kesetiaan.'
    },
    datePreferences: {
      idealDates: [
        'Makan malam di restoran klasik bersejarah dengan reservasi khusus',
        'Kencan santai di lounge jazz tenang dengan pencahayaan hangat',
        'Jalan sore di museum sejarah atau pameran arsitektur warisan kota',
        'Diskusi santai tentang impian masa depan di perpustakaan atau kedai teh tenang'
      ],
      romanticHobbies: ['Merencanakan investasi & dekorasi rumah', 'Koleksi jam tangan atau barang klasik', 'Mendengarkan musik jazz klasik', 'Menonton biografi inspiratif'],
      atmosphere: 'Tenang, eksklusif, matang, terencana rapi, dan bernuansa klasik berkelas.'
    },
    culinaryLove: {
      favoriteDateFood: ['Steak sirloin panggang dengan saus jamur klasik', 'Sup iga sapi hangat gurih rempah', 'Pasta ravioli isi keju ricotta', 'Crème brûlée vanila lembut'],
      romanticDrinks: ['Kopi hitam single origin berkualitas', 'Whiskey on the rocks / Negroni klasik', 'Teh earl grey beraroma bergamot'],
      diningStyle: 'Restoran tenang dengan layanan profesional, di mana kalian bisa mengobrol santai tanpa berisik.'
    },
    loveLanguage: {
      primary: 'Acts of Service',
      secondary: 'Words of Affirmation',
      howTheyShowLove: 'Membantumu mencapai kesuksesan karier, memastikan kehidupanmu serba aman, dan selalu menepati janji yang diucapkan.',
      howToMakeThemFeelLoved: 'Hargai kerja keras dan ambisinya. Jadilah tempat beristirahat yang menenangkan saat mereka lelah memikul tanggung jawab.'
    },
    idealGifts: [
      'Jam tangan klasik berdesain mewah minimalis',
      'Cardholder atau dompet kulit bermutu tinggi',
      'Pulpen berukir nama khusus untuk menandatangani dokumen penting',
      'Jaket blazer atau coat berkualitas hangat'
    ],
    communicationTips: {
      topicsToSparkInterest: ['Rencana jangka panjang & prinsip hidup', 'Pengalaman membangun karier atau bisnis', 'Hal-hal yang membuat bangga keluarga'],
      whatToAvoid: ['Sikap tidak dewasa, bermain-main dengan janji, atau menghambur-hamburkan waktu'],
      bestFirstDateConversation: '"Menurutmu, apa fondasi paling penting agar dua orang bisa sukses dan bahagia bersama sampai tua?"'
    },
    soulmateCompatibility: {
      bestMatches: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      challengingMatches: ['Aries', 'Libra'],
      twinFlameInsight: 'Taurus dan Virgo memberikan kestabilan tanah yang harmonis, sementara Scorpio membawa kedalaman loyalitas yang tak terbantahkan.'
    }
  },

  Aquarius: {
    sign: 'Aquarius',
    symbol: '♒',
    element: 'Udara',
    quality: 'Tetap',
    rulingPlanet: 'Uranus & Saturnus',
    dateRange: '20 Jan - 18 Feb',
    tagline: 'Jiwa visioner orisinal yang mencintai dengan menghargai keunikan jati diri dan koneksi persahabatan sejati.',
    romanticPersonality: {
      overview: 'Dinaungi oleh Uranus, Aquarius memandang cinta sebagai ikatan dua jiwa merdeka yang memilih bersatu tanpa harus saling mengubah kepribadian masing-masing.',
      whenInLove: [
        'Menjadi sahabat terbaikmu yang selalu tertarik pada cara pandang unikmu',
        'Memperkenalkanmu pada ide-ide baru, musik eksperimental, dan cara melihat dunia',
        'Sangat menghormati ruang pribadimu dan tidak pernah bersikap posesif mengekang',
        'Membela pasangan dengan setia saat orang lain tidak memahami keanehannya'
      ],
      greenFlags: ['Tidak menghakimi masa lalu pasangan', 'Sangat setia pada prinsip keadilan', 'Jujur dan orisinal tanpa drama'],
      flirtingStyle: 'Topik obrolan tak terduga, tatapan penasaran yang cerdas, dan lelucon absurd yang bikin tertawa.',
      kissingVibe: 'Unik, tidak terduga, menyenangkan, elektrik, dan membebaskan.'
    },
    datePreferences: {
      idealDates: [
        'Kunjungan ke planetarium atau observatorium melihat bintang lewat teleskop',
        'Workshop sains interaktif atau pameran seni digital imersif',
        'Nongkrong di kafe indie komunitas dengan live music akustik',
        'Jalan malam menjelajahi sudut kota tersembunyi yang jarang diketahui orang'
      ],
      romanticHobbies: ['Menonton film fiksi ilmiah (Sci-Fi)', 'Berdiskusi tentang teknologi masa depan & kemanusiaan', 'Koleksi piringan hitam unik', 'Menjadi relawan kegiatan sosial'],
      atmosphere: 'Kreatif, terbuka, santai tanpa aturan kaku, dan bebas dari pretensi.'
    },
    culinaryLove: {
      favoriteDateFood: ['Makanan fusion eksperimental unik', 'Ramen vegan jamur truffle', 'Burger nabati plant-based gurih', 'Tahu cabai garam krispi'],
      romanticDrinks: ['Kombucha fermentasi buah berry', 'Matcha espresso fusion dingin', 'Sparkling mineral water dengan perasan jeruk nipis'],
      diningStyle: 'Tempat makan unik dengan konsep arsitektur daur ulang atau kafe seni bernuansa futuristik.'
    },
    loveLanguage: {
      primary: 'Quality Time',
      secondary: 'Acts of Service',
      howTheyShowLove: 'Mendengarkan teorimu berjam-jam, membantumu mengerjakan proyek impian, dan mendukung kebebasanmu mengejar hobi.',
      howToMakeThemFeelLoved: 'Biarkan mereka menjadi diri sendiri seutuhnya. Jangan pernah mencoba mengurung atau mengontrol mereka dengan aturan kaku.'
    },
    idealGifts: [
      'Gadget atau aksesori teknologi pintar terbaru',
      'Buku ensiklopedia astronomi atau buku filsafat futuristik',
      'Pakaian berdesain grafis unik dari desainer indie',
      'Tiket acara festival teknologi atau seni digital'
    ],
    communicationTips: {
      topicsToSparkInterest: ['Masa depan teknologi & luar angkasa', 'Pandangan sosial kemanusiaan', 'Keanehan dan hobi unik masing-masing'],
      whatToAvoid: ['Gosip picik tanpa isi, drama emosional manipulatif, atau sikap kaku kolot'],
      bestFirstDateConversation: '"Menurutmu, apa hal paling aneh tapi nyata yang pernah terjadi dalam hidupmu?"'
    },
    soulmateCompatibility: {
      bestMatches: ['Gemini', 'Libra', 'Sagittarius', 'Aries'],
      challengingMatches: ['Taurus', 'Scorpio'],
      twinFlameInsight: 'Gemini dan Libra mengimbangi kecerdasan komunikasi Aquarius, sementara Sagittarius memicu api petualangan ide-ide besarnya.'
    }
  },

  Pisces: {
    sign: 'Pisces',
    symbol: '♓',
    element: 'Air',
    quality: 'Dapat Berubah',
    rulingPlanet: 'Neptunus & Jupiter',
    dateRange: '19 Feb - 20 Mar',
    tagline: 'Penyair cinta bermata teduh yang mencintai dengan kelembutan magis, empati batin, dan kasih sayang tanpa syarat.',
    romanticPersonality: {
      overview: 'Sebagai tanda terakhir zodiak, Pisces membawa seluruh kearifan emosional semesta. Bagi Pisces, cinta adalah pengalaman spiritual—seperti dongeng indah di mana dua jiwa akhirnya saling menemukan.',
      whenInLove: [
        'Menciptakan momen-momen manis yang terasa seperti di dalam film dongeng romantis',
        'Sangat peka dan bisa merasakan emosimu bahkan saat kamu berada bermil-mil jauhnya',
        'Mendedikasikan lagu, puisi, atau karya seni khusus terinspirasi dari matamu',
        'Memaafkan dengan tulus dan mencintai dengan kelembutan yang menyembuhkan luka batin'
      ],
      greenFlags: ['Empati tanpa batas', 'Lembut dan tidak pernah berniat menyakiti', 'Paling romantis dan puitis'],
      flirtingStyle: 'Tatapan mata teduh berbinar, senyum manis pemalu, dan kata-kata puitis yang menyentuh hati.',
      kissingVibe: 'Sangat lembut, puitis, seperti tersesat dalam mimpi indah yang menghanyutkan jiwa.'
    },
    datePreferences: {
      idealDates: [
        'Menyaksikan gemerlap bintang dan lampu kota di bukit sepi beralas selimut',
        'Kencan di akuarium raksasa melihat ikan berenang dalam cahaya biru temaram',
        'Piknik sore di tepi danau atau pantai saat matahari terbenam',
        'Mendengarkan konser musik akustik melankolis sambil bergandengan tangan'
      ],
      romanticHobbies: ['Melukis atau menggambar sketsa', 'Menulis puisi & lirik lagu', 'Mendengarkan musik dreamy pop / lofi', 'Mengunjungi pantai & danau'],
      atmosphere: 'Puitis, magis, remang-remang, beraroma laut atau melati, dan penuh kelembutan.'
    },
    culinaryLove: {
      favoriteDateFood: ['Salmon panggang saus madu lemon', 'Pasta seafood creamy', 'Dessert es krim vanilla berry', 'Sup hangat lembut dengan roti brioche'],
      romanticDrinks: ['Teh melati hangat berbusa madu', 'Mocktail lavender berry berbuih', 'Hot chocolate dengan marshmallow lembut'],
      diningStyle: 'Makan malam santai di tempat tepi air atau kafe estetik dengan musik lembut yang menenangkan jiwa.'
    },
    loveLanguage: {
      primary: 'Quality Time',
      secondary: 'Physical Touch',
      howTheyShowLove: 'Menyelipkan surat cinta manis, memelukmu saat kamu sedih, dan selalu mendoakan kebaikanmu dalam diam.',
      howToMakeThemFeelLoved: 'Dengarkan impian dan imajinasinya dengan serius. Peluk mereka erat dan berikan kepastian bahwa mereka dicintai apa adanya.'
    },
    idealGifts: [
      'Kotak musik vintage dengan melodi klasik indah',
      'Buku puisi cinta atau buku sketsa berbahan kertas daur ulang',
      'Parfum beraroma lembut sea salt atau aquatic floral',
      'Lampu tidur proyektor bintang untuk kamarnya'
    ],
    communicationTips: {
      topicsToSparkInterest: ['Lagu-lagu yang bikin terharu', 'Mimpi dan firasat aneh di malam hari', 'Arti cinta sejati tanpa syarat'],
      whatToAvoid: ['Sikap sinis yang meremehkan hal romantis atau kata-kata sarkasme yang menusuk hati'],
      bestFirstDateConversation: '"Lagu apa yang paling menggambarkan perasaan hatimu saat kamu benar-benar jatuh cinta?"'
    },
    soulmateCompatibility: {
      bestMatches: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
      challengingMatches: ['Gemini', 'Sagittarius'],
      twinFlameInsight: 'Cancer dan Scorpio menyambut kedalaman emosi Pisces dengan perlindungan batin, sementara Taurus menjadi jangkar yang menenangkan.'
    }
  }
};
