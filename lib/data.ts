import type { Event, Category } from "./types"

export const categories: Category[] = [
  { id: "soirees", label: "Partys", emoji: "🌙" },
  { id: "musique", label: "Musik", emoji: "🎵" },
  { id: "culture", label: "Kultur", emoji: "🎭" },
  { id: "expos", label: "Ausstellungen", emoji: "🖼️" },
  { id: "marches", label: "Märkte", emoji: "🏪" },
]

export const events: Event[] = [
  {
    id: "1",
    title: "Groveland, California",
    venue: "La machine du moulin rouge",
    startTime: new Date("2025-02-23T19:00:00"),
    endTime: new Date("2025-02-23T02:00:00"),
    price: 30,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    rating: 4.91,
    reviews: 120,
    distance: 3.2,
    tags: ["Techno", "Safe for women"],
    isSafeForWomen: true,
  },
  {
    id: "2",
    title: "Summer Night Festival",
    venue: "Parc des Expositions",
    startTime: new Date("2025-02-24T20:00:00"),
    endTime: new Date("2025-02-24T03:00:00"),
    price: 25,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    rating: 4.85,
    reviews: 89,
    distance: 3.2,
    tags: ["Techno", "Festival"],
  },
  {
    id: "3",
    title: "Electronic Dreams",
    venue: "Le Petit Bain",
    startTime: new Date("2025-02-25T22:00:00"),
    endTime: new Date("2025-02-25T05:00:00"),
    price: 20,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    rating: 4.78,
    reviews: 156,
    distance: 3.2,
    tags: ["Techno", "Electronic"],
  },
]
