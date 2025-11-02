"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CountrySelectCardProps {
  country: "japan" | "korea"
  selected?: boolean
  onClick?: () => void
}

export function CountrySelectCard({ country, selected, onClick }: CountrySelectCardProps) {
  const countryData = {
    japan: {
      flag: "🇯🇵",
      name: "Japan",
    },
    korea: {
      flag: "🇰🇷",
      name: "Korea",
    },
  }

  const data = countryData[country]

  return (
    <Card
      className={cn("p-6 cursor-pointer transition-all hover:shadow-md", selected && "ring-2 ring-primary")}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="text-5xl mb-3">{data.flag}</div>
        <h3 className="text-lg font-semibold">{data.name}</h3>
      </div>
    </Card>
  )
}
