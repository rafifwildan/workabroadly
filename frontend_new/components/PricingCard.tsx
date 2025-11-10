import React, { useState } from 'react';
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
    default: '/Card-Pricing/CyanNormalCardBG.png',
    hover: '/Card-Pricing/CyanHoverCardBG.png',
    clicked: '/Card-Pricing/CyanClickedCardBG.png'
  },
  yellow: {
    default: '/Card-Pricing/YellowNormalCardBG.png',
    hover: '/Card-Pricing/YellowHoverCardBG.png',
    clicked: '/Card-Pricing/YellowClickedCardBG.png'
  },
  purple: {
    default: '/Card-Pricing/PurpleNormalCardBG.png',
    hover: '/Card-Pricing/PurpleHoverCardBG.png',
    clicked: '/Card-Pricing/PurpleClickedCardBG.png'
  },
  pink: {
    default: '/Card-Pricing/PinkNormalCardBG.png',
    hover: '/Card-Pricing/PinkHoverCardBG.png',
    clicked: '/Card-Pricing/PinkClickCardBG.png'
  }
};

const PricingCard: React.FC<PricingCardProps> = ({
  package: pkg,
  type = 'cyan',
  backgroundImages,
  showPurchaseButton = false,
  ctaText = "Purchase",
  ctaLink,
  onSubscribe,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  console.log(`${pkg.name} - isHovered: ${isHovered}, isClicked: ${isClicked}`);

  // Price calculations
  const priceDisplay = pkg.priceInCents === 0 ? "0" : (pkg.priceInCents / 100).toFixed(2);
  const perCredit = pkg.credits > 0 ? (pkg.priceInCents / 100 / pkg.credits).toFixed(3) : null;
  const isEnterprise = pkg.id === "enterprise-pack";
  const isFree = pkg.id === "free-tier";

  // Determine button link and text
  const buttonLink = ctaLink || (showPurchaseButton ? `/my-plan/buy?package=${pkg.id}` : "/signup");
  const buttonText = showPurchaseButton && !isFree && !isEnterprise ? "Purchase" : ctaText || "Subscribe now";

  // Get background images: use custom if provided, otherwise use default for type
  const bgImages = backgroundImages || DEFAULT_BACKGROUND_IMAGES[type];

  // Get the appropriate background image based on state
  const getCurrentBackground = () => {
    if (isClicked && bgImages.clicked) {
      console.log('Showing clicked background:', bgImages.clicked);
      return bgImages.clicked;
    } else if (isHovered && bgImages.hover) {
      console.log('Showing hover background:', bgImages.hover);
      return bgImages.hover;
    }
    console.log('Showing default background:', bgImages.default);
    return bgImages.default;
  };

  const currentBg = getCurrentBackground();

  const handleClick = () => {
    onSubscribe?.();
  };

  return (
    <div
      className={`
        relative w-[180px] h-[340px] rounded-3xl overflow-hidden
        transition-all duration-300 ease-out
        ${isHovered ? 'shadow-xl scale-[1.02]' : 'shadow-lg'}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsClicked(false);
      }}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage: `url(${currentBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute top-4 right-4 z-20 bg-white text-black px-2 py-1 rounded-full text-[10px] font-bold">
          POPULAR
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-base font-bold text-gray-900 mb-0.5">
            {pkg.name}
          </h3>
          {isFree && (
            <p className="text-xs text-gray-700">
              For personal
            </p>
          )}
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

        {/* Credits info */}
        {showPurchaseButton && !isFree && !isEnterprise && (
          <div className="mb-3">
            <div className="text-xs text-gray-900">
              {pkg.credits} credits
            </div>
            {perCredit && (
              <div className="text-[10px] text-gray-700">
                ${perCredit}/credit
              </div>
            )}
          </div>
        )}

        {/* Features List */}
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

        {/* Subscribe Button */}
        <div className="mt-auto">
          {buttonLink ? (
            <a href={buttonLink}>
              <ButtonPill 
                type="type3" 
                size="sm"
                onClick={handleClick}
              >
                {buttonText}
              </ButtonPill>
            </a>
          ) : (
            <ButtonPill 
              type="type3" 
              size="sm"
              onClick={handleClick}
            >
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

// Example usage component with type-based backgrounds
export const PricingCardExamples: React.FC = () => {
  // Sample packages
  const freePackage: CreditPackage = {
    id: 'free-tier',
    name: 'Free Plan',
    priceInCents: 0,
    credits: 0,
    features: [
      '3 users',
      '3 users',
      '3 users',
      '3 users',
      '3 users'
    ]
  };

  const starterPackage: CreditPackage = {
    id: 'starter-pack',
    name: 'Starter',
    priceInCents: 2900,
    credits: 100,
    features: [
      '10 users',
      '100 GB storage',
      'Basic support',
      'Monthly reports',
      'API access'
    ]
  };

  const proPackage: CreditPackage = {
    id: 'pro-pack',
    name: 'Pro Plan',
    priceInCents: 9900,
    credits: 500,
    popular: true,
    features: [
      'Unlimited users',
      '1 TB storage',
      'Priority support',
      'Advanced analytics',
      'Custom integrations'
    ]
  };

  const enterprisePackage: CreditPackage = {
    id: 'enterprise-pack',
    name: 'Enterprise',
    priceInCents: 0,
    credits: 0,
    features: [
      'Unlimited everything',
      'Dedicated support',
      'Custom solutions',
      'SLA guarantee',
      'Training included'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-800 p-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Pricing Cards with Type System</h2>
        
        {/* Using type prop (default placeholder backgrounds) */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6">Using Type Prop (Default Placeholders)</h3>
          <div className="flex gap-6 flex-wrap">
            <PricingCard 
              package={freePackage}
              type="cyan"
              ctaText="Get Started"
            />
            <PricingCard 
              package={starterPackage}
              type="yellow"
              showPurchaseButton={true}
            />
            <PricingCard 
              package={proPackage}
              type="purple"
              showPurchaseButton={true}
            />
            <PricingCard 
              package={enterprisePackage}
              type="pink"
              ctaText="Contact Sales"
            />
          </div>
        </div>

        {/* Using type with custom backgroundImages override */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6">Using Type + Custom Background Override</h3>
          <div className="flex gap-6 flex-wrap">
            <PricingCard 
              package={freePackage}
              type="cyan"
              backgroundImages={{
                default: '/images/pricing/cyan-default.png',
                hover: '/images/pricing/cyan-hover.png',
                clicked: '/images/pricing/cyan-clicked.png'
              }}
              ctaText="Start Free"
            />
            <PricingCard 
              package={proPackage}
              type="yellow"
              backgroundImages={{
                default: '/images/pricing/yellow-default.png',
                hover: '/images/pricing/yellow-hover.png',
                clicked: '/images/pricing/yellow-clicked.png'
              }}
              showPurchaseButton={true}
            />
          </div>
        </div>

        {/* All four types showcase */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6">All Type Variants</h3>
          <div className="flex gap-6 flex-wrap">
            <PricingCard package={starterPackage} type="cyan" showPurchaseButton={true} />
            <PricingCard package={starterPackage} type="yellow" showPurchaseButton={true} />
            <PricingCard package={starterPackage} type="purple" showPurchaseButton={true} />
            <PricingCard package={starterPackage} type="pink" showPurchaseButton={true} />
          </div>
        </div>

        {/* Minimal - just type, no custom backgrounds needed */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6">Simple Usage (Type Only)</h3>
          <div className="flex gap-6 flex-wrap">
            <PricingCard 
              package={freePackage}
              type="cyan"
            />
            <PricingCard 
              package={starterPackage}
              type="yellow"
              showPurchaseButton={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
