import React, { useContext, useState } from 'react'
import { BooksContext } from '../context/BooksContext';

export default function EditStory({book}) 
{
    const {updateBook} = useContext(BooksContext)

    const [title, setTitle] = useState(book.title);
    const [content, setContent] = useState(book.content);
    const [image_url, setImage_url] = useState(book.book_image);

    const handleSubmit = (e) =>{
           e.preventDefault()
           updateBook(title, content, image_url, book.id)
    }
  return (
    <div>
        <div className="flex w-full justify-center py-10 items-center bg-white">
            <form onSubmit={handleSubmit} className="sm:w-2/3 bg-white">
                <h1 className="text-gray-800 font-bold text-xl mb-3">Update</h1>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="pl-2 w-full focus:border-none focus:ring-none rounded-lg outline-none border-none" type="text" placeholder="Title" required />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <input value={image_url} onChange={(e) => setImage_url(e.target.value)} className="pl-2 w-full focus:border-none focus:ring-none rounded-lg outline-none border-none" type="text" placeholder="Image URL" required />
                </div>
                    
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                    <textarea rows={10} value={content} onChange={(e) => setContent(e.target.value)} className="pl-2 w-full focus:border-none focus:ring-none rounded-lg outline-none border-none" type="text" placeholder="Your story ..." required />
                </div>
                <button type="submit" className="block w-full bg-green-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Save</button>
            </form>
        </div>
    </div>
  )
}
