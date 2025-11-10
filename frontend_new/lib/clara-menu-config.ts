// Clara Interactive Roleplay Menu Configuration
// Complete menu structure with translations for en, ko, ja, id

export type Language = 'en' | 'ko' | 'ja' | 'id';

export interface Translation {
  en: string;
  ko: string;
  ja: string;
  id: string;
}

export interface Role {
  id: string;
  translations: Translation;
}

export interface Scenario {
  id: string;
  translations: Translation;
  roles: Role[];
}

export interface Category {
  id: string;
  icon: string;
  translations: Translation;
  scenarios: Scenario[];
}

export interface Culture {
  id: string;
  icon: string;
  translations: Translation;
}

// Culture Selection (Step 1)
export const CULTURES: Culture[] = [
  {
    id: 'ko',
    icon: '🇰🇷',
    translations: {
      en: 'Korean Culture',
      ko: '한국 문화',
      ja: '韓国文化',
      id: 'Budaya Korea',
    },
  },
  {
    id: 'id',
    icon: '🇮🇩',
    translations: {
      en: 'Indonesian Culture',
      ko: '인도네시아 문화',
      ja: 'インドネシア文化',
      id: 'Budaya Indonesia',
    },
  },
  {
    id: 'ja',
    icon: '🇯🇵',
    translations: {
      en: 'Japanese Culture',
      ko: '일본 문화',
      ja: '日本文化',
      id: 'Budaya Jepang',
    },
  },
  {
    id: 'en',
    icon: '🌎',
    translations: {
      en: 'Western Culture',
      ko: '서양 문화',
      ja: '西洋文化',
      id: 'Budaya Barat',
    },
  },
];

