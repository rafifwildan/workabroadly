import React from 'react';

interface CultureSelectorProps {
  onCultureSelect: (cultureCode: string) => void;
  selectedLanguage: string;
  disabled?: boolean;
}

const CultureSelector: React.FC<CultureSelectorProps> = ({
  onCultureSelect,
  selectedLanguage,
  disabled = false
}) => {
  const cultureMap = {
    "Japanese": "ja",
    "Korean": "ko",
    "Indonesian": "id",
    "Western": "en"
  };

  const cultures = [
    {
      name: "Japanese",
      code: "ja",
      icon: "🇯🇵",
      translations: {
        en: "Japanese",
        id: "Jepang",
        ko: "일본어",
        ja: "日本語"
      }
    },
    {
      name: "Korean",
      code: "ko",
      icon: "🇰🇷",
      translations: {
        en: "Korean",
        id: "Korea",
        ko: "한국어",
        ja: "韓国語"
      }
    },
    {
      name: "Indonesian",
      code: "id",
      icon: "🇮🇩",
      translations: {
        en: "Indonesian",
        id: "Indonesia",
        ko: "인도네시아어",
        ja: "インドネシア語"
      }
    },
    {
      name: "Western",
      code: "en",
      icon: "🌎",
      translations: {
        en: "Western",
        id: "Western",
        ko: "서양",
        ja: "西洋"
      }
    }
  ];

  const greetingText = {
    en: "To get started, please select the culture focus you'd like to discuss:",
    id: "Untuk memulai, silakan pilih fokus kultur yang ingin Anda diskusikan:",
    ko: "시작하려면 논의하고 싶은 문화 초점을 선택하세요:",
    ja: "開始するには、議論したい文化の焦点を選択してください："
  };

  const getTranslation = (translations: Record<string, string>) => {
    return translations[selectedLanguage] || translations.en;
  };

  return (
    <div className="mb-6 p-6 bg-primary/5 rounded-xl border-2 border-primary/20">
      <p className="text-center text-foreground mb-6 font-medium text-lg">
        {greetingText[selectedLanguage as keyof typeof greetingText] || greetingText.en}
      </p>
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {cultures.map((culture) => (
          <button
            key={culture.code}
            onClick={() => onCultureSelect(culture.code)}
            disabled={disabled}
            className="flex flex-col items-center justify-center p-6 bg-white hover:bg-primary/10 border-2 border-primary/20 hover:border-primary rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
          >
            <span className="text-4xl mb-2">{culture.icon}</span>
            <span className="text-foreground font-medium">
              {getTranslation(culture.translations)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CultureSelector;
