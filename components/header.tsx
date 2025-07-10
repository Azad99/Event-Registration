"use client"

import { useEffect, useState } from "react"
import { MapPin, Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { categories } from "@/lib/data"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { de } from "date-fns/locale"

export function Header() {
  const [selectedCategory, setSelectedCategory] = useState("soirees")
  const [location, setLocation] = useState("Adresse eingeben")
  const [date, setDate] = useState<Date>()
  const [address, setAddress] = useState("")
  const [isAddressOpen, setIsAddressOpen] = useState(false)
  const [isDateOpen, setIsDateOpen] = useState(false)

  // Geolocation
  useEffect(() => {
    const checkGeolocation = async () => {
      if ("geolocation" in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            })
          })
          setLocation("In meiner Nähe")
          // You can use position.coords.latitude and position.coords.longitude
          // to get the exact coordinates and potentially reverse geocode them
        } catch (error) {
          // Handle geolocation errors gracefully
          if (error && typeof error === "object" && "code" in error) {
            const geoError = error as GeolocationPositionError
            switch (geoError.code) {
              case geoError.PERMISSION_DENIED:
                console.log("L'utilisateur a refusé la géolocalisation.")
                break
              case geoError.POSITION_UNAVAILABLE:
                console.log("La position n'est pas disponible.")
                break
              case geoError.TIMEOUT:
                console.log("La demande de géolocalisation a expiré.")
                break
              default:
                console.log("Une erreur inconnue s'est produite.")
                break
            }
          } else {
            console.log("Erreur de géolocalisation:", error)
          }
          setLocation("Adresse eingeben")
        }
      } else {
        console.log("La géolocalisation n'est pas supportée par ce navigateur.")
        setLocation("Adresse eingeben")
      }
    }

    checkGeolocation()
  }, [])

  // Date formatting helpers
  const isToday = (date?: Date) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isTomorrow = (date?: Date) => {
    if (!date) return false
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return date.toDateString() === tomorrow.toDateString()
  }

  const getDateButtonText = () => {
    if (!date) return "Heute"
    if (isToday(date)) return "Heute"
    if (isTomorrow(date)) return "Morgen"
    return format(date, "dd MMM", { locale: de })
  }

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    setIsDateOpen(false)
  }

  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="container mx-auto px-4">
        {/* Location and Date */}
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4 min-w-0">
            {/* Address Popover */}
            <Popover open={isAddressOpen} onOpenChange={setIsAddressOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 max-w-[200px]">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{location}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Adresse eingeben</h4>
                    <Input
                      placeholder="z.B.: Hauptstraße 123"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        setLocation(address)
                        setIsAddressOpen(false)
                      }}
                    >
                      Bestätigen
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Date Popover */}
            <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Calendar className="h-4 w-4" />
                  <span>{getDateButtonText()}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3 border-b">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDateSelect(new Date())}
                      className={cn(isToday(date) && "bg-accent text-accent-foreground")}
                    >
                      Heute
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        handleDateSelect(tomorrow)
                      }}
                      className={cn(isTomorrow(date) && "bg-accent text-accent-foreground")}
                    >
                      Morgen
                    </Button>
                  </div>
                </div>
                <CalendarComponent mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-6 overflow-x-auto py-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={cn("h-auto px-3 py-2", selectedCategory === category.id && "bg-accent text-accent-foreground")}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </header>
  )
}
