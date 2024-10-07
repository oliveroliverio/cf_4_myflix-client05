/** @format */
import fetch from 'node-fetch'
import https from 'https'
import { BookCardsJsx } from '@/components/book-cards'

interface Book {
	id: number
	title: string
	image: string
	author: string
}

async function getBooks() {
	try {
		const apiUrl =
			process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'
		const response = await fetch(`${apiUrl}/books`)
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const books = await response.json()
		return books
	} catch (error) {
		console.error('Failed to fetch books:', error)
		return []
	}
}

const BookCard = ({ book }) => (
	<div className='relative w-64 h-96 bg-gray-900 text-white overflow-hidden transform skew-y-1 hover:skew-y-0 transition-transform duration-300'>
		<div className='absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-50 opacity-75'></div>
		<img
			src={book.imageUrl}
			alt={book.title}
			className='absolute inset-0 w-full h-full object-cover mix-blend-overlay'
		/>
		<div className='absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black to-transparent'>
			<h2 className='text-2xl font-bold mb-2 leading-tight'>
				{book.title}
			</h2>
			<p className='text-sm text-gray-300'>{book.author}</p>
		</div>
		<div className='absolute top-0 right-0 w-16 h-16 bg-yellow-400 transform rotate-45 translate-x-8 -translate-y-8'></div>
	</div>
)

export default async function Home() {
	console.log('Rendering Home component')
	const books = await getBooks()

	console.log('Books:', books)

	return (
		<main>
			<h1>My Book List</h1>
			{books.length === 0 ? (
				<p>No books available or error fetching booksasdf.</p>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
					{books.map((book) => (
						<BookCard
							key={book.id}
							book={book}
						/>
					))}
				</div>
			)}
		</main>
	)
}
