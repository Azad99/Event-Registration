export interface Event {
  id: string
  title: string
  venue: string
  startTime: Date
  endTime: Date
  price: number
  image: string
  rating: number
  reviews: number
  distance: number
  tags: string[]
  isSafeForWomen?: boolean
}

export interface Category {
  id: string
  label: string
  emoji: string
}