// Menu Structure
export const CATEGORIES: Category[] = [
  // 🏢 WORKPLACE
  {
    id: 'workplace',
    icon: '🏢',
    translations: {
      en: 'Workplace',
      ko: '직장',
      ja: '職場',
      id: 'Tempat Kerja',
    },
    scenarios: [
      {
        id: 'firstDay',
        translations: {
          en: 'First Day Introduction with Age/Title Hierarchy',
          ko: '첫날 나이/직급 계층 구조 소개',
          ja: '初日の年齢・役職階層の紹介',
          id: 'Perkenalan Hari Pertama dengan Hierarki Usia/Jabatan',
        },
        roles: [
          {
            id: 'manager',
            translations: {
              en: 'Manager',
              ko: '매니저',
              ja: 'マネージャー',
              id: 'Manajer',
            },
          },
          {
            id: 'coworker',
            translations: {
              en: 'Coworker',
              ko: '동료',
              ja: '同僚',
              id: 'Rekan Kerja',
            },
          },
          {
            id: 'intern',
            translations: {
              en: 'Intern',
              ko: '인턴',
              ja: 'インターン',
              id: 'Magang',
            },
          },
        ],
      },
      {
        id: 'companyDinner',
        translations: {
          en: 'Company Dinner (Hoesik) with Drinking Etiquette',
          ko: '회식과 음주 에티켓',
          ja: '会社の飲み会のマナー',
          id: 'Makan Malam Perusahaan dengan Etika Minum',
        },
        roles: [
          {
            id: 'senior',
            translations: {
              en: 'Senior Colleague',
              ko: '선배',
              ja: '先輩',
              id: 'Kolega Senior',
            },
          },
          {
            id: 'manager',
            translations: {
              en: 'Manager',
              ko: '매니저',
              ja: 'マネージャー',
              id: 'Manajer',
            },
          },
          {
            id: 'teamLead',
            translations: {
              en: 'Team Lead',
              ko: '팀장',
              ja: 'チームリーダー',
              id: 'Kepala Tim',
            },
          },
        ],
      },
      {
        id: 'askingHelp',
        translations: {
          en: 'Asking Senior (Sunbae) for Help',
          ko: '선배에게 도움 요청하기',
          ja: '先輩に助けを求める',
          id: 'Meminta Bantuan Kepada Senior',
        },
        roles: [
          {
            id: 'senior',
            translations: {
              en: 'Senior Colleague',
              ko: '선배',
              ja: '先輩',
              id: 'Kolega Senior',
            },
          },
          {
            id: 'mentor',
            translations: {
              en: 'Mentor',
              ko: '멘토',
              ja: 'メンター',
              id: 'Mentor',
            },
          },
        ],
      },
      {
        id: 'performanceReview',
        translations: {
          en: 'Performance Review with Manager',
          ko: '매니저와의 성과 평가',
          ja: 'マネージャーとの業績評価',
          id: 'Tinjauan Kinerja dengan Manajer',
        },
        roles: [
          {
            id: 'manager',
            translations: {
              en: 'Manager',
              ko: '매니저',
              ja: 'マネージャー',
              id: 'Manajer',
            },
          },
          {
            id: 'director',
            translations: {
              en: 'Director',
              ko: '이사',
              ja: 'ディレクター',
              id: 'Direktur',
            },
          },
        ],
      },
    ],
  },

  // 💬 DAILY LIFE
  {
    id: 'dailyLife',
    icon: '💬',
    translations: {
      en: 'Daily Life',
      ko: '일상생활',
      ja: '日常生活',
      id: 'Kehidupan Sehari-hari',
    },
    scenarios: [
      {
        id: 'neighborGreeting',
        translations: {
          en: 'Greeting Neighbors with Proper Formality',
          ko: '적절한 격식으로 이웃에게 인사하기',
          ja: '適切な形式で隣人に挨拶する',
          id: 'Menyapa Tetangga dengan Formalitas yang Tepat',
        },
        roles: [
          {
            id: 'olderNeighbor',
            translations: {
              en: 'Older Neighbor',
              ko: '연장자 이웃',
              ja: '年上の隣人',
              id: 'Tetangga yang Lebih Tua',
            },
          },
          {
            id: 'sameAgeNeighbor',
            translations: {
              en: 'Same Age Neighbor',
              ko: '또래 이웃',
              ja: '同年代の隣人',
              id: 'Tetangga Sebaya',
            },
          },
        ],
      },
      {
        id: 'publicTransport',
        translations: {
          en: 'Using Public Transport (Subway/Bus)',
          ko: '대중교통(지하철/버스) 이용하기',
          ja: '公共交通機関の利用（地下鉄・バス）',
          id: 'Menggunakan Transportasi Umum (Subway/Bus)',
        },
        roles: [
          {
            id: 'elderlyPerson',
            translations: {
              en: 'Elderly Person',
              ko: '어르신',
              ja: '高齢者',
              id: 'Orang Tua',
            },
          },
          {
            id: 'stranger',
            translations: {
              en: 'Stranger',
              ko: '낯선 사람',
              ja: '見知らぬ人',
              id: 'Orang Asing',
            },
          },
        ],
      },
      {
        id: 'smallTalk',
        translations: {
          en: 'Small Talk About Weather & Food',
          ko: '날씨와 음식에 대한 스몰토크',
          ja: '天気と食べ物についての雑談',
          id: 'Obrolan Ringan tentang Cuaca & Makanan',
        },
        roles: [
          {
            id: 'acquaintance',
            translations: {
              en: 'Acquaintance',
              ko: '지인',
              ja: '知人',
              id: 'Kenalan',
            },
          },
          {
            id: 'newFriend',
            translations: {
              en: 'New Friend',
              ko: '새 친구',
              ja: '新しい友達',
              id: 'Teman Baru',
            },
          },
        ],
      },
    ],
  },

  // 🙇‍♀️ APOLOGY & CONFLICT
  {
    id: 'apologyConflict',
    icon: '🙇‍♀️',
    translations: {
      en: 'Apology & Conflict',
      ko: '사과 및 갈등',
      ja: '謝罪と対立',
      id: 'Permintaan Maaf & Konflik',
    },
    scenarios: [
      {
        id: 'lateMeeting',
        translations: {
          en: 'Apologizing for Being Late to Meeting',
          ko: '회의 늦은 것에 대해 사과하기',
          ja: '会議に遅刻したことを謝る',
          id: 'Meminta Maaf Karena Terlambat Rapat',
        },
        roles: [
          {
            id: 'manager',
            translations: {
              en: 'Manager',
              ko: '매니저',
              ja: 'マネージャー',
              id: 'Manajer',
            },
          },
          {
            id: 'client',
            translations: {
              en: 'Client',
              ko: '클라이언트',
              ja: 'クライアント',
              id: 'Klien',
            },
          },
        ],
      },
      {
        id: 'workMistake',
        translations: {
          en: 'Addressing a Work Mistake',
          ko: '업무 실수 대처하기',
          ja: '仕事のミスへの対処',
          id: 'Mengatasi Kesalahan Kerja',
        },
        roles: [
          {
            id: 'supervisor',
            translations: {
              en: 'Supervisor',
              ko: '상사',
              ja: '上司',
              id: 'Supervisor',
            },
          },
          {
            id: 'teamLead',
            translations: {
              en: 'Team Lead',
              ko: '팀장',
              ja: 'チームリーダー',
              id: 'Kepala Tim',
            },
          },
        ],
      },
      {
        id: 'disagreement',
        translations: {
          en: 'Polite Disagreement with Senior',
          ko: '선배와의 정중한 의견 차이',
          ja: '先輩との丁寧な意見の相違',
          id: 'Ketidaksepakatan Sopan dengan Senior',
        },
        roles: [
          {
            id: 'senior',
            translations: {
              en: 'Senior Colleague',
              ko: '선배',
              ja: '先輩',
              id: 'Kolega Senior',
            },
          },
          {
            id: 'manager',
            translations: {
              en: 'Manager',
              ko: '매니저',
              ja: 'マネージャー',
              id: 'Manajer',
            },
          },
        ],
      },
    ],
  },

  // 🎉 SOCIAL SITUATIONS
  {
    id: 'socialSituations',
    icon: '🎉',
    translations: {
      en: 'Social Situations',
      ko: '사교 상황',
      ja: '社交的な状況',
      id: 'Situasi Sosial',
    },
    scenarios: [
      {
        id: 'giftGiving',
        translations: {
          en: 'Gift Giving Etiquette',
          ko: '선물 주고받기 에티켓',
          ja: 'ギフトを贈る際のエチケット',
          id: 'Etika Memberi Hadiah',
        },
        roles: [
          {
            id: 'host',
            translations: {
              en: 'Host',
              ko: '주인',
              ja: 'ホスト',
              id: 'Tuan Rumah',
            },
          },
          {
            id: 'elder',
            translations: {
              en: 'Elder',
              ko: '어르신',
              ja: '年配者',
              id: 'Orang Tua',
            },
          },
        ],
      },
      {
        id: 'partyInvitation',
        translations: {
          en: 'Accepting/Declining Party Invitation',
          ko: '파티 초대 수락/거절하기',
          ja: 'パーティーの招待を受ける・断る',
          id: 'Menerima/Menolak Undangan Pesta',
        },
        roles: [
          {
            id: 'friend',
            translations: {
              en: 'Friend',
              ko: '친구',
              ja: '友達',
              id: 'Teman',
            },
          },
          {
            id: 'colleague',
            translations: {
              en: 'Colleague',
              ko: '동료',
              ja: '同僚',
              id: 'Kolega',
            },
          },
        ],
      },
      {
        id: 'compliments',
        translations: {
          en: 'Receiving & Giving Compliments',
          ko: '칭찬 받고 주기',
          ja: '褒め言葉を受ける・与える',
          id: 'Menerima & Memberi Pujian',
        },
        roles: [
          {
            id: 'friend',
            translations: {
              en: 'Friend',
              ko: '친구',
              ja: '友達',
              id: 'Teman',
            },
          },
          {
            id: 'acquaintance',
            translations: {
              en: 'Acquaintance',
              ko: '지인',
              ja: '知人',
              id: 'Kenalan',
            },
          },
        ],
      },
    ],
  },

  // 🤝 REQUESTS & NEGOTIATION
  {
    id: 'requestsNegotiation',
    icon: '🤝',
    translations: {
      en: 'Requests & Negotiation',
      ko: '요청 및 협상',
      ja: '依頼と交渉',
      id: 'Permintaan & Negosiasi',
    },
    scenarios: [
      {
        id: 'askingFavor',
        translations: {
          en: 'Asking for a Favor Politely',
          ko: '정중하게 부탁하기',
          ja: '丁寧にお願いする',
          id: 'Meminta Bantuan dengan Sopan',
        },
        roles: [
          {
            id: 'friend',
            translations: {
              en: 'Friend',
              ko: '친구',
              ja: '友達',
              id: 'Teman',
            },
          },
          {
            id: 'colleague',
            translations: {
              en: 'Colleague',
              ko: '동료',
              ja: '同僚',
              id: 'Kolega',
            },
          },
        ],
      },
      {
        id: 'negotiatingSalary',
        translations: {
          en: 'Negotiating Salary or Benefits',
          ko: '급여 또는 혜택 협상하기',
          ja: '給与や福利厚生の交渉',
          id: 'Negosiasi Gaji atau Tunjangan',
        },
        roles: [
          {
            id: 'hr',
            translations: {
              en: 'HR Manager',
              ko: '인사 매니저',
              ja: '人事マネージャー',
              id: 'Manajer HR',
            },
          },
          {
            id: 'director',
            translations: {
              en: 'Director',
              ko: '이사',
              ja: 'ディレクター',
              id: 'Direktur',
            },
          },
        ],
      },
      {
        id: 'decliningRequest',
        translations: {
          en: 'Declining a Request Gracefully',
          ko: '우아하게 요청 거절하기',
          ja: '優雅に依頼を断る',
          id: 'Menolak Permintaan dengan Anggun',
        },
        roles: [
          {
            id: 'colleague',
            translations: {
              en: 'Colleague',
              ko: '동료',
              ja: '同僚',
              id: 'Kolega',
            },
          },
          {
            id: 'manager',
            translations: {
              en: 'Manager',
              ko: '매니저',
              ja: 'マネージャー',
              id: 'Manajer',
            },
          },
        ],
      },
    ],
  },

  // 🏪 SERVICE & PUBLIC PLACES
  {
    id: 'servicePublic',
    icon: '🏪',
    translations: {
      en: 'Service & Public Places',
      ko: '서비스 및 공공장소',
      ja: 'サービスと公共の場',
      id: 'Layanan & Tempat Umum',
    },
    scenarios: [
      {
        id: 'restaurant',
        translations: {
          en: 'Ordering at Restaurant',
          ko: '식당에서 주문하기',
          ja: 'レストランでの注文',
          id: 'Memesan di Restoran',
        },
        roles: [
          {
            id: 'waiter',
            translations: {
              en: 'Waiter',
              ko: '웨이터',
              ja: 'ウェイター',
              id: 'Pelayan',
            },
          },
          {
            id: 'chef',
            translations: {
              en: 'Chef',
              ko: '셰프',
              ja: 'シェフ',
              id: 'Koki',
            },
          },
        ],
      },
      {
        id: 'shopping',
        translations: {
          en: 'Shopping & Bargaining',
          ko: '쇼핑 및 흥정하기',
          ja: '買い物と値引き交渉',
          id: 'Belanja & Tawar-Menawar',
        },
        roles: [
          {
            id: 'shopkeeper',
            translations: {
              en: 'Shopkeeper',
              ko: '가게 주인',
              ja: '店主',
              id: 'Pemilik Toko',
            },
          },
          {
            id: 'salesPerson',
            translations: {
              en: 'Sales Person',
              ko: '판매원',
              ja: '販売員',
              id: 'Penjual',
            },
          },
        ],
      },
      {
        id: 'bankOffice',
        translations: {
          en: 'Banking or Government Office',
          ko: '은행 또는 관공서',
          ja: '銀行または政府機関',
          id: 'Bank atau Kantor Pemerintah',
        },
        roles: [
          {
            id: 'officer',
            translations: {
              en: 'Officer',
              ko: '직원',
              ja: '職員',
              id: 'Petugas',
            },
          },
          {
            id: 'teller',
            translations: {
              en: 'Bank Teller',
              ko: '은행 직원',
              ja: '銀行員',
              id: 'Teller Bank',
            },
          },
        ],
      },
    ],
  },
];

// Helper function to get translated text
export function getTranslation(
  translations: Translation,
  language: Language
): string {
  return translations[language];
}

// Helper function to find culture by id
export function getCultureById(id: string): Culture | undefined {
  return CULTURES.find((culture) => culture.id === id);
}

// Helper function to find category by id
export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.id === id);
}

// Helper function to find scenario by category and scenario id
export function getScenarioById(
  categoryId: string,
  scenarioId: string
): Scenario | undefined {
  const category = getCategoryById(categoryId);
  if (!category) return undefined;
  return category.scenarios.find((sc) => sc.id === scenarioId);
}

// Helper function to find role by category, scenario, and role id
export function getRoleById(
  categoryId: string,
  scenarioId: string,
  roleId: string
): Role | undefined {
  const scenario = getScenarioById(categoryId, scenarioId);
  if (!scenario) return undefined;
  return scenario.roles.find((r) => r.id === roleId);
}
