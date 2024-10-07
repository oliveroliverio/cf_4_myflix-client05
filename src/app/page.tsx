/** @format */
import fetch from 'node-fetch'
import https from 'https'

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
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
					{books.map((book) => (
						<div
							key={book.id}
							className='bg-white p-4 shadow-md rounded-md'>
							<img
								src={book.image}
								alt={book.title}
								className='w-full h-48 object-cover'
							/>
							<div className='mt-4'>
								<h2 className='text-xl font-semibold'>
									{book.title}
								</h2>
								<p className='text-gray-500'>{book.author}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</main>
	)
}
