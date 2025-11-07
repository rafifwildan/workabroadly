import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type ButtonType = 'type1' | 'type2' | 'type3' | 'type4';

interface ButtonPillProps {
  children: React.ReactNode;
  size?: ButtonSize;
  type?: ButtonType;
  onClick?: () => void;
  className?: string;
}

const ButtonPill: React.FC<ButtonPillProps> = ({ 
  children, 
  size = 'md',
  type = 'type1',
  onClick,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Size configurations
  const sizeClasses = {
    sm: {
      outer: 'h-10 pl-2 pr-0',
      inner: 'h-8',
      text: 'text-sm',
      icon: 16,
      iconCircle: 'w-6 h-6'
    },
    md: {
      outer: 'h-14 pl-4 pr-2',
      inner: 'h-11',
      text: 'text-base',
      icon: 20,
      iconCircle: 'w-8 h-8'
    },
    lg: {
      outer: 'h-16 pl-6 pr-4',
      inner: 'h-[52px]',
      text: 'text-lg',
      icon: 24,
      iconCircle: 'w-10 h-10'
    },
    xl: {
      outer: 'h-20 pl-8 pr-6',
      inner: 'h-16',
      text: 'text-xl',
      icon: 28,
      iconCircle: 'w-12 h-12'
    }
  };

  const config = sizeClasses[size];

  // Color configurations based on type
  const getColors = () => {
    if (type === 'type1') {
      // Type 1: Black default -> Black hover -> White clicked (Horizontal arrow)
      return {
        outerBg: isPressed ? 'white' : 'black',
        innerBg: isPressed ? 'white' : 'black',
        textColor: isPressed ? 'black' : 'white',
        iconCircleBg: isPressed ? 'black' : 'white',
        iconColor: isPressed ? 'white' : 'black',
        borderColor: 'black',
        arrowRotation: 0
      };
    } else if (type === 'type2') {
      // Type 2: White default -> White hover -> Black clicked (Horizontal arrow)
      return {
        outerBg: isPressed ? 'black' : 'white',
        innerBg: isPressed ? 'black' : 'white',
        textColor: isPressed ? 'white' : 'black',
        iconCircleBg: isPressed ? 'white' : 'black',
        iconColor: isPressed ? 'black' : 'white',
        borderColor: 'black',
        arrowRotation: 0
      };
    } else if (type === 'type3') {
      // Type 3: Black default -> Black hover -> White clicked (45° arrow)
      return {
        outerBg: isPressed ? 'white' : 'black',
        innerBg: isPressed ? 'white' : 'black',
        textColor: isPressed ? 'black' : 'white',
        iconCircleBg: isPressed ? 'black' : 'white',
        iconColor: isPressed ? 'white' : 'black',
        borderColor: 'black',
        arrowRotation: -45
      };
    } else {
      // Type 4: White default -> White hover -> Black clicked (45° arrow)
      return {
        outerBg: isPressed ? 'black' : 'white',
        innerBg: isPressed ? 'black' : 'white',
        textColor: isPressed ? 'white' : 'black',
        iconCircleBg: isPressed ? 'white' : 'black',
        iconColor: isPressed ? 'black' : 'white',
        borderColor: 'black',
        arrowRotation: -45
      };
    }
  };

  const colors = getColors();

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`
        relative inline-flex items-center justify-center
        ${config.outer}
        rounded-full
        transition-all duration-300 ease-out
        ${isHovered ? 'pr-[calc(theme(spacing.0)+theme(spacing.8))]' : ''}
        ${isPressed ? 'pr-[calc(theme(spacing.0)+theme(spacing.10))]' : ''}
        ${className}
      `}
      style={{
        background: colors.outerBg,
        border: `2px solid ${colors.borderColor}`,
      }}
    >
      {/* Inner filled pill with 2px padding from outer border */}
      <div 
        className={`
          absolute inset-[2px]
          ${config.inner}
          rounded-full
          transition-all duration-300 ease-out
        `}
        style={{
          background: colors.innerBg,
        }}
      />

      {/* Content */}
      <span 
        className={`
          relative z-10 font-medium
          ${config.text}
          transition-colors duration-300
        `}
        style={{
          color: colors.textColor
        }}
      >
        {children}
      </span>

      {/* Arrow icon with circle background - appears on hover */}
      <div 
        className={`
          relative z-10 ml-3
          flex items-center justify-center
          ${config.iconCircle}
          rounded-full
          transition-all duration-300 ease-out
          ${isHovered || isPressed ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
        `}
        style={{
          background: colors.iconCircleBg
        }}
      >
        <ArrowRight 
          size={config.icon} 
          className="transition-colors duration-300"
          style={{
            color: colors.iconColor,
            transform: `rotate(${colors.arrowRotation}deg)`
          }}
        />
      </div>
    </button>
  );
};

