import React, { useContext, useState } from 'react'
import { BooksContext } from '../context/BooksContext'

export default function AddReview({book_id}) 
{
    const {addReview} = useContext(BooksContext)

    const [rating, setRating] = useState(4);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) =>{
           e.preventDefault()
           addReview(book_id,comment,rating )
           setComment("")
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label className="sr-only">Your comment</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="5"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..." required></textarea>
            </div>
            <button type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800">
                Post comment
            </button>
        </form>
    </div>
  )
}
