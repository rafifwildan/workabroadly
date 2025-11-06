import type { CreditPackage } from "@/lib/products"

interface PricingCardProps {
  package: CreditPackage
  showPurchaseButton?: boolean
  ctaText?: string
  ctaLink?: string
}

export default function PricingCard({
  package: pkg,
  showPurchaseButton = false,
  ctaText = "Get Started",
  ctaLink,
}: PricingCardProps) {
  const priceDisplay = pkg.priceInCents === 0 ? "0" : (pkg.priceInCents / 100).toFixed(2)
  const perCredit = pkg.credits > 0 ? (pkg.priceInCents / 100 / pkg.credits).toFixed(3) : null
  const isEnterprise = pkg.id === "enterprise-pack"
  const isFree = pkg.id === "free-tier"

  // Tentukan link tombol
  const buttonLink = ctaLink || (showPurchaseButton ? `/my-plan/buy?package=${pkg.id}` : "/signup")

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
      className="rounded-3xl p-8 relative transition-all duration-300 overflow-hidden shadow-lg text-gray-900"
      style={cardStyle} 
    >
      
      <div className="relative z-10 flex flex-col h-full"> {/* Flex-col untuk menata konten */}
        
        {/* --- PERUBAHAN DI SINI: Untuk Label POPULAR dan Header --- */}
        <div className="relative mb-1"> {/* Wrapper relatif untuk penempatan Popular */}
          {pkg.popular && (
            // PERBAIKAN: Posisi label 'POPULAR'
            // Dibuat absolute di tengah atas, dan ada margin-bottom
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${popularLabelClasses} px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap`}>
              POPULAR
            </div>
          )}
          <h3 className="text-3xl font-bold mt-4"> {/* mt-4 untuk memberi jarak dari label Popular */}
            {pkg.name}
          </h3>
        </div>

        {isFree && (
          <p className="text-lg mb-6 text-gray-700">For personal</p>
        )}

        {/* --- Bagian Harga --- */}
        <div className={`mb-8 flex ${isEnterprise ? 'justify-center' : 'items-baseline'} min-h-[80px]`}>
          {isEnterprise ? (
            <span className="text-6xl font-bold">
              Custom
            </span>
          ) : (
            <>
              <span className="text-6xl font-bold">
                ${priceDisplay}
              </span>
              {!isFree && <span className="text-2xl ml-1 font-medium">/mo</span>}
            </>
          )}
        </div>

        {showPurchaseButton && !isFree && !isEnterprise && (
          <div className="mb-4">
            <div className="text-sm mb-2">
              {pkg.credits} credits
            </div>
            {perCredit && (
              <div className="text-xs">
                ${perCredit}/credit
              </div>
            )}
          </div>
        )}

        {/* --- Bagian Fitur --- */}
        <ul className="space-y-4 mb-10 flex-grow">
          {pkg.features.map((feature, idx) => {
            const match = feature.match(/^(.*?)\s*(\(.*?\))?$/);
            const mainText = match ? match[1] : feature;
            const subText = match ? match[2] : null;

            return (
              <li key={idx} className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${checkmarkClasses}`}
                >
                  ✓
                </span>
                <span className="text-base">
                  {mainText}
                  {subText && <span className="text-gray-600 ml-1">{subText}</span>}
                </span>
              </li>
            );
          })}
        </ul>

        {/* --- Bagian Tombol --- */}
        <a href={buttonLink}>
          <button
            className={`w-full rounded-full font-semibold py-4 px-6 transition-all duration-300 text-lg ${buttonClasses}`}
          >
            {showPurchaseButton && !isFree && !isEnterprise ? "Purchase" : "Subscribe now"}
          </button>
        </a>
      </div>
    </div>
  )
}