export default ButtonPill;

// Example usage component
export const ButtonPillExamples: React.FC = () => {
  return (
    <div className="flex flex-col items-start gap-8 p-12 bg-gray-100 min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-4">Button Pill Variants</h2>
        <p className="text-gray-600 mb-6">Hover to see horizontal growth animation</p>
      </div>

      {/* Type 1 - Black to White */}
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4">Type 1 - Black Default (Horizontal Arrow)</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Small</p>
            <ButtonPill type="type1" size="sm" onClick={() => console.log('Type1 Small clicked')}>
              Start Now
            </ButtonPill>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Medium (Default)</p>
            <ButtonPill type="type1" size="md" onClick={() => console.log('Type1 Medium clicked')}>
              Start Now
            </ButtonPill>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Large</p>
            <ButtonPill type="type1" size="lg" onClick={() => console.log('Type1 Large clicked')}>
              Start Now
            </ButtonPill>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Extra Large</p>
            <ButtonPill type="type1" size="xl" onClick={() => console.log('Type1 XL clicked')}>
              Start Now
            </ButtonPill>
          </div>
        </div>
      </div>

      {/* Type 2 - White to Black */}
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4">Type 2 - White Default (Horizontal Arrow)</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Small</p>
            <ButtonPill type="type2" size="sm" onClick={() => console.log('Type2 Small clicked')}>
              Start Now
            </ButtonPill>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Medium (Default)</p>
            <ButtonPill type="type2" size="md" onClick={() => console.log('Type2 Medium clicked')}>
              Start Now
            </ButtonPill>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Large</p>
            <ButtonPill type="type2" size="lg" onClick={() => console.log('Type2 Large clicked')}>
              Start Now
            </ButtonPill>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Extra Large</p>
            <ButtonPill type="type2" size="xl" onClick={() => console.log('Type2 XL clicked')}>
              Start Now
            </ButtonPill>
          </div>
        </div>
      </div>

      {/* Type 3 - Black to White with 45° Arrow */}
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4">Type 3 - Black Default (45° Arrow)</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Small</p>
            <ButtonPill type="type3" size="sm" onClick={() => console.log('Type3 Small clicked')}>
              Subscribe now
            </ButtonPill>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Medium (Default)</p>
            <ButtonPill type="type3" size="md" onClick={() => console.log('Type3 Medium clicked')}>
              Subscribe now
            </ButtonPill>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Large</p>
            <ButtonPill type="type3" size="lg" onClick={() => console.log('Type3 Large clicked')}>
              Subscribe now
            </ButtonPill>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Extra Large</p>
            <ButtonPill type="type3" size="xl" onClick={() => console.log('Type3 XL clicked')}>
              Subscribe now
            </ButtonPill>
          </div>
        </div>
      </div>

      {/* Type 4 - White to Black with 45° Arrow */}
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4">Type 4 - White Default (45° Arrow)</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Small</p>
            <ButtonPill type="type4" size="sm" onClick={() => console.log('Type4 Small clicked')}>
              Subscribe now
            </ButtonPill>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Medium (Default)</p>
            <ButtonPill type="type4" size="md" onClick={() => console.log('Type4 Medium clicked')}>
              Subscribe now
            </ButtonPill>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Large</p>
            <ButtonPill type="type4" size="lg" onClick={() => console.log('Type4 Large clicked')}>
              Subscribe now
            </ButtonPill>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Extra Large</p>
            <ButtonPill type="type4" size="xl" onClick={() => console.log('Type4 XL clicked')}>
              Subscribe now
            </ButtonPill>
          </div>
        </div>
      </div>
    </div>
  );
};