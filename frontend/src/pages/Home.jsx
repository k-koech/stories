import React, { useContext } from 'react'
import { BooksContext } from '../context/BooksContext'
import { Link } from 'react-router-dom'
import HomeStory from '../components/HomeStory'

export default function Home() 
{
  
  const {books} = useContext(BooksContext)
  return (
    <div className='container my-3 mx-auto'>
      <div className="mx-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {books && books.map && books.map(book => (
            <HomeStory book={book} key={book.id} />
        ))}
      </div>
    </div>
  )
}
