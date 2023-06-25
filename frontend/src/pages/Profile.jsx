import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Profile() 
{
  const {current_user} = useContext(AuthContext)
  console.log("OOOP ", current_user)
  return (
        <div className="container mx-auto my-60">
            <div>
    
                <div className="bg-gray-50 relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                    <div className="flex justify-center">
                      {current_user && current_user.image_url?
                            <img src={current_user && current_user.image_url} alt="profile loading" className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
                         :
                         <img src="/defaultuser.png" alt="profile loading" className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />

                      }
                    </div>
                    
                    <div className="mt-16">
                        <h1 className="font-semibold text-center text-2xl text-gray-600">{ current_user && current_user.username}</h1>
                        <p className="text-center text-sm text-gray-600 font-medium">{current_user && current_user.email}</p>
                        <p>
                            <span>
                                
                            </span>
                        </p>
                        <div className="my-5 px-6">
                            <a href="#" className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">
                               {current_user && current_user.bio}
                            </a>
                        </div>
                        <div className="w-full">
                            <h3 className="font-medium text-gray-900 text-left px-6">Your Books ({current_user && current_user.books.length})</h3>
                            <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                                {current_user && current_user.books.map((book)=>(
                                <div key={book.id} className="grid grid-cols-2 w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                    <div>
                                        <img src={book.book_image} alt="" className="h-10 w-auro shadow-md inline-block mr-2" />
                                        {book && book.title}
                                    </div>
                                    <Link to={`/story/${book.id}`} className="text-gray-500 text-xs">
                                        <FaLongArrowAltRight />
                                    </Link >
                                </div>  
                                 ))} 
                                
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
        </div>
  
  )
}
