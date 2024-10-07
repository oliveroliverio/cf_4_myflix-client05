'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const booksArray = [
  {
    id: 1,
    title: "The Neon Horizon",
    author: "Zara Quantum",
    imageUrl: "/placeholder.svg?height=400&width=300"
  },
  {
    id: 2,
    title: "Cybernetic Dreams",
    author: "Axel Neuromancer",
    imageUrl: "/placeholder.svg?height=400&width=300"
  },
  {
    id: 3,
    title: "Quantum Whisper",
    author: "Nova Stardust",
    imageUrl: "/placeholder.svg?height=400&width=300"
  }
]

const BookCard = ({ book }) => (
  <div className="relative w-64 h-96 bg-gray-900 text-white overflow-hidden transform skew-y-3 hover:skew-y-0 transition-transform duration-300">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-50 opacity-75"></div>
    <img
      src={book.imageUrl}
      alt={book.title}
      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
    />
    <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black to-transparent">
      <h2 className="text-2xl font-bold mb-2 leading-tight">{book.title}</h2>
      <p className="text-sm text-gray-300">{book.author}</p>
      <p>lorem ipsum dolor sit amet</p>
    </div>
    <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400 transform rotate-45 translate-x-8 -translate-y-8"></div>
  </div>
)

export function BookCardsJsx() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % booksArray.length)
  }

  const prevBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + booksArray.length) % booksArray.length)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-4">
      <button
        onClick={prevBook}
        className="mr-4 text-white hover:text-yellow-400 transition-colors duration-200"
        aria-label="Previous book"
      >
        <ChevronLeft size={24} />
      </button>
      <BookCard book={booksArray[currentIndex]} />
      <button
        onClick={nextBook}
        className="ml-4 text-white hover:text-yellow-400 transition-colors duration-200"
        aria-label="Next book"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}