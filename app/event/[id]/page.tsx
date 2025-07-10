import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, MapPin, Calendar, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { events } from "@/lib/data"
import { notFound } from "next/navigation"

export default function EventPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id)

  if (!event) {
    notFound()
  }

  const formatDate = (date: Date) => {
    const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
    const months = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ]
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ChevronLeft className="h-6 w-6" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Image */}
      <div className="relative aspect-[3/2] w-full">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
      </div>

      {/* Event Details */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>

        <div className="flex items-center gap-1 mb-4">
          <span className="text-yellow-400">★</span>
          <span>{event.rating.toFixed(2)}</span>
          <span className="text-muted-foreground">({event.reviews} Bewertungen)</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{event.venue}</p>
              <p className="text-sm text-muted-foreground">{event.distance} km</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{formatDate(event.startTime)}</p>
              <p className="text-sm text-muted-foreground">
                {event.startTime.getHours()}h - {event.endTime.getHours()}h
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Über die Veranstaltung</h2>
          <p className="text-muted-foreground">
            Erleben Sie eine unvergessliche Veranstaltung in einzigartiger Atmosphäre. Genießen Sie erstklassige
            Unterhaltung, köstliche Getränke und eine lebendige Gemeinschaft. Perfekt für alle, die das Nachtleben und
            kulturelle Erlebnisse schätzen.
          </p>
        </div>

        {/* Booking Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
          <div className="container flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Ab</p>
              <p className="text-xl font-bold">{event.price}€</p>
            </div>
            <Button className="flex-1" size="lg">
              Buchen
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
