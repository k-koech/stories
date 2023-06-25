import React, { useContext } from 'react'
import {AiOutlineHeart} from "react-icons/ai"
import { Link } from 'react-router-dom'
import { BooksContext } from '../context/BooksContext'
export default function HomeStory({book}) 
{
    const {saveBook} = useContext(BooksContext)
    const handleSave = () =>{
        saveBook(book.id)
    }
  return (
    <div key={book.id} className='rounded bg-gray-100'>
    <div className='bg-gray-200 flex justify-center'>
    {book && book.book_image?
    <img className="h-[27vh] max-w-full" src={book && book.book_image} alt="image" />
    :
    <img className="h-auto max-w-lg" src="default-img.png" alt="image" />
    } 
    </div>
    <div className='p-3'>
      <h5 className='font-semibold'>{book && book.title}</h5>
      <div className='flex items-center'>
          <div className="relative w-10 h-10 overflow-hidden bg-white rounded-full dark:bg-gray-600">
              <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          </div>
          <p className='text-md ml-5'>{book && book.user && book.user.username}</p>
     </div>
     <div className='flex items-center justify-between'>
        <Link to={`/story/${book.id}`} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 mr-2 mb-2 my-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        Read the story
        </Link>
       
        <span className='hover:cursor-pointer hover:text-green-500'>
         <AiOutlineHeart size={25} onClick={handleSave} />
        </span>
      </div>

    </div>
  </div>
  )
}
