"use client"

import { useState } from "react"
import { CalendarIcon, MapPin, PartyPopper, Music, Image, Presentation, Users, Compass, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Map of category IDs to their respective icons
const categoryIcons = {
  soiree: PartyPopper,
  musique: Music,
  expo: Image,
  conference: Presentation,
  famille: Users,
  tourisme: Compass,
  ateliers: Hammer,
} as const

const categories = [
  { id: "soiree", label: "Party" },
  { id: "musique", label: "Musik" },
  { id: "expo", label: "Ausstellung" },
  { id: "conference", label: "Konferenz" },
  { id: "famille", label: "Familie" },
  { id: "tourisme", label: "Tourismus" },
  { id: "ateliers", label: "Workshops" },
] as const

export function Filters() {
  const [date, setDate] = useState<Date>()
  const [selectedCategory, setSelectedCategory] = useState<string>()

  return (
    <div className="sticky top-0 z-10 bg-background border-b">
      <div className="container mx-auto px-4">
        {/* Location and Date filters */}
        <div className="flex flex-col sm:flex-row gap-4 py-4 border-b">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Wohin möchten Sie?" className="pl-9" />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-[200px] bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? date.toLocaleDateString() : "Datum auswählen"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* Category filters */}
        <div className="flex gap-8 py-4 overflow-x-auto scrollbar-hide">
          {categories.map(({ id, label }) => {
            const Icon = categoryIcons[id as keyof typeof categoryIcons]
            return (
              <Button
                key={id}
                variant="ghost"
                className={cn(
                  "flex-col h-auto px-4 py-2 hover:bg-accent hover:text-accent-foreground",
                  selectedCategory === id && "bg-accent text-accent-foreground",
                )}
                onClick={() => setSelectedCategory(id)}
              >
                <Icon className="mb-1 h-5 w-5" />
                <span className="text-xs">{label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
