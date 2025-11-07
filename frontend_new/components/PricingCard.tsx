import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import ButtonPill from './ButtonPill';

type CardType = 'cyan' | 'yellow' | 'purple' | 'pink';

interface CreditPackage {
  id: string;
  name: string;
  priceInCents: number;
  credits: number;
  features: string[];
  popular?: boolean;
}

interface BackgroundImages {
  default: string;
  hover?: string;
  clicked?: string;
}

interface PricingCardProps {
  package: CreditPackage;
  type?: CardType;
  backgroundImages?: BackgroundImages;
  showPurchaseButton?: boolean;
  ctaText?: string;
  ctaLink?: string;
  onSubscribe?: () => void;
  className?: string;
}

// Default background images for each type
const DEFAULT_BACKGROUND_IMAGES: Record<CardType, BackgroundImages> = {
  cyan: {
    default: '/images/CardPricingBG/CyanNormalCardBG.png',
    hover: '/images/CardPricingBG/CyanHoverCardBG.png',
    clicked: '/images/CardPricingBG/CyanClickedCardBG.png'
  },
  yellow: {
    default: '/images/CardPricingBG/YellowNormalCardBG.png',
    hover: '/images/CardPricingBG/YellowHoverCardBG.png',
    clicked: '/images/CardPricingBG/YellowClickedCardBG.png'
  },
  purple: {
    default: '/images/CardPricingBG/PurpleNormalCardBG.png',
    hover: '/images/CardPricingBG/PurpleHoverCardBG.png',
    clicked: '/images/CardPricingBG/PurpleClickedCardBG.png'
  },
  pink: {
    default: '/images/CardPricingBG/PinkNormalCardBG.png',
    hover: '/images/CardPricingBG/PinkHoverCardBG.png',
    clicked: '/images/CardPricingBG/PinkClickedCardBG.png'
  }
};



const PricingCard: React.FC<PricingCardProps> = ({
  package: pkg,
  type = 'cyan',
  backgroundImages,
  showPurchaseButton = false,
  ctaText = "Get Started",
  ctaLink,
  onSubscribe,
  className = ''
}) => {
  const [isClicked, setIsClicked] = useState(false);

  // Tentukan link tombol
  const bgImages = backgroundImages || DEFAULT_BACKGROUND_IMAGES[type];

  const priceDisplay = pkg.priceInCents === 0 ? "0" : (pkg.priceInCents / 100).toFixed(2);
  const perCredit =
    pkg.credits > 0 ? (pkg.priceInCents / 100 / pkg.credits).toFixed(3) : null;
  const isEnterprise = pkg.id === "enterprise-pack";
  const isFree = pkg.id === "free-tier";

  const buttonLink =
    ctaLink || (showPurchaseButton ? `/my-plan/buy?package=${pkg.id}` : "/signup");
  const buttonText = "Purchase";

  const handleClick = () => {
    onSubscribe?.();
  };

  // preload images for smooth experience
  useEffect(() => {
    [bgImages.default, bgImages.hover, bgImages.clicked].forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    });
  }, [bgImages]);

  // --- Penyiapan Style Dinamis ---

  let cardStyle = {};
  let buttonClasses = "";

  const checkmarkClasses = "bg-gray-900 text-white";
  const popularLabelClasses = "bg-gray-900 text-white";

  if (isFree) {
    // Starter (Hijau)
    cardStyle = {
      backgroundImage: `url('/images/card1.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    buttonClasses = "bg-gray-900 text-white hover:bg-gray-800";
  } else if (pkg.popular) {
    // Professional (Kuning)
    cardStyle = {
      backgroundImage: `url('/images/card2.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    buttonClasses = "bg-white text-gray-900 hover:bg-gray-100";
  } else if (isEnterprise) {
    // Enterprise (Pink)
    cardStyle = {
      backgroundImage: `url('/images/card4.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    buttonClasses = "bg-gray-900 text-white hover:bg-gray-800";
  } else {
    // Premium (Ungu)
    cardStyle = {
      backgroundImage: `url('/images/card3.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    buttonClasses = "bg-gray-900 text-white hover:bg-gray-800";
  }
  // --- Akhir Penyiapan Style ---

  return (
    <div
      className={`
        group
        relative w-[180px] h-[340px] rounded-3xl overflow-hidden
        transition-all duration-300 ease-out
        ${className}
      `}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onMouseLeave={() => setIsClicked(false)}
    >

      {/* ✅ DEFAULT BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImages.default})` }}
      />

      {/* ✅ HOVER BACKGROUND */}
      {bgImages.hover && (
        <div
          className="
            absolute inset-0 bg-cover bg-center bg-no-repeat
            opacity-0 transition-opacity duration-200
            group-hover:opacity-100
          "
          style={{ backgroundImage: `url(${bgImages.hover})` }}
        />
      )}

      {/* ✅ CLICK BACKGROUND */}
      {bgImages.clicked && (
        <div
          className={`
            absolute inset-0 bg-cover bg-center bg-no-repeat
            transition-opacity duration-150
            ${isClicked ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ backgroundImage: `url(${bgImages.clicked})` }}
        />
      )}

      {/* ✅ CONTENT (unchanged) */}
      {pkg.popular && (
        <div className="absolute top-4 right-4 z-20 bg-white text-black px-2 py-1 rounded-full text-[10px] font-bold">
          POPULAR
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-base font-bold text-gray-900 mb-0.5">{pkg.name}</h3>
          {isFree && <p className="text-xs text-gray-700">For personal</p>}
        </div>

        {/* Price */}
        <div className="mb-3">
          {isEnterprise ? (
            <span className="text-2xl font-bold text-gray-900">Custom</span>
          ) : (
            <div className="flex items-baseline">
              <span className="text-sm font-medium text-gray-900">$</span>
              <span className="text-4xl font-bold text-gray-900">{priceDisplay}</span>
              {!isFree && <span className="text-xs text-gray-700 ml-1">/mo</span>}
            </div>
          )}
        </div>

        {/* Credits */}
        {showPurchaseButton && !isFree && !isEnterprise && (
          <div className="mb-3">
            <div className="text-xs text-gray-900">{pkg.credits} credits</div>
            {perCredit && <div className="text-[10px] text-gray-700">${perCredit}/credit</div>}
          </div>
        )}

        {/* Features */}
        <div className="flex-1 mb-4 space-y-1.5">
          {pkg.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gray-900 flex items-center justify-center">
                <Check size={10} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-xs text-gray-900 leading-tight">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
          {buttonLink ? (
            <a href={buttonLink}>
              <ButtonPill type="type3" size="sm" onClick={handleClick}>
                {buttonText}
              </ButtonPill>
            </a>
          ) : (
            <ButtonPill type="type3" size="sm" onClick={handleClick}>
              {buttonText}
            </ButtonPill>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
export { DEFAULT_BACKGROUND_IMAGES };
export type { CardType, BackgroundImages };
