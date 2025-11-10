// Translation utilities for Clara's interactive roleplay system

import { Language, Translation } from './clara-menu-config';

// UI Text Translations
export const UI_TRANSLATIONS = {
  // Step 1 - Culture Selection (NEW)
  chooseCulturePrompt: {
    en: 'Which culture would you like to practice?',
    ko: '어떤 문화를 연습하고 싶으세요?',
    ja: 'どの文化を練習したいですか？',
    id: 'Budaya mana yang ingin Anda praktikkan?',
  },

  // Step 2 - Category Selection (was Step 1)
  chooseCategoryPrompt: {
    en: 'Choose one to begin — just click or tap the button!',
    ko: '시작하려면 버튼을 클릭하거나 탭하세요!',
    ja: '始めるにはボタンをクリックまたはタップしてください！',
    id: 'Pilih salah satu untuk memulai — cukup klik atau tap tombol!',
  },

  // Step 3 - Scenario Selection (was Step 2)
  chooseScenarioPrompt: {
    en: 'Nice choice! Pick a scenario to explore.',
    ko: '좋은 선택이에요! 탐색할 시나리오를 선택하세요.',
    ja: '良い選択です！探索するシナリオを選んでください。',
    id: 'Pilihan bagus! Pilih skenario untuk dijelajahi.',
  },

  // Step 4 - Role Selection (was Step 3)
  chooseRolePrompt: {
    en: 'Who do you want to role-play with?',
    ko: '누구와 역할극을 하고 싶으세요?',
    ja: '誰とロールプレイをしたいですか？',
    id: 'Dengan siapa Anda ingin bermain peran?',
  },

  // Step 4 - Scene Instruction
  yourTurn: {
    en: '(Your turn! Type your response.)',
    ko: '(당신 차례입니다! 응답을 입력하세요.)',
    ja: '(あなたの番です！返事を入力してください。)',
    id: '(Giliran Anda! Ketik respons Anda.)',
  },

  // Navigation Buttons
  continueScene: {
    en: '▶️ Continue Scene',
    ko: '▶️ 계속하기',
    ja: '▶️ シーンを続ける',
    id: '▶️ Lanjutkan Adegan',
  },

  tryAgain: {
    en: '🔄 Try Again',
    ko: '🔄 다시 시도',
    ja: '🔄 もう一度試す',
    id: '🔄 Coba Lagi',
  },

  backToMenu: {
    en: '🏠 Back to Menu',
    ko: '🏠 메뉴로 돌아가기',
    ja: '🏠 メニューに戻る',
    id: '🏠 Kembali ke Menu',
  },

  // Selection Messages
  youSelected: {
    en: 'You selected:',
    ko: '선택했습니다:',
    ja: '選択しました:',
    id: 'Anda memilih:',
  },

  // Chat Input Placeholders
  typeYourResponse: {
    en: 'Type your response...',
    ko: '응답을 입력하세요...',
    ja: '返事を入力してください...',
    id: 'Ketik respons Anda...',
  },

  selectFromMenu: {
    en: 'Select from menu above...',
    ko: '위 메뉴에서 선택하세요...',
    ja: '上のメニューから選択してください...',
    id: 'Pilih dari menu di atas...',
  },

  // Welcome Messages
  welcomeMessage: {
    en: 'Welcome! Let\'s practice real-world cultural communication through interactive roleplay.',
    ko: '환영합니다! 대화형 역할극을 통해 실제 문화 소통을 연습해 봅시다.',
    ja: 'ようこそ！インタラクティブなロールプレイを通じて、実際の文化的コミュニケーションを練習しましょう。',
    id: 'Selamat datang! Mari kita praktikkan komunikasi budaya dunia nyata melalui roleplay interaktif.',
  },
};

// Get translation helper function
export function getUIText(key: keyof typeof UI_TRANSLATIONS, language: Language): string {
  return UI_TRANSLATIONS[key][language];
}

// Get translation from Translation object
export function getTranslation(translations: Translation, language: Language): string {
  return translations[language];
}

// Format selection message
export function formatSelectionMessage(
  selectionText: string,
  language: Language
): string {
  const prefix = UI_TRANSLATIONS.youSelected[language];
  return `${prefix} ${selectionText}`;
}

// Get placeholder text based on conversation step
export function getInputPlaceholder(step: number, language: Language): string {
  // Steps 1-4 are menu selection (input disabled/hidden)
  if (step >= 1 && step <= 4) {
    return UI_TRANSLATIONS.selectFromMenu[language];
  }

  // Steps 5-7 are roleplay (text input enabled)
  return UI_TRANSLATIONS.typeYourResponse[language];
}

// Get prompt text based on conversation step
export function getStepPrompt(step: number, language: Language): string {
  switch (step) {
    case 1:
      return UI_TRANSLATIONS.chooseCulturePrompt[language];
    case 2:
      return UI_TRANSLATIONS.chooseCategoryPrompt[language];
    case 3:
      return UI_TRANSLATIONS.chooseScenarioPrompt[language];
    case 4:
      return UI_TRANSLATIONS.chooseRolePrompt[language];
    default:
      return '';
  }
}
