import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Reviews from "../components/Reviews"
import {BooksContext} from "../context/BooksContext"
import EditStory from "../components/EditStory"
import Fetcher from "../context/lib/Fetcher"
import { AuthContext } from '../context/AuthContext'
export default function Story() 
{
  const [show, setShow] = useState();
  function toggleShow() {
    setShow(!show);
  }
  var buttonText = show ? "Close Update" : "Update";

  const {deleteBook} = useContext(BooksContext)
  const {current_user} = useContext(AuthContext)
  const {id} = useParams()
  
  const {data:book, isLoading, isError} = Fetcher(`/api/books/${id}`);

  return (
    <>
<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
  <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
      {
        isLoading &&
        <div className="flex w-full items-center justify-center h-56 ">
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            </div>
        </div>
      }
      {book && 
      <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                  <div className="w-full inline-flex items-center justify-between mr-3 text-sm text-gray-900 dark:text-white">
                      <div className="inline-flex items-center " >
                        <img className="mr-4 w-10 h-10 rounded-full" src="/defaultuser.png" alt="Jese Leos" />
                        <div>
                            <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">
                              {book && book.user && book.user.username}
                              </a>
                            <p className="text-base font-light text-gray-500 dark:text-gray-400">
                              {book && book.user && book.user.bio}
                            </p>
                        </div>
                      </div>
                      <div>
                        <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button">
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                </path>
                            </svg>
                        </button>
                        <div id="dropdownComment1"
                            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            { (current_user && current_user.username)==(book.user.username) &&
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconHorizontalButton">
                                <li>
                                    <a onClick={()=>deleteBook(book.id)} className="block py-2 px-4 hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                                          Delete
                                    </a>
                                </li>
                                
                            </ul>
                            }
                          </div>
                      </div>
                  </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {book && book.title}
               </h1>
          </header>
          
          <figure>
            <img src={book && book.book_image || ""} alt="" />
              <figcaption></figcaption>
          </figure> 
          {
          (current_user && current_user.username)==(book.user.username) &&
          <div className="component-container mt-10">
         
          <div className="flex justify-end">
            <button onClick={toggleShow} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-sm rounded-lg text-sm px-3 py-1 my-2 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {buttonText}
            </button>
          </div>
          {show && 
            <EditStory book={book} />
            }
          
        </div>
         }

          <p className="py-5">{book && book.content}</p>
          
          <Reviews book_id={book && book.id} />
      </article>
     }
  </div>
</main>


</>
  )
}
