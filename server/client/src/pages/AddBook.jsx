import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { BooksContext } from '../context/BooksContext';
import { AuthContext } from '../context/AuthContext';

export default function AddBook() 
{
    const {addBooks} = useContext(BooksContext)


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [image_url, setImage_url] = useState("");

    const handleSubmit = (e) =>{
           e.preventDefault()
           addBooks(title, content, image_url)
    }
  return (
    <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-green-800 to-green-500 i justify-around items-center hidden">
            <div>
                <h1 className="text-white font-bold text-4xl font-sans">Add  your Story</h1>
                <p className="text-white mt-1">The most popular Storybook</p>
                <Link to="/" type="submit" className="block text-center bg-white text-green-800 mt-4 py-2 rounded-2xl font-bold mb-2 px-4">Check Stories</Link>
            </div>
            <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-2/3 justify-center py-10 items-center bg-white">
            <form onSubmit={handleSubmit} className="sm:w-2/3 bg-white">
                <h1 className="text-gray-800 font-bold text-2xl mb-3">Add your Story</h1>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="pl-2 w-full focus:border-none focus:ring-none rounded-lg outline-none border-none" type="text" placeholder="Title" />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <input value={image_url} onChange={(e) => setImage_url(e.target.value)} className="pl-2 w-full focus:border-none focus:ring-none rounded-lg outline-none border-none" type="text" placeholder="Image URL" />
                </div>
                    
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                    <textarea rows={20} value={content} onChange={(e) => setContent(e.target.value)} className="pl-2 w-full focus:border-none focus:ring-none rounded-lg outline-none border-none" type="text" placeholder="Your story ..." />
                </div>
                <button type="submit" className="block w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Save</button>
            </form>
        </div>
    </div> 
     )
}
