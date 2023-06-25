import { createContext,useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
export const BooksContext = createContext();
// import configData from "../config.json";
// const  SERVER_URL = configData.SERVER_URL;

export const BooksProvider = ({ children }) => 
{
  const navigate = useNavigate();

  const [onDataChange, setOnDataChange] = useState(true)
  const [books, setBooks] = useState([]);

  function something_went_wrong()
  {Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: "Something went wrong",
  })}


    // Add Book
    const addBooks = (title, content, image_url) => {
      fetch(`/api/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body:JSON.stringify({title, content, image_url}) ,
        })
      .then((r)=> r.json())
      .then((response)=>{
        if (response.success) 
        {
          setOnDataChange(!onDataChange);
          navigate("/");
          Swal.fire({'icon':'success','timer':3000,'text':'Saved successfully!',"confirmButtonColor": '#088F8F',
          'title':"Success", }) 
        
        } 
        else
        {
          something_went_wrong()        }
      })
        
    };

    // Add Review
    const addReview = (book_id, comment, rating) => {
      fetch(`/api/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body:JSON.stringify({book_id, comment, rating}) ,
        })
      .then((r)=> r.json())
      .then((response)=>{
        if (response.success) 
        {
          setOnDataChange(!onDataChange);
          Swal.fire({'icon':'success','timer':3000,'text':'Saved successfully!',"confirmButtonColor": '#088F8F',
          'title':"Success", }) 
        
        } 
        else
        {
          something_went_wrong()        }
      })
        
    };

     // Save Book
     const saveBook = (book_id) => {
      fetch(`/api/savebook`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body:JSON.stringify({book_id}) ,
        })
      .then((r)=> r.json())
      .then((response)=>{
        if (response.success) 
        {
          setOnDataChange(!onDataChange);
          navigate("/");
          Swal.fire({'icon':'success','timer':3000,'text':response.success,"confirmButtonColor": '#088F8F',
          'title':"Success", }) 
        
        } 
        else if (response.error) 
        {
          setOnDataChange(!onDataChange);
          Swal.fire({'icon':'error','timer':3000,'text':response.error,"confirmButtonColor": '#088F8F',
          'title':"Error", }) 
        
        } 
        else
        {
          something_went_wrong()        }
      })
        
    };


        // Update Book
           const updateBook = (title, content, image_url, id) => {
            fetch(`/api/books/${id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({title, content, image_url}),
              })
              .then((response)=>response.json())
              .then((response) =>{
                console.log(response)
                if (response.success) 
                {
                  setOnDataChange(!onDataChange);
                  Swal.fire({'icon':'success','timer':3000,'text':'Update success',"confirmButtonColor": '#088F8F',
                  'title':"Success", }) 
                } 
                
                else if(response.error)
                {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.error,
                  })
                }
                else{
                   something_went_wrong()
                }
            })
              
          };
    


    // Delete Book
    const deleteBook= (id) => {
      fetch(`/api/books/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      }
      })
      .then(response => response.json())
      .then((response) => {
        console.log(response)
          if(response.success) 
          {
            setOnDataChange(!onDataChange);
            navigate("/")
            Swal.fire({'icon':'success','timer':3000,'text':'Deleted successfully',"confirmButtonColor": '#088F8F',
          'title':"Success", }) 
          } 
          else if(response.error) 
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.error,
            })
          }
          else
          {
            something_went_wrong()
          }
      })
      
  }

 


    // GET Books
   useEffect(()=>{
      fetch(`/api/books`, {
        method: 'GET',
         headers: {
           Accept: 'application/json',
         },
       })
       .then((response)=> response.json())
       .then((data)=>{
          setBooks(data)
      })

    }, [onDataChange])



    // CONTEXT DATA
    const contextData = 
    {
        addBooks,
        addReview,
        saveBook,
        books,
        updateBook,
        deleteBook
    };


    return (
      <BooksContext.Provider value={contextData}>
            {children}
      </BooksContext.Provider>
    )

}