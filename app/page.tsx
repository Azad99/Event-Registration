import { Header } from "@/components/header"
import { EventCard } from "@/components/event-card"
import { events } from "@/lib/data"

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </main>
  )
}
