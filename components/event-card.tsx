"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/types"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (date: Date) => {
    const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
    return `${days[date.getDay()]}. ${date.getDate()} | ${date.getHours()}h - ${event.endTime.getHours()}h`
  }

  return (
    <Link href={`/event/${event.id}`} className="group relative block">
      {/* Image and Tags */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10" />

        {/* Heart Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.preventDefault()
            // Add favorite logic here
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Tags and Distance */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white/80 hover:bg-white">
              {tag}
            </Badge>
          ))}
          <Badge variant="secondary" className="bg-white/80 hover:bg-white">
            {event.distance} km
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{event.title}</h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm">{event.rating.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">({event.reviews})</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{event.venue}</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{formatDate(event.startTime)}</span>
          <span className="font-medium">Ab {event.price}€</span>
        </div>
      </div>
    </Link>
  )
}
