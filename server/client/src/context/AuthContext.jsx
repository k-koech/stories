import { createContext,useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

export const AuthContext = createContext();
// import configData from "../config.json";
// const  SERVER_URL = configData.SERVER_URL;

export const AuthProvider = ({ children }) => 
{
    const navigate = useNavigate();
    
    const [onDataChange, setOnDataChange]=useState(true);

  
    const [current_user, setCurrentUser]  = useState(null);
    const [loading, setLoading] = useState(true);

   
    function something_went_wrong()
      {Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something went wrong",
      })}

      // USER REGISTRATION
      const register = (email,username,image_url,bio, password) => {

        fetch(`/api/signup`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email, username,image_url,bio, password
          })
          })
          .then((res)=> res.json())
          .then((response)=>{
            if (response.success) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Account created successfully',
                  showConfirmButton: false,
                  timer: 3000
                })
                setOnDataChange(!onDataChange);
                navigate("/login")
            }
          
            else if(response.error)
            {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.error,
              })

            } 
            else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong while saving!",
              })
            }
          })
        }
    
    // LOGIN
    const login = (email_username, password) => {

      fetch(`/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email_username,password })
        })
        .then(r => r.json())
        .then((response)=>{
          if(response.error)
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.error,
            })
          }
          
          else if(response.email ) 
          {             
            setCurrentUser(response)  
            navigate("/")
            setOnDataChange(!onDataChange);
            Swal.fire({'icon':'success','timer':3000,'text':'Loggedin Successfully!',"confirmButtonColor": '#088F8F',
            'title':"Success", })   
          } 
          
          else
          {

          something_went_wrong()
          }
            
          
      })

       
    };


    // UPDATE PASSWORD 
    const updatePassword = (email,username, password) => {
  
      fetch(`/api/users/updatepassword`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({email,username, password})
      })
      .then((response)=> response.json() )
      .then((response)=>{
           if(response.success) 
            {   
              Swal.fire({'icon':'success','timer':3000,'text':'New password saved',"confirmButtonColor": '#088F8F',
              'title':"Success", })   
              navigate("/login")
                 
            }
            else if(response.error) 
            {
              Swal.fire({'icon':'error','timer':3000,'text':response.error,"confirmButtonColor": '#088F8F',
              'title':"Success", })
            }
            else{
               something_went_wrong()
            }
        })
      .catch(()=>
        {
          something_went_wrong()
        })
    }
    

    // LOGOUT USER
    const logout = () => 
    {
      fetch(`/api/logout`, {
        method: "DELETE"
        })
        .then((response)=>{
          console.log("response ", response.ok)
          if(response.ok)
          {
            setCurrentUser(null)
            setOnDataChange(!onDataChange);
            navigate("/login")
            Swal.fire({'icon':'success','timer':3000,'text':'Logout Successfully!',"confirmButtonColor": '#088F8F',
            'title':"Success", }) 
            
          }
                    
          else
          {
           something_went_wrong()
          }
        })


    };

    // GET AUTHENTICATED USER
      useEffect(()=>
      {
         fetch(`/api/current_user`, {
         method: "GET",
         headers: {
             Accept: 'application/json'
             }
         })
         .then((response)=> response.json() )
         .then((response)=>{
          console.log("Curre ",response.email)

              if(response.email) 
               {
                 setCurrentUser(response)

               }
               else{
                setCurrentUser(null)
               }
           })
         .catch(()=>
           {
            something_went_wrong()

          })
        
    }, [loading,onDataChange])

    
    
    // CONTEXT DATA
    const contextData = 
    {
        register,
        login,
        updatePassword,
        current_user,
        logout
    };  
    
  

    


    return (
      <>
      <AuthContext.Provider value={contextData}>
        {children}
      </AuthContext.Provider>
      </>
    )

}