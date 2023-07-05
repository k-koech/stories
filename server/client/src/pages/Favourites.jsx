import React, {useContext, useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import {BooksContext} from "../context/BooksContext"
import Fetcher from "../context/lib/Fetcher"
import { IoMdHeartDislike } from 'react-icons/io'


export default function Favourites() 
{
  const {saveBook} = useContext(BooksContext)
  const {data:books, isLoading, isError} = Fetcher(`/api/savedbooks`);

  const handleSave = (id) =>{
    saveBook(id)
}
  return (
    <>
<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
  <h4 className='my-5 font-bold text-center sm:text-2xl'>Your Saved Stories</h4>
  <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">

      <article className="bg-gray-100 p-4 mx-auto w-full max-w-3xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      {
        isLoading &&
        <div className="flex w-full items-center justify-center h-56 ">
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            </div>
        </div>
      }
      {
        books && books.length<1 &&
        <div className="text-center ">
          <p>You've not saved anything at the momment!</p>
        </div>
      }
      {books && books.map && books.map((book)=>(
        <div className='grid border sm:grid-cols-3 sm:h-60 mb-5 '>
          <div className='flex overflow-hidden items-center bg-white'>
            <img src={book && book.books.book_image } className='h-auto w-full' alt="" />
          </div>
          <div className="p-3 mb-4 lg:mb-6 not-format">
               <h6 className='text-xl font-semibold'>{book && book.books.title}</h6>
               <div className="inline-flex items-center my-4" >
                 {book && book.user && book.user.image_url?
                           <img src={book.user.image_url} alt="profile loading" className="rounded-full mx-auto   w-10 h-10 mr-3 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
                         :
                         <img src="/defaultuser.png" alt="profile loading" className="rounded-full mx-auto  w-10 h-10 mr-3 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />

                      }
                  <div>
                      <a href="#" rel="author" className="text-xl text-gray-900 dark:text-white">
                        {book && book.user && book.user.username}
                        </a>
                     
                  </div>
                </div>
               <div className='flex items-center justify-between'>
                  <Link to={`/story/${book.books.id}`} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 mr-2 mb-2 my-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Read the story
                  </Link>
                  <span className='hover:cursor-pointer hover:text-green-500'>
                     <IoMdHeartDislike title='Remove from favourites' size={25} onClick={()=>handleSave(book.books.id)} />
                  </span>
     
                </div>
          </div>        
        </div>
      ))
     }
    </article>
  </div>
</main>


</>
  )
}
