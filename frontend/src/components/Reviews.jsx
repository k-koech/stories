import React from 'react'
import AddReview from './AddReview'
import Fetcher from '../context/lib/Fetcher';

export default function Reviews({book_id}) 
{

    const {data:reviews, isLoading, isError} = Fetcher(`/api/reviews/${book_id}`);
    console.log("rev ", reviews)

  return (
    <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    Discussions
                </h2>
              </div>

              <AddReview book_id={book_id}/>
                {
                    isLoading &&
                    <div className="flex items-center justify-center h-56 ">
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                        </div>
                    </div>
                }
                {
                    reviews && reviews.length<1 &&
                    <div className="text-center ">
                    <p>No review at the momment</p>
                    </div>
                }
             {
                reviews && reviews.map((review)=>(
              <article key={review.id} className=" p-6 mb-6 text-base bg-gray-100 rounded-lg dark:bg-gray-900">
                  <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                                  className="mr-2 w-6 h-6 rounded-full"
                                  src="/defaultuser.png"
                                  alt="Michael Gough" />{review.user.username}</p>
                      </div>
                     
                  </footer>
                  <p>{review && review.comment}  </p>
               
              </article>
              ))
            }
        
              
          </section>
  )
}
